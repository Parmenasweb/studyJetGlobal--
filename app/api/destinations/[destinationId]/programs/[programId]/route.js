import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { programSchema } from "@/lib/validations/destination";

export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Validate the request body
    const validatedData = programSchema.parse(data);

    await connectDB();
    const destination = await Destination.findOneAndUpdate(
      { 
        _id: params.destinationId,
        "programs._id": params.programId 
      },
      { 
        $set: {
          "programs.$": {
            ...validatedData,
            _id: params.programId,
            updatedBy: session.user.id,
            updatedAt: new Date(),
          }
        }
      },
      { new: true }
    );

    if (!destination) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    const program = destination.programs.find(
      p => p._id.toString() === params.programId
    );

    return NextResponse.json(program);
  } catch (error) {
    console.error("Error updating program:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update program" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const destination = await Destination.findByIdAndUpdate(
      params.destinationId,
      { 
        $pull: { 
          programs: { _id: params.programId } 
        } 
      },
      { new: true }
    );

    if (!destination) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting program:", error);
    return NextResponse.json(
      { error: "Failed to delete program" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const destination = await Destination.findById(params.destinationId);

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    const program = destination.programs.find(
      p => p._id.toString() === params.programId
    );

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