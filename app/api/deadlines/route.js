import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Deadline from "@/models/deadline";

// GET /api/deadlines - Get all deadlines with filtering and pagination
export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Build query
    const query = {};
    
    // Filters
    if (searchParams.get("status")) {
      query.status = searchParams.get("status");
    }
    if (searchParams.get("priority")) {
      query.priority = searchParams.get("priority");
    }
    if (searchParams.get("type")) {
      query.type = searchParams.get("type");
    }
    if (searchParams.get("assignedTo")) {
      query.assignedTo = searchParams.get("assignedTo");
    }
    if (searchParams.get("relatedType")) {
      query["relatedTo.type"] = searchParams.get("relatedType");
    }
    if (searchParams.get("relatedId")) {
      query["relatedTo.id"] = searchParams.get("relatedId");
    }
    
    // Date range
    if (searchParams.get("startDate") || searchParams.get("endDate")) {
      query.dueDate = {};
      if (searchParams.get("startDate")) {
        query.dueDate.$gte = new Date(searchParams.get("startDate"));
      }
      if (searchParams.get("endDate")) {
        query.dueDate.$lte = new Date(searchParams.get("endDate"));
      }
    }

    // Search
    if (searchParams.get("search")) {
      const search = searchParams.get("search");
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Deadline.countDocuments(query);

    // Get deadlines with populated fields
    const deadlines = await Deadline.find(query)
      .populate("assignedTo", "name email image")
      .populate("createdBy", "name email image")
      .populate("updatedBy", "name email image")
      .populate({
        path: "comments.user",
        select: "name email image",
      })
      .sort({ dueDate: 1, priority: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      deadlines,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error in GET /api/deadlines:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch deadlines" },
      { status: 500 }
    );
  }
}

// POST /api/deadlines - Create a new deadline
export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();
    
    // Add creator info
    data.createdBy = session.user.id;
    
    const deadline = await Deadline.create(data);
    
    // Populate references
    await deadline.populate([
      { path: "assignedTo", select: "name email image" },
      { path: "createdBy", select: "name email image" },
    ]);

    return NextResponse.json(deadline, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/deadlines:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create deadline" },
      { status: 400 }
    );
  }
}

// PATCH /api/deadlines - Update a deadline
export async function PATCH(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Deadline ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    
    // Add updater info
    data.updatedBy = session.user.id;
    
    const deadline = await Deadline.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).populate([
      { path: "assignedTo", select: "name email image" },
      { path: "createdBy", select: "name email image" },
      { path: "updatedBy", select: "name email image" },
      { path: "comments.user", select: "name email image" },
    ]);

    if (!deadline) {
      return NextResponse.json(
        { error: "Deadline not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deadline);
  } catch (error) {
    console.error("Error in PATCH /api/deadlines:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update deadline" },
      { status: 400 }
    );
  }
}

// DELETE /api/deadlines - Delete a deadline
export async function DELETE(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Deadline ID is required" },
        { status: 400 }
      );
    }

    const deadline = await Deadline.findByIdAndDelete(id);
    if (!deadline) {
      return NextResponse.json(
        { error: "Deadline not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/deadlines:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete deadline" },
      { status: 400 }
    );
  }
}
