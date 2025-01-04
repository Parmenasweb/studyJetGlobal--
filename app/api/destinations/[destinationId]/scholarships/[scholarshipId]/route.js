import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { scholarshipSchema } from "@/lib/validations/destination";

export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Validate the request body
    const validatedData = scholarshipSchema.parse(data);

    await connectDB();
    const destination = await Destination.findOneAndUpdate(
      { 
        _id: params.destinationId,
        "scholarships._id": params.scholarshipId 
      },
      { 
        $set: {
          "scholarships.$": {
            ...validatedData,
            _id: params.scholarshipId,
            updatedBy: session.user.id,
            updatedAt: new Date(),
          }
        }
      },
      { new: true }
    );

    if (!destination) {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
    }

    const scholarship = destination.scholarships.find(
      s => s._id.toString() === params.scholarshipId
    );

    return NextResponse.json(scholarship);
  } catch (error) {
    console.error("Error updating scholarship:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update scholarship" },
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
          scholarships: { _id: params.scholarshipId } 
        } 
      },
      { new: true }
    );

    if (!destination) {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Scholarship deleted successfully" });
  } catch (error) {
    console.error("Error deleting scholarship:", error);
    return NextResponse.json(
      { error: "Failed to delete scholarship" },
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

    const scholarship = destination.scholarships.find(
      s => s._id.toString() === params.scholarshipId
    );

    if (!scholarship) {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
    }

    return NextResponse.json(scholarship);
  } catch (error) {
    console.error("Error fetching scholarship:", error);
    return NextResponse.json(
      { error: "Failed to fetch scholarship" },
      { status: 500 }
    );
  }
} 