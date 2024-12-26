import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Consultation from "@/models/consultationForm";

export async function POST(req) {
  try {
    const data = await req.json();
    await connectDB();

    const consultation = await Consultation.create({
      ...data,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Consultation created successfully", consultation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating consultation:", error);
    return NextResponse.json(
      { error: "Failed to create consultation" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const consultations = await Consultation.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(consultations);
  } catch (error) {
    console.error("Error fetching consultations:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultations" },
      { status: 500 }
    );
  }
} 