"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.BASE_URL;

export async function getScholarships(destinationId, universityId) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${BASE_URL}/api/destinations/${destinationId}/universities/${universityId}/scholarships`,
      {
        headers: {
          "Authorization": `Bearer ${session.user.id}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch scholarships");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    throw error;
  }
}

export async function getScholarship(destinationId, universityId, scholarshipId) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${BASE_URL}/api/destinations/${destinationId}/universities/${universityId}/scholarships/${scholarshipId}`,
      {
        headers: {
          "Authorization": `Bearer ${session.user.id}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch scholarship");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching scholarship:", error);
    throw error;
  }
}

export async function addScholarship(destinationId, universityId, data) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${BASE_URL}/api/destinations/${destinationId}/universities/${universityId}/scholarships`,
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
      throw new Error(error.error || "Failed to create scholarship");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships`);
    return response.json();
  } catch (error) {
    console.error("Error creating scholarship:", error);
    throw error;
  }
}

export async function updateScholarship(destinationId, universityId, scholarshipId, data) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${BASE_URL}/api/destinations/${destinationId}/universities/${universityId}/scholarships/${scholarshipId}`,
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
      throw new Error(error.error || "Failed to update scholarship");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships`);
    return response.json();
  } catch (error) {
    console.error("Error updating scholarship:", error);
    throw error;
  }
}

export async function deleteScholarship(destinationId, universityId, scholarshipId) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${BASE_URL}/api/destinations/${destinationId}/universities/${universityId}/scholarships/${scholarshipId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${session.user.id}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete scholarship");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships`);
    return response.json();
  } catch (error) {
    console.error("Error deleting scholarship:", error);
    throw error;
  }
} 