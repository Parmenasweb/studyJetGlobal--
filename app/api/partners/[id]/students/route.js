import connectDB from "@/lib/db";
import Partner from "@/models/Partner";
import Client from "@/models/Client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const data = await request.json();

    const partner = await Partner.findById(params.id);
    if (!partner) {
      return NextResponse.json(
        { error: "Partner not found" },
        { status: 404 }
      );
    }

    // Check if student is already referred to this partner
    const existingReferral = partner.referredStudents.find(
      s => s.student.toString() === data.student
    );
    if (existingReferral) {
      return NextResponse.json(
        { error: "Student is already referred to this partner" },
        { status: 409 }
      );
    }

    // Calculate commission based on partner settings
    const commission = partner.calculateCommission();

    // Add student to referredStudents array with calculated commission
    partner.referredStudents.push({
      ...data,
      commission: {
        amount: commission,
        paid: false,
      },
      updatedBy: session.user.id,
      updatedAt: new Date(),
    });

    // Update client's commission
    const client = await Client.findById(data.student);
    if (client) {
      client.commission = commission;
      await client.save();
    }

    await partner.save();

    return NextResponse.json(partner);
  } catch (error) {
    console.error("Error in POST /api/partners/[id]/students:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add referred student" },
      { status: 400 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { studentId, ...updateData } = await request.json();

    const partner = await Partner.findById(params.id);
    if (!partner) {
      return NextResponse.json(
        { error: "Partner not found" },
        { status: 404 }
      );
    }

    // Find and update the referred student
    const studentIndex = partner.referredStudents.findIndex(
      (s) => s.student.toString() === studentId
    );

    if (studentIndex === -1) {
      return NextResponse.json(
        { error: "Student not found in partner's referred students" },
        { status: 404 }
      );
    }

    // Update student data in partner model
    partner.referredStudents[studentIndex] = {
      ...partner.referredStudents[studentIndex].toObject(),
      ...updateData,
      updatedBy: session.user.id,
      updatedAt: new Date(),
    };

    // If commission is being updated, sync with client model
    if (updateData.commission) {
      const client = await Client.findById(studentId);
      if (client) {
        client.commission = updateData.commission.amount;
        await client.save();
      }
    }

    await partner.save();

    return NextResponse.json(partner);
  } catch (error) {
    console.error("Error in PATCH /api/partners/[id]/students:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update referred student" },
      { status: 400 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const partner = await Partner.findById(params.id)
      .populate({
        path: "referredStudents.student",
        select: "personalInfo.fullName personalInfo.email academicInfo.program",
      })
      .lean();

    if (!partner) {
      return NextResponse.json(
        { error: "Partner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(partner.referredStudents);
  } catch (error) {
    console.error("Error in GET /api/partners/[id]/students:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch referred students" },
      { status: 400 }
    );
  }
} 