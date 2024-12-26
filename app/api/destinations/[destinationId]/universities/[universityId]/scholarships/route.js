import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Destination from "@/models/Destination";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return new NextResponse("Destination not found", { status: 404 });
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return new NextResponse("University not found", { status: 404 });
    }

    return NextResponse.json(university.scholarships);
  } catch (error) {
    console.error("[SCHOLARSHIPS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    await connectToDB();

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return new NextResponse("Destination not found", { status: 404 });
    }

    const university = destination.universities.id(params.universityId);
    if (!university) {
      return new NextResponse("University not found", { status: 404 });
    }

    const body = await req.json();

    // Add the new scholarship to the scholarships array
    university.scholarships.push(body);
    await destination.save();

    // Return the newly created scholarship
    const newScholarship = university.scholarships[university.scholarships.length - 1];
    return NextResponse.json(newScholarship);
  } catch (error) {
    console.error("[SCHOLARSHIPS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 