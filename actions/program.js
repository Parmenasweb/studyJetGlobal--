"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Program from "@/models/program";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.BASE_URL;

export async function getPrograms() {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await connectDB();
    const programs = await Program.find().sort({ createdAt: -1 }).lean();
    
    // Serialize the data to ensure it's safe to pass to client components
    return JSON.parse(JSON.stringify(programs));
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw new Error("Failed to fetch programs");
  }
}

export async function getProgram(id) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await connectDB();
    const program = await Program.findById(id).lean();
    
    if (!program) {
      throw new Error("Program not found");
    }

    // Serialize the data to ensure it's safe to pass to client components
    return JSON.parse(JSON.stringify(program));
  } catch (error) {
    console.error("Error fetching program:", error);
    throw new Error("Failed to fetch program");
  }
}

export async function createProgram(data) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await connectDB();
    const program = await Program.create({
      ...data,
      createdBy: session.user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath("/private/dashboard/programs");
    // Serialize the data before returning
    return JSON.parse(JSON.stringify(program.toObject()));
  } catch (error) {
    console.error("Error creating program:", error);
    throw new Error("Failed to create program");
  }
}

export async function editProgram(id, data) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await connectDB();
    const program = await Program.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedBy: session.user.email,
        updatedAt: new Date(),
      },
      { new: true }
    ).lean();

    if (!program) {
      throw new Error("Program not found");
    }

    revalidatePath("/private/dashboard/programs");
    // Serialize the data before returning
    return JSON.parse(JSON.stringify(program));
  } catch (error) {
    console.error("Error updating program:", error);
    throw new Error("Failed to update program");
  }
}

export async function removeProgram(id) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await connectDB();
    const program = await Program.findByIdAndDelete(id);

    if (!program) {
      throw new Error("Program not found");
    }

    revalidatePath("/private/dashboard/programs");
    return program;
  } catch (error) {
    console.error("Error deleting program:", error);
    throw new Error("Failed to delete program");
  }
}

export async function addProgram(destinationId, universityId, data) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${BASE_URL}/api/destinations/${destinationId}/universities/${universityId}/programs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.id}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create program");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`);
    return response.json();
  } catch (error) {
    console.error("Error creating program:", error);
    throw error;
  }
}

export async function updateProgram(destinationId, universityId, programId, data) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${BASE_URL}/api/destinations/${destinationId}/universities/${universityId}/programs/${programId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.id}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update program");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`);
    return response.json();
  } catch (error) {
    console.error("Error updating program:", error);
    throw error;
  }
}

export async function deleteProgram(destinationId, universityId, programId) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${BASE_URL}/api/destinations/${destinationId}/universities/${universityId}/programs/${programId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${session.user.id}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete program");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`);
    return response.json();
  } catch (error) {
    console.error("Error deleting program:", error);
    throw error;
  }
} 