import { NextResponse } from "next/server";
import Expense from "@/models/Expense";
import { hasPermission } from "@/lib/permissions";
import { auth } from "@/auth";
import connectDB from "@/lib/db";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.user, "finance.expenses.approve")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    const data = await request.json();
    const { id, notes } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Expense ID is required" },
        { status: 400 }
      );
    }

    const expense = await Expense.findById(id)
      .populate("createdBy", "name email")
      .populate("agentId", "name email")
      .populate("leadId", "studentName email");

    if (!expense) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }

    // Check if the approver is different from the creator
    if (expense.createdBy._id.toString() === session.user.id) {
      return NextResponse.json(
        { error: "You cannot approve your own expense entries" },
        { status: 400 }
      );
    }

    // Check if the expense is already approved
    if (expense.status === "paid") {
      return NextResponse.json(
        { error: "Expense is already approved" },
        { status: 400 }
      );
    }

    // Check if the expense is cancelled
    if (expense.status === "cancelled") {
      return NextResponse.json(
        { error: "Cannot approve cancelled expenses" },
        { status: 400 }
      );
    }

    // Approve the expense
    await expense.approve(session.user.id, notes);

    // Send notifications
    // TODO: Implement notification system
    // await sendNotification({
    //   type: "expense-approved",
    //   userId: expense.createdBy._id,
    //   data: {
    //     expenseId: expense._id,
    //     amount: expense.formattedAmount,
    //     approver: session.user.name
    //   }
    // });

    return NextResponse.json(expense);
  } catch (error) {
    console.error("Error approving expense:", error);
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

    if (!hasPermission(session.user, "finance.expenses.approve")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    // Get pending expenses that need approval
    const pendingExpenses = await Expense.find({
      status: "pending",
      createdBy: { $ne: session.user.id }, // Exclude expenses created by the current user
      amountInUSD: { $gte: 1000 } // Only expenses above threshold
    })
      .sort({ date: -1 })
      .populate("createdBy", "name email")
      .populate("agentId", "name email")
      .populate("leadId", "studentName email");

    return NextResponse.json(pendingExpenses);
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 