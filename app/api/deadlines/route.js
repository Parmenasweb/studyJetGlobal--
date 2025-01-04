import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Deadline } from "@/models/deadline";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = {};

    // Handle search and filtering
    const search = searchParams.get("search");
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const status = searchParams.get("status");
    if (status) {
      query.status = status;
    }

    const type = searchParams.get("type");
    if (type) {
      query.type = type;
    }

    const priority = searchParams.get("priority");
    if (priority) {
      query.priority = priority;
    }

    const assignedTo = searchParams.get("assignedTo");
    if (assignedTo) {
      query.assignedTo = assignedTo;
    }

    const client = searchParams.get("client");
    if (client) {
      query.client = client;
    }

    const application = searchParams.get("application");
    if (application) {
      query.application = application;
    }

    // Date range filtering
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    if (startDate || endDate) {
      query.dueDate = {};
      if (startDate) {
        query.dueDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.dueDate.$lte = new Date(endDate);
      }
    }

    await connectDB();
    const deadlines = await Deadline.find(query)
      .populate("assignedTo", "name email")
      .populate("client", "personalInfo.fullName")
      .populate("application", "applicationType")
      .sort({ dueDate: 1 });

    return NextResponse.json(deadlines);
  } catch (error) {
    console.error("Error fetching deadlines:", error);
    return NextResponse.json(
      { error: "Failed to fetch deadlines" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.type || !data.dueDate) {
      return NextResponse.json(
        { error: "Title, type, and due date are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Create deadline
    const deadline = new Deadline({
      ...data,
      status: "pending",
      createdBy: session.user.id,
    });

    // Validate the deadline
    const validationError = deadline.validateSync();
    if (validationError) {
      return NextResponse.json(
        { error: validationError.message },
        { status: 400 }
      );
    }

    await deadline.save();

    return NextResponse.json({
      message: "Deadline created successfully",
      deadline,
    });
  } catch (error) {
    console.error("Error creating deadline:", error);
    return NextResponse.json(
      {
        error: "Failed to create deadline",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Deadline ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    await connectDB();

    const deadline = await Deadline.findById(id);
    if (!deadline) {
      return NextResponse.json(
        { error: "Deadline not found" },
        { status: 404 }
      );
    }

    // Handle completion
    if (data.status === "completed" && deadline.status !== "completed") {
      data.completedAt = new Date();
      data.completedBy = session.user.id;
    }

    // Update deadline data
    Object.assign(deadline, data);

    // Validate the updated deadline
    const validationError = deadline.validateSync();
    if (validationError) {
      return NextResponse.json(
        { error: validationError.message },
        { status: 400 }
      );
    }

    await deadline.save();

    return NextResponse.json({
      message: "Deadline updated successfully",
      deadline,
    });
  } catch (error) {
    console.error("Error updating deadline:", error);
    return NextResponse.json(
      { error: "Failed to update deadline" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Deadline ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const deadline = await Deadline.findByIdAndDelete(id);

    if (!deadline) {
      return NextResponse.json(
        { error: "Deadline not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Deadline deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting deadline:", error);
    return NextResponse.json(
      { error: "Failed to delete deadline" },
      { status: 500 }
    );
  }
}
