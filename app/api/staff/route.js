import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Fetch all staff members (users)
    const staffMembers = await User.find(
      {},
      "firstName lastName email role"
    ).sort({ firstName: 1, lastName: 1 });

    return NextResponse.json(staffMembers);
  } catch (error) {
    console.error("Error fetching staff members:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff members" },
      { status: 500 }
    );
  }
}
