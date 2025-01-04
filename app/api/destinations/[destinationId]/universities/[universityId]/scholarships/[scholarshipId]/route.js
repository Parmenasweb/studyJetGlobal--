import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return new NextResponse("Destination not found", { status: 404 });
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return new NextResponse("University not found", { status: 404 });
    }

    const scholarship = university.scholarships.id(params.scholarshipId);
    if (!scholarship) {
      return new NextResponse("Scholarship not found", { status: 404 });
    }

    return NextResponse.json(scholarship);
  } catch (error) {
    console.error("[SCHOLARSHIP_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return new NextResponse("Destination not found", { status: 404 });
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return new NextResponse("University not found", { status: 404 });
    }

    const scholarship = university.scholarships.id(params.scholarshipId);
    if (!scholarship) {
      return new NextResponse("Scholarship not found", { status: 404 });
    }

    const body = await req.json();

    // Update the scholarship fields
    Object.assign(scholarship, body);
    await destination.save();

    return NextResponse.json(scholarship);
  } catch (error) {
    console.error("[SCHOLARSHIP_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return new NextResponse("Destination not found", { status: 404 });
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return new NextResponse("University not found", { status: 404 });
    }

    const scholarship = university.scholarships.id(params.scholarshipId);
    if (!scholarship) {
      return new NextResponse("Scholarship not found", { status: 404 });
    }

    // Remove the scholarship from the array
    scholarship.remove();
    await destination.save();

    return NextResponse.json({ message: "Scholarship deleted successfully" });
  } catch (error) {
    console.error("[SCHOLARSHIP_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 