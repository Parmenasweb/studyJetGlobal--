"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";

export async function getStaffMembers() {
  try {
    await connectDB();
    const staffMembers = await User.find(
      {},
      "firstName lastName email role"
    ).sort({ firstName: 1, lastName: 1 });

    return [staffMembers, null];
  } catch (error) {
    console.error("Error fetching staff members:", error);
    return [null, "Failed to fetch staff members"];
  }
}
