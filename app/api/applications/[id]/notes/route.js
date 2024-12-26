import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Application from "@/models/Application";
import { handleError } from "@/middleware/error";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const application = await Application.findById(params.id);

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return NextResponse.json(application.notes);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();

    const data = await req.json();
    const application = await Application.findByIdAndUpdate(
      params.id,
      {
        $push: {
          notes: {
            ...data,
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return NextResponse.json({
      message: "Note added successfully",
      data: application.notes[application.notes.length - 1],
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { noteId, content } = await req.json();
    const application = await Application.findOneAndUpdate(
      {
        _id: params.id,
        "notes._id": noteId,
      },
      {
        $set: {
          "notes.$.content": content,
          "notes.$.updatedAt": new Date(),
        },
      },
      { new: true }
    );

    if (!application) {
      return new NextResponse("Note not found", { status: 404 });
    }

    return NextResponse.json({
      message: "Note updated successfully",
      data: application.notes.find(note => note._id.toString() === noteId),
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("noteId");

    const application = await Application.findByIdAndUpdate(
      params.id,
      {
        $pull: {
          notes: { _id: noteId },
        },
      },
      { new: true }
    );

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return NextResponse.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    return handleError(error);
  }
} 