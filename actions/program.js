"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.BASE_URL;

export async function getPrograms(destinationId, universityId) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${BASE_URL}/api/destinations/${destinationId}/universities/${universityId}/programs`,
      {
        headers: {
          "Authorization": `Bearer ${session.user.id}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch programs");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
  }
}

export async function getProgram(destinationId, universityId, programId) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${BASE_URL}/api/destinations/${destinationId}/universities/${universityId}/programs/${programId}`,
      {
        headers: {
          "Authorization": `Bearer ${session.user.id}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch program");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching program:", error);
    throw error;
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