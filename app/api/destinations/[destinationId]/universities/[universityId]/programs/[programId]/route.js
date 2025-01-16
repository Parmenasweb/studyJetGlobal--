import { NextResponse } from "next/server";
import { auth } from "@/auth";
import  connectDB  from "@/lib/db";
import  Destination  from "@/models/Destination";

export async function GET(req, { params }) {
  try {
    

    await connectDB();
    const destination = await Destination.findById(params.destinationId);

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    const program = university.programs.id(params.programId);
    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json(program);
  } catch (error) {
    console.error("Error fetching program:", error);
    return NextResponse.json(
      { error: "Failed to fetch program" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    

    const data = await req.json();

    await connectDB();
    const destination = await Destination.findById(params.destinationId);

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    const program = university.programs.id(params.programId);
    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    // Update program fields
    Object.assign(program, data);
    await destination.save();

    return NextResponse.json(program);
  } catch (error) {
    console.error("Error updating program:", error);
    return NextResponse.json(
      { error: "Failed to update program" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
   

    await connectDB();
    const destination = await Destination.findById(params.destinationId);

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    const program = university.programs.id(params.programId);
    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    program.remove();
    await destination.save();

    return NextResponse.json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting program:", error);
    return NextResponse.json(
      { error: "Failed to delete program" },
      { status: 500 }
    );
  }
}