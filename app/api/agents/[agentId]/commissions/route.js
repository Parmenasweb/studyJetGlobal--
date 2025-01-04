import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import Agent from "@/models/Agent";

export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const agent = await Agent.findById(params.agentId)
      .populate({
        path: "leads",
        select: "studentName program university",
      })
      .select("commissions");

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json(agent.commissions);
  } catch (error) {
    console.error("Error fetching commissions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    await connectDB();

    const agent = await Agent.findById(params.agentId);
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Validate that the lead exists
    const leadExists = agent.leads.some(
      (lead) => lead._id.toString() === data.leadId
    );
    if (!leadExists) {
      return NextResponse.json(
        { error: "Invalid lead specified" },
        { status: 400 }
      );
    }

    // Add metadata
    data.createdAt = new Date();
    data.createdBy = session.user.id;

    agent.commissions.push(data);
    await agent.save();

    return NextResponse.json(agent.commissions[agent.commissions.length - 1], {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating commission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { commissionId } = params;
    const data = await req.json();

    await connectDB();

    const agent = await Agent.findById(params.agentId);
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const commission = agent.commissions.id(commissionId);
    if (!commission) {
      return NextResponse.json(
        { error: "Commission not found" },
        { status: 404 }
      );
    }

    // Validate that the lead exists if leadId is being updated
    if (data.leadId) {
      const leadExists = agent.leads.some(
        (lead) => lead._id.toString() === data.leadId
      );
      if (!leadExists) {
        return NextResponse.json(
          { error: "Invalid lead specified" },
          { status: 400 }
        );
      }
    }

    // Update metadata
    data.updatedAt = new Date();
    data.updatedBy = session.user.id;

    // Update commission fields
    Object.assign(commission, data);
    await agent.save();

    return NextResponse.json(commission);
  } catch (error) {
    console.error("Error updating commission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { commissionId } = params;

    await connectDB();

    const agent = await Agent.findById(params.agentId);
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const commission = agent.commissions.id(commissionId);
    if (!commission) {
      return NextResponse.json(
        { error: "Commission not found" },
        { status: 404 }
      );
    }

    commission.deleteOne();
    await agent.save();

    return NextResponse.json(
      { message: "Commission deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting commission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
