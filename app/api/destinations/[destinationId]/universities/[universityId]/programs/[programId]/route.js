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

    const { destinationId, universityId, programId } = params;

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

    const program = await Program.findOne({
      _id: programId,
      university: universityId,
    });

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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { destinationId, universityId, programId } = params;
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

    const program = await Program.findOneAndUpdate(
      {
        _id: programId,
        university: universityId,
      },
      data,
      { new: true }
    );

    if (!program) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }

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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { destinationId, universityId, programId } = params;

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

    const program = await Program.findOneAndDelete({
      _id: programId,
      university: universityId,
    });

    if (!program) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }

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