import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { programSchema } from "@/lib/validations/destination";

export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const destination = await Destination.findById(params.destinationId)
      .select('programs')
      .lean();

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json(destination.programs || []);
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json(
      { error: "Failed to fetch programs" },
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
    const validatedData = programSchema.parse(data);

    await connectDB();
    const destination = await Destination.findById(params.destinationId);

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    destination.programs.push({
      ...validatedData,
      createdBy: session.user.id,
      createdAt: new Date(),
    });

    await destination.save();

    return NextResponse.json(destination.programs[destination.programs.length - 1]);
  } catch (error) {
    console.error("Error adding program:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add program" },
      { status: 500 }
    );
  }
} 