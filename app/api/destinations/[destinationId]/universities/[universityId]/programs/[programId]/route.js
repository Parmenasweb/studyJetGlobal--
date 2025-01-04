import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { auth } from "@/auth";

export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { destinationId, universityId, programId } = params;

    await connectDB();

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    const university = destination.universities.id(universityId);
    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    const program = university.programs.id(programId);
    if (!program) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(program);
  } catch (error) {
    console.error("Error in GET /api/destinations/[destinationId]/universities/[universityId]/programs/[programId]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { destinationId, universityId, programId } = params;
    const data = await req.json();

    await connectDB();

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    const university = destination.universities.id(universityId);
    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    const program = university.programs.id(programId);
    if (!program) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }

    Object.assign(program, data);
    await destination.save();

    return NextResponse.json(program);
  } catch (error) {
    console.error("Error in PATCH /api/destinations/[destinationId]/universities/[universityId]/programs/[programId]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { destinationId, universityId, programId } = params;

    await connectDB();

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    const university = destination.universities.id(universityId);
    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    const program = university.programs.id(programId);
    if (!program) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }

    program.remove();
    await destination.save();

    return NextResponse.json(
      { message: "Program deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/destinations/[destinationId]/universities/[universityId]/programs/[programId]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}