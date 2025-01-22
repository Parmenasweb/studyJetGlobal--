import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";

export async function PATCH(req, { params }) {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const data = await req.json();

    await connectDB();
    
    // First, get the existing university data
    const existingDestination = await Destination.findById(params.destinationId);
    const existingUniversity = existingDestination.universities.id(params.universityId);

    if (!existingUniversity) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    // Preserve existing programs and scholarships
    const updatedData = {
      ...existingUniversity.toObject(),  // Keep all existing data
      ...data,  // Override with new data
      _id: params.universityId,  // Ensure ID is preserved
      updatedAt: new Date(),
      // Preserve arrays if they exist in the original but not in the update
      programs: data.programs || existingUniversity.programs || [],
      scholarships: data.scholarships || existingUniversity.scholarships || []
    };

    const destination = await Destination.findOneAndUpdate(
      { 
        _id: params.destinationId,
        "universities._id": params.universityId 
      },
      { 
        $set: {
          "universities.$": updatedData
        }
      },
      { new: true }
    );

    if (!destination) {
      return NextResponse.json({ error: "Failed to update university" }, { status: 404 });
    }

    const university = destination.universities.find(
      u => u._id.toString() === params.universityId
    );

    return NextResponse.json(university);
  } catch (error) {
    console.error("Error updating university:", error);
    return NextResponse.json(
      { error: "Failed to update university" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
   

    await connectDB();
    const destination = await Destination.findByIdAndUpdate(
      params.destinationId,
      { 
        $pull: { 
          universities: { _id: params.universityId } 
        } 
      },
      { new: true }
    );

    if (!destination) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "University deleted successfully" });
  } catch (error) {
    console.error("Error deleting university:", error);
    return NextResponse.json(
      { error: "Failed to delete university" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await connectDB();
    const destination = await Destination.findById(params.destinationId);

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    return NextResponse.json(university);
  } catch (error) {
    console.error("Error fetching university:", error);
    return NextResponse.json(
      { error: "Failed to fetch university" },
      { status: 500 }
    );
  }
} 