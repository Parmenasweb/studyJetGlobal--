import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Consultation from "@/models/consultationForm";

// Create a new consultation
export async function POST(req) {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const data = await req.json();
    await connectDB();

    const consultation = await Consultation.create({
      ...data,
      status: "pending",
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

// Get all consultations with optional filtering
export async function GET(req) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    await connectDB();

    // Build query based on filters
    const query = {};
    if (status) query.status = status;
    if (type) query.consultationType = type;
    if (startDate && endDate) {
      query.selectedDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const consultations = await Consultation.find(query)
      .sort({ createdAt: -1 })
      .populate("assignedTo", "firstName lastName email")
      .populate("notes.author", "firstName lastName");

    return NextResponse.json(consultations);
  } catch (error) {
    console.error("Error fetching consultations:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultations" },
      { status: 500 }
    );
  }
}

// Update a consultation
export async function PUT(req) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { id, ...updateData } = data;

    await connectDB();

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true }
    )
      .populate("assignedTo", "firstName lastName email")
      .populate("notes.author", "firstName lastName");

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Consultation updated successfully",
      consultation,
    });
  } catch (error) {
    console.error("Error updating consultation:", error);
    return NextResponse.json(
      { error: "Failed to update consultation" },
      { status: 500 }
    );
  }
}

// Delete a consultation
export async function DELETE(req) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Consultation ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const consultation = await Consultation.findByIdAndDelete(id);

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Consultation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting consultation:", error);
    return NextResponse.json(
      { error: "Failed to delete consultation" },
      { status: 500 }
    );
  }
}
