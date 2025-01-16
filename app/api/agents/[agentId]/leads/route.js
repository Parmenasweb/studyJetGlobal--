import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Agent from "@/models/Agent";
import connectDB from "@/lib/db";

export async function POST(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { agentId } = params;
    const data = await request.json();

    await connectDB();

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return new NextResponse("Agent not found", { status: 404 });
    }

    // Create new lead
    agent.leads.push({
      clientId: data.clientId || null,
      studentName: data.studentName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      program: data.program,
      university: data.university,
      status: data.status,
      notes: data.notes,
    });

    await agent.save();

    return NextResponse.json(agent.leads[agent.leads.length - 1]);
  } catch (error) {
    console.error("[LEADS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { agentId } = params;
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("id");
    const data = await request.json();

    await connectDB();

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return new NextResponse("Agent not found", { status: 404 });
    }

    const lead = agent.leads.id(leadId);
    if (!lead) {
      return new NextResponse("Lead not found", { status: 404 });
    }

    // Update lead
    lead.clientId = data.clientId || lead.clientId;
    lead.studentName = data.studentName;
    lead.email = data.email;
    lead.phone = data.phone;
    lead.country = data.country;
    lead.program = data.program;
    lead.university = data.university;
    lead.status = data.status;
    lead.notes = data.notes;
    lead.updatedAt = new Date();

    await agent.save();

    return NextResponse.json(lead);
  } catch (error) {
    console.error("[LEADS_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { agentId } = params;
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("id");

    await connectDB();

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return new NextResponse("Agent not found", { status: 404 });
    }

    const lead = agent.leads.id(leadId);
    if (!lead) {
      return new NextResponse("Lead not found", { status: 404 });
    }

    lead.remove();
    await agent.save();

    return NextResponse.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("[LEADS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { agentId } = params;

    await connectDB();

    const agent = await Agent.findById(agentId).populate("leads.clientId");
    if (!agent) {
      return new NextResponse("Agent not found", { status: 404 });
    }

    return NextResponse.json(agent.leads);
  } catch (error) {
    console.error("[LEADS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
