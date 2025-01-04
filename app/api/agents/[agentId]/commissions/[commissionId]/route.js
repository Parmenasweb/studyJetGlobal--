import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Agent from "@/models/Agent";
import { auth } from "@/auth";

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

    const commission = agent.commissions.id(params.commissionId);
    if (!commission) {
      return NextResponse.json(
        { error: "Commission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(commission);
  } catch (error) {
    console.error("Error fetching commission:", error);
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

    const data = await req.json();

    await connectDB();

    const agent = await Agent.findById(params.agentId);
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const commission = agent.commissions.id(params.commissionId);
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

    await connectDB();

    const agent = await Agent.findById(params.agentId);
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const commission = agent.commissions.id(params.commissionId);
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
