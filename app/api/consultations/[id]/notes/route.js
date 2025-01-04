import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
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

    return NextResponse.json(consultation.notes || []);
  } catch (error) {
    console.error("Error fetching consultation notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultation notes" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const { content, author } = await req.json();
    await connectDB();

    const consultation = await Consultation.findByIdAndUpdate(
      params.id,
      {
        $push: {
          notes: {
            content,
            author,
            createdAt: new Date(),
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(consultation.notes);
  } catch (error) {
    console.error("Error adding consultation note:", error);
    return NextResponse.json(
      { error: "Failed to add consultation note" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { noteId } = await req.json();
    await connectDB();

    const consultation = await Consultation.findByIdAndUpdate(
      params.id,
      {
        $pull: {
          notes: { _id: noteId },
        },
      },
      { new: true }
    );

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(consultation.notes);
  } catch (error) {
    console.error("Error deleting consultation note:", error);
    return NextResponse.json(
      { error: "Failed to delete consultation note" },
      { status: 500 }
    );
  }
} 