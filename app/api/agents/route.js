import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    await dbConnect();

    if (id) {
      const agent = await Agent.findById(id)
        .populate("createdBy", "name email")
        .populate("updatedBy", "name email");

      if (!agent) {
        return NextResponse.json({ error: "Agent not found" }, { status: 404 });
      }

      return NextResponse.json(agent);
    }

    const agents = await Agent.find({})
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(agents);
  } catch (error) {
    console.error("Error in GET /api/agents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    await dbConnect();

    // Check if agent with same email already exists
    const existingAgent = await Agent.findOne({ email: data.email });
    if (existingAgent) {
      return NextResponse.json(
        { error: "Agent with this email already exists" },
        { status: 400 }
      );
    }

    const agent = await Agent.create({
      ...data,
      createdBy: session.user.id,
      updatedBy: session.user.id,
    });

    return NextResponse.json(agent);
  } catch (error) {
    console.error("Error in POST /api/agents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Agent ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();

    await dbConnect();

    // Check if updating email and if it already exists
    if (data.email) {
      const existingAgent = await Agent.findOne({
        email: data.email,
        _id: { $ne: id },
      });
      if (existingAgent) {
        return NextResponse.json(
          { error: "Agent with this email already exists" },
          { status: 400 }
        );
      }
    }

    const agent = await Agent.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedBy: session.user.id,
        updatedAt: new Date(),
      },
      { new: true }
    )
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json(agent);
  } catch (error) {
    console.error("Error in PUT /api/agents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Agent ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const agent = await Agent.findByIdAndDelete(id);

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/agents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
