import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Application from "@/models/Application";
import { handleError } from "@/middleware/error";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const application = await Application.findById(params.id);

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return NextResponse.json(application);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const data = await req.json();
    const application = await Application.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return NextResponse.json({
      message: "Application updated successfully",
      data: application,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const application = await Application.findByIdAndDelete(params.id);

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return NextResponse.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    return handleError(error);
  }
} 