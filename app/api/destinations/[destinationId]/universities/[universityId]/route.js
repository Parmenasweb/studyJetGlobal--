import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";

export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    await connectDB();
    const destination = await Destination.findOneAndUpdate(
      { 
        _id: params.destinationId,
        "universities._id": params.universityId 
      },
      { 
        $set: {
          "universities.$": {
            ...data,
            _id: params.universityId,
            updatedBy: session.user.id,
            updatedAt: new Date(),
          }
        }
      },
      { new: true }
    );

    if (!destination) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
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
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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