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

    const { searchParams } = new URL(request.url);
    const partnerId = searchParams.get("partnerId");
    const programId = searchParams.get("programId");

    await connectDB();

    if (programId) {
      const partner = await Partner.findOne({
        _id: partnerId,
        "programs._id": programId,
      });
      if (!partner) {
        return NextResponse.json(
          { error: "Program not found" },
          { status: 404 }
        );
      }
      const program = partner.programs.id(programId);
      return NextResponse.json(program);
    }

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json(partner.programs || []);
  } catch (error) {
    console.error("Error in GET /api/partners/programs:", error);
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

    const data = await request.json();
    const { partnerId, programId, ...programData } = data;

    await connectDB();

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    if (programId) {
      // Update existing program
      const programIndex = partner.programs.findIndex(
        (p) => p._id.toString() === programId
      );
      if (programIndex === -1) {
        return NextResponse.json(
          { error: "Program not found" },
          { status: 404 }
        );
      }
      partner.programs[programIndex] = {
        ...partner.programs[programIndex].toObject(),
        ...programData,
        updatedAt: new Date(),
        updatedBy: session.user.id,
      };
    } else {
      // Add new program
      partner.programs.push({
        ...programData,
        createdAt: new Date(),
        createdBy: session.user.id,
        updatedAt: new Date(),
        updatedBy: session.user.id,
      });
    }

    await partner.save();

    return NextResponse.json(
      programId
        ? partner.programs[programIndex]
        : partner.programs[partner.programs.length - 1]
    );
  } catch (error) {
    console.error("Error in POST /api/partners/programs:", error);
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

    const { searchParams } = new URL(request.url);
    const partnerId = searchParams.get("partnerId");
    const programId = searchParams.get("programId");

    if (!partnerId || !programId) {
      return NextResponse.json(
        { error: "Partner ID and Program ID are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    const programIndex = partner.programs.findIndex(
      (p) => p._id.toString() === programId
    );
    if (programIndex === -1) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    partner.programs.splice(programIndex, 1);
    await partner.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/partners/programs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
