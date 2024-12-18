import { NextResponse } from "next/server";
import  connectDB  from "@/lib/db";
import Application from "@/models/Application";
import { auth } from "@/auth";
import { handleError } from "@/middleware/error";

// GET all applications
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const applications = await Application.find({})
      .populate('clientId', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(applications);
  } catch (error) {
    return handleError(error);
  }
}

// POST new application
export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    // Add initial timeline entry
    body.timeline = [{
      status: body.status,
      date: new Date(),
      description: "Application created",
      updatedBy: session.user.email
    }];

    const newApplication = await Application.create(body);
    await newApplication.populate('clientId', 'name email');
    
    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
} 