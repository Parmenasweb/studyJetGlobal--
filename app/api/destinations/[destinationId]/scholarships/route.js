import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
// import { scholarshipSchema } from "@/lib/validations/destination";

export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const destination = await Destination.findById(params.destinationId)
      .select('scholarships')
      .lean();

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json(destination.scholarships || []);
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
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Validate the request body
    // const validatedData = scholarshipSchema.parse(data);

    await connectDB();
    const destination = await Destination.findById(params.destinationId);

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    destination.scholarships.push({
      ...data,
      createdBy: session.user.id,
      createdAt: new Date(),
    });

    await destination.save();

    return NextResponse.json(destination.scholarships[destination.scholarships.length - 1]);
  } catch (error) {
    console.error("Error adding scholarship:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add scholarship" },
      { status: 500 }
    );
  }
} 