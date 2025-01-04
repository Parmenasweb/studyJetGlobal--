import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";

export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const destination = await Destination.findById(params.destinationId)
      .select('universities')
      .lean();

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json(destination.universities || []);
  } catch (error) {
    console.error("Error fetching universities:", error);
    return NextResponse.json(
      { error: "Failed to fetch universities" },
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

    await connectDB();
    const destination = await Destination.findById(params.destinationId);

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    destination.universities.push({
      ...data,
      createdBy: session.user.id,
      createdAt: new Date(),
    });

    await destination.save();

    return NextResponse.json(destination.universities[destination.universities.length - 1]);
  } catch (error) {
    console.error("Error adding university:", error);
    return NextResponse.json(
      { error: "Failed to add university" },
      { status: 500 }
    );
  }
} 