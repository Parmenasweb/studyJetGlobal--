import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(university);
  } catch (error) {
    console.error("[UNIVERSITY_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    // Update the university fields
    Object.assign(university, body);
    await destination.save();

    return NextResponse.json(university);
  } catch (error) {
    console.error("[UNIVERSITY_PATCH]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    // Remove the university from the array
    university.remove();
    await destination.save();

    return NextResponse.json({ message: "University deleted successfully" });
  } catch (error) {
    console.error("[UNIVERSITY_DELETE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 