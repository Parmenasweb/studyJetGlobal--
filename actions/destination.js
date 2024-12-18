"use server";

import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { destinationSchema } from "@/lib/validations/destination";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getDestinations(query = {}) {
  try {
    await connectDB();
    const destinations = await Destination.find(query)
      .select('-universities.programs') // Exclude program details for list view
      .sort({ updatedAt: -1 });
    return { data: destinations };
  } catch (error) {
    return { error: "Failed to fetch destinations" };
  }
}

export async function getDestination(id) {
  try {
    await connectDB();
    const destination = await Destination.findById(id);
    if (!destination) {
      return { error: "Destination not found" };
    }
    return { data: destination };
  } catch (error) {
    return { error: "Failed to fetch destination" };
  }
}

export async function createDestination(data) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    // Validate the data
    const validatedData = destinationSchema.parse(data);

    await connectDB();

    // Check for duplicate name
    const existing = await Destination.findOne({ name: validatedData.name });
    if (existing) {
      return { error: "A destination with this name already exists" };
    }

    // Create the destination
    const destination = await Destination.create(validatedData);
    revalidatePath("/private/dashboard/destinations");
    return { data: destination };
  } catch (error) {
    if (error.name === "ZodError") {
      return { error: "Invalid data provided", details: error.errors };
    }
    return { error: "Failed to create destination" };
  }
}

export async function updateDestination(id, data) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    // Validate the data
    const validatedData = destinationSchema.parse(data);

    await connectDB();

    // Check for duplicate name but exclude current destination
    const existing = await Destination.findOne({ 
      name: validatedData.name,
      _id: { $ne: id }
    });
    if (existing) {
      return { error: "A destination with this name already exists" };
    }

    // Update the destination
    const destination = await Destination.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!destination) {
      return { error: "Destination not found" };
    }

    revalidatePath("/private/dashboard/destinations");
    return { data: destination };
  } catch (error) {
    if (error.name === "ZodError") {
      return { error: "Invalid data provided", details: error.errors };
    }
    return { error: "Failed to update destination" };
  }
}

export async function deleteDestination(id) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectDB();
    const destination = await Destination.findByIdAndDelete(id);

    if (!destination) {
      return { error: "Destination not found" };
    }

    revalidatePath("/private/dashboard/destinations");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete destination" };
  }
}

// Additional utility functions

export async function updateDestinationStatus(id, status) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectDB();
    const destination = await Destination.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!destination) {
      return { error: "Destination not found" };
    }

    revalidatePath("/private/dashboard/destinations");
    return { data: destination };
  } catch (error) {
    return { error: "Failed to update destination status" };
  }
}

export async function addUniversityToDestination(id, universityData) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectDB();
    const destination = await Destination.findById(id);

    if (!destination) {
      return { error: "Destination not found" };
    }

    destination.universities.push(universityData);
    await destination.save();

    revalidatePath("/private/dashboard/destinations");
    return { data: destination };
  } catch (error) {
    return { error: "Failed to add university" };
  }
}

export async function addScholarshipToDestination(id, scholarshipData) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectDB();
    const destination = await Destination.findById(id);

    if (!destination) {
      return { error: "Destination not found" };
    }

    destination.scholarships.push(scholarshipData);
    await destination.save();

    revalidatePath("/private/dashboard/destinations");
    return { data: destination };
  } catch (error) {
    return { error: "Failed to add scholarship" };
  }
} 