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

    const { destinationId, universityId } = params;

    await connectDB();

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    const university = destination.universities._id(universityId);

    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    const programs = university.programs;

    return NextResponse.json(programs);
  } catch (error) {
    console.error("Error in GET /api/destinations/[destinationId]/universities/[universityId]/programs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { destinationId, universityId } = params;
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

    university.programs.push({
      name: data.name,
      level: data.level,
      duration: data.duration,
      tuitionFee: data.tuitionFee,
      description: data.description,
      intakes: data.intakes,
      requirements: data.requirements,
      status: data.status || 'active'
    });

    await destination.save();

    return NextResponse.json(university.programs[university.programs.length - 1], { status: 201 });

  } catch (error) {
    console.error("Error in POST /api/destinations/[destinationId]/universities/[universityId]/programs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}