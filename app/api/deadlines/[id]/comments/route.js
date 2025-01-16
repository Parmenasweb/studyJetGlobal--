import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Deadline from "@/models/deadline";

// POST /api/deadlines/[id]/comments - Add a comment to a deadline
export async function POST(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { content } = await request.json();
    if (!content) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    const deadline = await Deadline.findById(params.id);
    if (!deadline) {
      return NextResponse.json(
        { error: "Deadline not found" },
        { status: 404 }
      );
    }

    // Add the comment
    deadline.comments.push({
      user: session.user.id,
      content,
      createdAt: new Date(),
    });

    await deadline.save();

    // Return the updated deadline with populated user fields
    const updatedDeadline = await Deadline.findById(params.id)
      .populate("assignedTo", "name email image")
      .populate("createdBy", "name email image")
      .populate("updatedBy", "name email image")
      .populate("comments.user", "name email image");

    return NextResponse.json(updatedDeadline);
  } catch (error) {
    console.error("Error in POST /api/deadlines/[id]/comments:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add comment" },
      { status: 500 }
    );
  }
}

// DELETE /api/deadlines/[id]/comments - Delete a comment from a deadline
export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("commentId");
    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    const deadline = await Deadline.findById(params.id);
    if (!deadline) {
      return NextResponse.json(
        { error: "Deadline not found" },
        { status: 404 }
      );
    }

    // Find the comment
    const comment = deadline.comments.id(commentId);
    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // Check if the user is authorized to delete the comment
    if (comment.user.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Not authorized to delete this comment" },
        { status: 403 }
      );
    }

    // Remove the comment
    comment.remove();
    await deadline.save();

    // Return the updated deadline with populated user fields
    const updatedDeadline = await Deadline.findById(params.id)
      .populate("assignedTo", "name email image")
      .populate("createdBy", "name email image")
      .populate("updatedBy", "name email image")
      .populate("comments.user", "name email image");

    return NextResponse.json(updatedDeadline);
  } catch (error) {
    console.error("Error in DELETE /api/deadlines/[id]/comments:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete comment" },
      { status: 500 }
    );
  }
} 