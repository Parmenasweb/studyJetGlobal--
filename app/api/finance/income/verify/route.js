import { NextResponse } from "next/server";
import Income from "@/models/Income";
import { hasPermission } from "@/lib/permissions";
import { auth } from "@/auth";
import connectDB from "@/lib/db";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user, "finance.income.verify")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    const data = await request.json();
    const { id, notes } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Income ID is required" },
        { status: 400 }
      );
    }

    const income = await Income.findById(id)
      .populate("createdBy", "name email")
      .populate("leadId", "studentName email")
      .populate("agentId", "name email");

    if (!income) {
      return NextResponse.json(
        { error: "Income entry not found" },
        { status: 404 }
      );
    }

    // Check if the verifier is different from the creator
    if (income.createdBy._id.toString() === session.user.id) {
      return NextResponse.json(
        { error: "You cannot verify your own income entries" },
        { status: 400 }
      );
    }

    // Check if the income is already verified
    if (income.status === "received") {
      return NextResponse.json(
        { error: "Income is already verified" },
        { status: 400 }
      );
    }

    // Check if the income is cancelled
    if (income.status === "cancelled") {
      return NextResponse.json(
        { error: "Cannot verify cancelled income entries" },
        { status: 400 }
      );
    }

    // Verify the income
    await income.verify(session.user.id, notes);

    // Send notifications
    // TODO: Implement notification system
    // await sendNotification({
    //   type: "income-verified",
    //   userId: income.createdBy._id,
    //   data: {
    //     incomeId: income._id,
    //     amount: income.formattedAmount,
    //     verifier: session.user.name
    //   }
    // });

    return NextResponse.json(income);
  } catch (error) {
    console.error("Error verifying income:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user, "finance.income.verify")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    // Get pending income entries that need verification
    const pendingIncome = await Income.find({
      status: "pending",
      createdBy: { $ne: session.user.id }, // Exclude entries created by the current user
      amountInUSD: { $gte: 5000 } // Only entries above threshold
    })
      .sort({ date: -1 })
      .populate("createdBy", "name email")
      .populate("leadId", "studentName email")
      .populate("agentId", "name email");

    return NextResponse.json(pendingIncome);
  } catch (error) {
    console.error("Error fetching pending verifications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 