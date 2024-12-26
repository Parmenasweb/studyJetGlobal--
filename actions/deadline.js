"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { deadlineSchema } from "@/lib/validations/deadline";
import { revalidatePath } from "next/cache";

export async function getDeadlines(destinationId) {
  try {
    await connectDB();

    const destination = await Destination.findById(destinationId)
      .select("deadlines")
      .populate("deadlines.createdBy", "name email image")
      .lean();

    if (!destination) {
      throw new Error("Destination not found");
    }

    return destination.deadlines || [];
  } catch (error) {
    console.error("Error fetching deadlines:", error);
    throw error;
  }
}

export async function createDeadline(destinationId, data) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await connectDB();

    // Validate data
    const validatedData = deadlineSchema.parse(data);

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      throw new Error("Destination not found");
    }

    destination.deadlines.push({
      ...validatedData,
      createdBy: session.user.id,
    });

    await destination.save();
    revalidatePath(`/private/dashboard/destinations/${destinationId}`);

    return destination.deadlines[destination.deadlines.length - 1];
  } catch (error) {
    console.error("Error creating deadline:", error);
    throw error;
  }
}

export async function updateDeadline(destinationId, deadlineId, data) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await connectDB();

    // Validate data
    const validatedData = deadlineSchema.parse(data);

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      throw new Error("Destination not found");
    }

    const deadline = destination.deadlines.id(deadlineId);
    if (!deadline) {
      throw new Error("Deadline not found");
    }

    Object.assign(deadline, {
      ...validatedData,
      updatedBy: session.user.id,
      updatedAt: new Date(),
    });

    await destination.save();
    revalidatePath(`/private/dashboard/destinations/${destinationId}`);

    return deadline;
  } catch (error) {
    console.error("Error updating deadline:", error);
    throw error;
  }
}

export async function deleteDeadline(destinationId, deadlineId) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await connectDB();

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      throw new Error("Destination not found");
    }

    destination.deadlines = destination.deadlines.filter(
      (d) => d._id.toString() !== deadlineId
    );

    await destination.save();
    revalidatePath(`/private/dashboard/destinations/${destinationId}`);

    return { success: true };
  } catch (error) {
    console.error("Error deleting deadline:", error);
    throw error;
  }
} 