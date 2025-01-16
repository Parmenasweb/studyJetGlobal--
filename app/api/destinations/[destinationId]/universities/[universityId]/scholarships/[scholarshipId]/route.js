import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";

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

    const scholarship = university.scholarships.id(params.scholarshipId);
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

    const scholarship = university.scholarships.id(params.scholarshipId);
    if (!scholarship) {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
    }

    // Update scholarship fields
    Object.assign(scholarship, data);
    await destination.save();

    return NextResponse.json(scholarship);
  } catch (error) {
    console.error("Error updating scholarship:", error);
    return NextResponse.json(
      { error: "Failed to update scholarship" },
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

    // Use pull() to remove the scholarship from the array
    university.scholarships.pull(params.scholarshipId);
    await destination.save();

    return NextResponse.json({ message: "Scholarship deleted successfully" });
  } catch (error) {
    console.error("Error deleting scholarship:", error);
    return NextResponse.json(
      { error: "Failed to delete scholarship" },
      { status: 500 }
    );
  }
} 