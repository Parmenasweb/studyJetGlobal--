import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Agent from "@/models/Agent";
import { NextResponse } from "next/server";

// Helper function to serialize MongoDB documents
function serializeAgent(agent) {
  return {
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
      documents: lead.documents?.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
        uploadedAt: doc.uploadedAt?.toISOString()
      }))
    })) || [],
    commissions: agent.commissions?.map((commission) => ({
      ...commission,
      _id: commission._id.toString(),
      leadId: commission.leadId?.toString(),
      createdAt: commission.createdAt?.toISOString(),
      updatedAt: commission.updatedAt?.toISOString(),
      paymentDate: commission.paymentDate?.toISOString()
    })) || [],
    documents: agent.documents?.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      uploadedAt: doc.uploadedAt?.toISOString(),
      expiryDate: doc.expiryDate?.toISOString()
    })) || []
  };
}

// GET /api/agents/[agentId]
export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    const agent = await Agent.findById(params.agentId).lean();
    if (!agent) {
      return new NextResponse("Agent not found", { status: 404 });
    }

    return NextResponse.json(serializeAgent(agent));
  } catch (error) {
    console.error("[AGENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// PUT /api/agents/[agentId]
export async function PUT(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      email,
      phone,
      country,
      address,
      company,
      status,
      baseCommission,
      bankDetails,
      notes
    } = body;

    await connectDB();

    const agent = await Agent.findById(params.agentId);
    if (!agent) {
      return new NextResponse("Agent not found", { status: 404 });
    }

    // Update agent fields
    agent.name = name;
    agent.email = email;
    agent.phone = phone;
    agent.country = country;
    agent.address = address;
    agent.company = company;
    agent.status = status;
    agent.baseCommission = baseCommission;
    agent.bankDetails = bankDetails;
    agent.notes = notes;
    agent.updatedBy = session.user.id;

    await agent.save();

    return NextResponse.json(serializeAgent(agent.toObject()));
  } catch (error) {
    console.error("[AGENT_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// DELETE /api/agents/[agentId]
export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    const agent = await Agent.findById(params.agentId);
    if (!agent) {
      return new NextResponse("Agent not found", { status: 404 });
    }

    await Agent.findByIdAndDelete(params.agentId);

    return NextResponse.json({
      message: "Agent deleted successfully"
    });
  } catch (error) {
    console.error("[AGENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 