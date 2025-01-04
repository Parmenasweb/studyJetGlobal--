import { NextResponse } from "next/server";
import  connectDB from "@/lib/db";
import Consultation from "@/models/consultationForm";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const consultation = await Consultation.findById(params.id);

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(consultation);
  } catch (error) {
    console.error("Error fetching consultation:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultation" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    await connectDB();

    const consultation = await Consultation.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(consultation);
  } catch (error) {
    console.error("Error updating consultation:", error);
    return NextResponse.json(
      { error: "Failed to update consultation" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const consultation = await Consultation.findByIdAndDelete(params.id);

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Consultation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting consultation:", error);
    return NextResponse.json(
      { error: "Failed to delete consultation" },
      { status: 500 }
    );
  }
} 