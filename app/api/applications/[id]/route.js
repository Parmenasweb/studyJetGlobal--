import { NextResponse } from "next/server";
import  connectDB from "@/lib/db";
import Application from "@/models/Application";
import { auth } from "@/auth";
import { handleError } from "@/middleware/error";

// GET single application
export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const application = await Application.findById(params.id)
      .populate('clientId', 'name email');
    
    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return NextResponse.json(application);
  } catch (error) {
    return handleError(error);
  }
}

// PATCH update application
export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const currentApplication = await Application.findById(params.id);
    if (!currentApplication) {
      return new NextResponse("Application not found", { status: 404 });
    }

    // Add timeline entry if status changed
    if (body.status && body.status !== currentApplication.status) {
      body.timeline = [
        ...(currentApplication.timeline || []),
        {
          status: body.status,
          date: new Date(),
          description: `Status changed to ${body.status}`,
          updatedBy: session.user.email
        }
      ];
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    ).populate('clientId', 'name email');

    return NextResponse.json(updatedApplication);
  } catch (error) {
    return handleError(error);
  }
}

// DELETE application
export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const application = await Application.findByIdAndDelete(params.id);

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return new NextResponse("Application deleted successfully", { status: 200 });
  } catch (error) {
    return handleError(error);
  }
} 