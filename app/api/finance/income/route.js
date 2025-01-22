import { NextResponse } from "next/server";
import Income from "@/models/Income";
import { hasPermission } from "@/lib/permissions";
import { auth } from "@/auth";
import connectDB from "@/lib/db";

// Permission constants
const PERMISSIONS = {
  CREATE_INCOME: "finance.income.create",
  READ_INCOME: "finance.income.read",
  UPDATE_INCOME: "finance.income.update",
  DELETE_INCOME: "finance.income.delete",
  VERIFY_INCOME: "finance.income.verify"
};

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // if (!hasPermission(session.user, PERMISSIONS.READ_INCOME)) {
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

    const incomeEntries = await Income.find(query)
      .sort({ date: -1 })
      .populate("createdBy", "name email")
      .populate("verifiedBy", "name email")
      .populate("leadId", "studentName email")
      .populate("agentId", "name email");

    return NextResponse.json(incomeEntries);
  } catch (error) {
    console.error("Error fetching income entries:", error);
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

    // if (!hasPermission(session.user, PERMISSIONS.CREATE_INCOME)) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    await connectDB();

    const data = await request.json();
    
    // Add audit fields
    data.createdBy = session.user.id;
    data.updatedBy = session.user.id;

    const income = new Income(data);
    await income.save();

    // If amount is above threshold, create verification request
    if (income.amountInUSD >= 5000) {
      // TODO: Create verification request
      // await createVerificationRequest({
      //   type: "income",
      //   itemId: income._id,
      //   requestedBy: session.user.id,
      //   amount: income.amountInUSD
      // });
    }

    return NextResponse.json(income);
  } catch (error) {
    console.error("Error creating income entry:", error);
    
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

    // if (!hasPermission(session.user, PERMISSIONS.UPDATE_INCOME)) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    await connectDB();

    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Income ID is required" },
        { status: 400 }
      );
    }

    const income = await Income.findById(id);
    if (!income) {
      return NextResponse.json(
        { error: "Income entry not found" },
        { status: 404 }
      );
    }

    // Check if income can be updated
    if (income.status === "received") {
      return NextResponse.json(
        { error: "Received income entries cannot be modified" },
        { status: 400 }
      );
    }

    // Add audit fields
    updateData.updatedBy = session.user.id;

    // Update the income entry
    Object.assign(income, updateData);
    await income.save();

    return NextResponse.json(income);
  } catch (error) {
    console.error("Error updating income entry:", error);
    
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

    // if (!hasPermission(session.user, PERMISSIONS.DELETE_INCOME)) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Income ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const income = await Income.findById(id);
    if (!income) {
      return NextResponse.json(
        { error: "Income entry not found" },
        { status: 404 }
      );
    }

    // Check if income can be deleted
    if (income.status === "received") {
      return NextResponse.json(
        { error: "Received income entries cannot be deleted" },
        { status: 400 }
      );
    }

    // Soft delete by marking as cancelled
    await income.cancel(session.user.id, "Deleted by user");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting income entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 