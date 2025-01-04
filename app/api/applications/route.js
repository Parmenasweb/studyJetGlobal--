import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Application } from "@/models/Application";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await req.json();

    // Add metadata
    data.createdBy = session.user.id;
    data.submittedAt = new Date();

    const application = await Application.create(data);

    return NextResponse.json({ 
      message: "Application created successfully",
      applicationId: application._id 
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create application" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // Build query
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { "personalInfo.fullName": { $regex: search, $options: "i" } },
        { "personalInfo.email": { $regex: search, $options: "i" } },
      ];
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch applications with populated references
    const applicationResults = await Application.find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Application.countDocuments(query);

    // Format the response data
    const formattedApplications = applicationResults.map(app => ({
      id: app._id,
      applicationType: app.applicationType,
      status: app.status,
      priority: app.priority,
      studentName: app.personalInfo?.fullName || "N/A",
      studentEmail: app.personalInfo?.email || "N/A",
      destination: app.studyDetails?.destinationCountry || app.workDetails?.destinationCountry || "N/A",
      program: app.studyDetails?.specificProgram || app.workDetails?.preferredPosition || "N/A",
      submittedAt: app.submittedAt,
      updatedAt: app.updatedAt,
    }));

    return NextResponse.json({
      applications: formattedApplications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
