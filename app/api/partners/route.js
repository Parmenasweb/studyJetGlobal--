import { NextResponse } from "next/server";
import Partner from "@/models/Partner";
import { auth } from "@/auth";
import connectDB from "@/lib/db";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const query = {};

    if (id) {
      const partner = await Partner.findById(id)
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email")
        .populate("updatedBy", "name email");

      if (!partner) {
        return NextResponse.json(
          { error: "Partner not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(partner);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { "contactPersons.name": { $regex: search, $options: "i" } },
        { "contactPersons.email": { $regex: search, $options: "i" } },
      ];
    }

    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [partners, total] = await Promise.all([
      Partner.find(query)
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Partner.countDocuments(query),
    ]);

    return NextResponse.json({
      partners,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/partners error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
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

    await connectDB();

    const data = await request.json();

    // Add audit fields
    data.createdBy = session.user.id;
    data.updatedBy = session.user.id;

    const partner = await Partner.create(data);

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error("POST /api/partners error:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
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

    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Partner ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Add audit fields
    data.updatedBy = session.user.id;
    data.updatedAt = new Date();

    const partner = await Partner.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("assignedTo", "name email");

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json(partner);
  } catch (error) {
    console.error("PUT /api/partners error:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
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

    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Partner ID is required" },
        { status: 400 }
      );
    }

    const partner = await Partner.findByIdAndDelete(id);

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Partner deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/partners error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
