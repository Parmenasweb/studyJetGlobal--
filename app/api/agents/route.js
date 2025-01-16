import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Agent from "@/models/Agent";
import connectDB from "@/lib/db";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const agents = await Agent.find().lean();

    // Serialize the MongoDB documents
    const serializedAgents = agents.map((agent) => ({
      ...agent,
      _id: agent._id.toString(),
      createdAt: agent.createdAt?.toISOString(),
      updatedAt: agent.updatedAt?.toISOString(),
      createdBy: agent.createdBy?.toString(),
      updatedBy: agent.updatedBy?.toString(),
      leads: agent.leads?.map((lead) => ({
        ...lead,
        _id: lead._id.toString(),
        clientId: lead.clientId?.toString(),
        createdAt: lead.createdAt?.toISOString(),
        updatedAt: lead.updatedAt?.toISOString(),
      })),
      commissions: agent.commissions?.map((commission) => ({
        ...commission,
        _id: commission._id.toString(),
        leadId: commission.leadId?.toString(),
        createdAt: commission.createdAt?.toISOString(),
        updatedAt: commission.updatedAt?.toISOString(),
        paymentDate: commission.paymentDate?.toISOString(),
      })),
    }));

    return NextResponse.json(serializedAgents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return NextResponse.json(
      { error: "Failed to fetch agents" },
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
    await connectDB();

    const agent = new Agent({
      ...data,
      createdBy: session.user.id,
      updatedBy: session.user.id,
    });

    await agent.save();

    // Serialize the MongoDB document
    const serializedAgent = {
      ...agent.toObject(),
      _id: agent._id.toString(),
      createdAt: agent.createdAt?.toISOString(),
      updatedAt: agent.updatedAt?.toISOString(),
      createdBy: agent.createdBy?.toString(),
      updatedBy: agent.updatedBy?.toString(),
    };

    return NextResponse.json(serializedAgent);
  } catch (error) {
    console.error("Error creating agent:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create agent" },
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
      return NextResponse.json({ error: "Agent ID is required" }, { status: 400 });
    }

    const data = await request.json();
    await connectDB();

    const agent = await Agent.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedBy: session.user.id,
        updatedAt: new Date(),
      },
      { new: true }
    ).lean();

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Serialize the MongoDB document
    const serializedAgent = {
      ...agent,
      _id: agent._id.toString(),
      createdAt: agent.createdAt?.toISOString(),
      updatedAt: agent.updatedAt?.toISOString(),
      createdBy: agent.createdBy?.toString(),
      updatedBy: agent.updatedBy?.toString(),
      leads: agent.leads?.map((lead) => ({
        ...lead,
        _id: lead._id.toString(),
        clientId: lead.clientId?.toString(),
        createdAt: lead.createdAt?.toISOString(),
        updatedAt: lead.updatedAt?.toISOString(),
      })),
      commissions: agent.commissions?.map((commission) => ({
        ...commission,
        _id: commission._id.toString(),
        leadId: commission.leadId?.toString(),
        createdAt: commission.createdAt?.toISOString(),
        updatedAt: commission.updatedAt?.toISOString(),
        paymentDate: commission.paymentDate?.toISOString(),
      })),
    };

    return NextResponse.json(serializedAgent);
  } catch (error) {
    console.error("Error updating agent:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update agent" },
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
      return NextResponse.json({ error: "Agent ID is required" }, { status: 400 });
    }

    await connectDB();
    const agent = await Agent.findByIdAndDelete(id);

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Agent deleted successfully" });
  } catch (error) {
    console.error("Error deleting agent:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete agent" },
      { status: 500 }
    );
  }
}
