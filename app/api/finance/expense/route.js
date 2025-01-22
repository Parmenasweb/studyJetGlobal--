import { NextResponse } from "next/server";
import Expense from "@/models/Expense";
import { hasPermission } from "@/lib/permissions";
import { auth } from "@/auth";
import connectDB from "@/lib/db";

// Permission constants
const PERMISSIONS = {
  CREATE_EXPENSE: "finance.expenses.create",
  READ_EXPENSE: "finance.expenses.read",
  UPDATE_EXPENSE: "finance.expenses.update",
  DELETE_EXPENSE: "finance.expenses.delete",
  APPROVE_EXPENSE: "finance.expenses.approve"
};

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // if (!hasPermission(session.user, PERMISSIONS.READ_EXPENSE)) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const isRecurring = searchParams.get("isRecurring");

    const query = {};

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (category) query.category = category;
    if (status) query.status = status;
    if (isRecurring) query.isRecurring = isRecurring === "true";

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email")
      .populate("agentId", "name email")
      .populate("leadId", "studentName email");

    return NextResponse.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
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

    if (!hasPermission(session.user, PERMISSIONS.CREATE_EXPENSE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    const data = await request.json();
    
    // Add audit fields
    data.createdBy = session.user.id;
    data.updatedBy = session.user.id;

    const expense = new Expense(data);
    await expense.save();

    // If amount is above threshold, create approval request
    if (expense.amountInUSD >= 1000) {
      // TODO: Create approval request
      // await createApprovalRequest({
      //   type: "expense",
      //   itemId: expense._id,
      //   requestedBy: session.user.id,
      //   amount: expense.amountInUSD
      // });
    }

    return NextResponse.json(expense);
  } catch (error) {
    console.error("Error creating expense:", error);
    
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
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

    // if (!hasPermission(session.user, PERMISSIONS.UPDATE_EXPENSE)) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    await connectDB();

    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Expense ID is required" },
        { status: 400 }
      );
    }

    const expense = await Expense.findById(id);
    if (!expense) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }

    // Check if expense can be updated
    if (expense.status === "paid") {
      return NextResponse.json(
        { error: "Paid expenses cannot be modified" },
        { status: 400 }
      );
    }

    // Add audit fields
    updateData.updatedBy = session.user.id;

    // Update the expense
    Object.assign(expense, updateData);
    await expense.save();

    return NextResponse.json(expense);
  } catch (error) {
    console.error("Error updating expense:", error);
    
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

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

    // if (!hasPermission(session.user, PERMISSIONS.DELETE_EXPENSE)) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Expense ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const expense = await Expense.findById(id);
    if (!expense) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }

    // Check if expense can be deleted
    if (expense.status === "paid") {
      return NextResponse.json(
        { error: "Paid expenses cannot be deleted" },
        { status: 400 }
      );
    }

    // Soft delete by marking as cancelled
    await expense.cancel(session.user.id, "Deleted by user");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 