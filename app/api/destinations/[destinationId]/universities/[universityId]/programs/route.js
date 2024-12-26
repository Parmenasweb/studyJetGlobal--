import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Program from "@/models/Program";
import University from "@/models/University";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { destinationId, universityId } = params;

    await dbConnect();

    const university = await University.findOne({
      _id: universityId,
      destination: destinationId,
    });

    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    const programs = await Program.find({ university: universityId });

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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { destinationId, universityId } = params;
    const data = await req.json();

    await dbConnect();

    const university = await University.findOne({
      _id: universityId,
      destination: destinationId,
    });

    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    const program = await Program.create({
      ...data,
      university: universityId,
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/destinations/[destinationId]/universities/[universityId]/programs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 