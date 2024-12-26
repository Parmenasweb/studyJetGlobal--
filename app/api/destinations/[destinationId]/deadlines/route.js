import { NextResponse } from "next/server";
import { auth } from "@/auth";
import  connectDB  from "@/lib/db";
import Destination from "@/models/Destination";

export async function POST(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { destinationId } = params;
    const { title, description, date } = await req.json();

    await connectDB();

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return new NextResponse("Destination not found", { status: 404 });
    }

    destination.deadlines.push({
      title,
      description,
      date: new Date(date),
      createdBy: session.user.id,
    });

    await destination.save();

    return NextResponse.json(destination.deadlines[destination.deadlines.length - 1]);
  } catch (error) {
    console.error("Error creating deadline:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { destinationId } = params;

    await connectDB();

    const destination = await Destination.findById(destinationId)
      .select("deadlines")
      .populate("deadlines.createdBy", "name email image");

    if (!destination) {
      return new NextResponse("Destination not found", { status: 404 });
    }

    return NextResponse.json(destination.deadlines);
  } catch (error) {
    console.error("Error fetching deadlines:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 