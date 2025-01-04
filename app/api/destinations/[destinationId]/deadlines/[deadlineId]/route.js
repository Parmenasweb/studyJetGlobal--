import { NextResponse } from "next/server";
import  connectDB  from "@/lib/db";
import Destination from "@/models/Destination";
import { auth } from "@/auth";

export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { destinationId, deadlineId } = params;
    const { title, description, date } = await req.json();

    await connectDB();

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return new NextResponse("Destination not found", { status: 404 });
    }

    const deadline = destination.deadlines.id(deadlineId);
    if (!deadline) {
      return new NextResponse("Deadline not found", { status: 404 });
    }

    // Update deadline fields
    deadline.title = title;
    deadline.description = description;
    deadline.date = new Date(date);
    deadline.updatedAt = new Date();
    deadline.updatedBy = session.user.id;

    await destination.save();

    return NextResponse.json(deadline);
  } catch (error) {
    console.error("Error updating deadline:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { destinationId, deadlineId } = params;

    await connectDB();

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return new NextResponse("Destination not found", { status: 404 });
    }

    const deadline = destination.deadlines.id(deadlineId);
    if (!deadline) {
      return new NextResponse("Deadline not found", { status: 404 });
    }

    deadline.deleteOne();
    await destination.save();

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting deadline:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 