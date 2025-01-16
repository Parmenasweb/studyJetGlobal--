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

    return NextResponse.json(university.scholarships || []);
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    return NextResponse.json(
      { error: "Failed to fetch scholarships" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
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

    if (!university.scholarships) {
      university.scholarships = [];
    }

    university.scholarships.push(data);
    await destination.save();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating scholarship:", error);
    return NextResponse.json(
      { error: "Failed to create scholarship" },
      { status: 500 }
    );
  }
} 