"use server";

import { revalidatePath } from "next/cache";

export async function getPrograms(destinationId, universityId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/destinations/${destinationId}/universities/${universityId}/programs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch programs");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to fetch programs");
  }
}

export async function getProgram(destinationId, universityId, programId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/destinations/${destinationId}/universities/${universityId}/programs/${programId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch program");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to fetch program");
  }
}

export async function addProgram(destinationId, universityId, data) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/destinations/${destinationId}/universities/${universityId}/programs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to add program");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`);
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to add program");
  }
}

export async function updateProgram(destinationId, universityId, programId, data) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/destinations/${destinationId}/universities/${universityId}/programs/${programId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update program");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`);
    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs/${programId}`);
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to update program");
  }
}

export async function deleteProgram(destinationId, universityId, programId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/destinations/${destinationId}/universities/${universityId}/programs/${programId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete program");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`);
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to delete program");
  }
} 