import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Application from "@/models/Application";
import { handleError } from "@/middleware/error";

export async function GET() {
  try {
    await connectDB();

    const applications = await Application.find()
      .sort({ submissionDate: -1 })
      .lean();

    return NextResponse.json(applications);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    
    // Ensure required fields are present
    if (!data.personalInfo || !data.applicationType) {
      return new NextResponse(
        JSON.stringify({ 
          message: "Missing required fields" 
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Create the application with proper fields
    const application = await Application.create({
      ...data,
      status: "submitted",
      submissionDate: new Date(),
      progress: 0,
      timeline: [{
        title: "Application Submitted",
        description: "Application has been submitted successfully",
        status: "submitted",
        date: new Date(),
        updatedBy: "system"
      }]
    });

    return new NextResponse(
      JSON.stringify({
        message: "Application submitted successfully",
        data: application
      }), 
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return new NextResponse(
      JSON.stringify({ 
        message: error.message || "Failed to submit application" 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const data = await req.json();

    const application = await Application.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    if (!application) {
      return new NextResponse(
        JSON.stringify({ message: "Application not found" }), 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Application updated successfully",
        data: application,
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ 
        message: error.message || "Failed to update application" 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return new NextResponse(
        JSON.stringify({ message: "Application not found" }), 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Application deleted successfully",
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ 
        message: error.message || "Failed to delete application" 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 