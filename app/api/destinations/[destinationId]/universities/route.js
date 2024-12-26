import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(destination.universities);
  } catch (error) {
    console.error("[UNIVERSITIES_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    // Add the new university to the universities array
    destination.universities.push(body);
    await destination.save();

    // Return the newly created university
    const newUniversity = destination.universities[destination.universities.length - 1];
    return NextResponse.json(newUniversity);
  } catch (error) {
    console.error("[UNIVERSITIES_POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 