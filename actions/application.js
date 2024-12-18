"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { mockApplications } from "@/app/private/dashboard/applications/data/mock-applications";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getApplications() {
  try {
    const res = await fetch(`${BASE_URL}/api/applications`, {
      headers: headers(),
      cache: 'no-store',
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Failed to fetch applications");
    }

    return res.json();
  } catch (error) {
    throw new Error(
      error.message || "There was a problem loading the applications. Please try again."
    );
  }
}

export async function getApplication(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/applications/${id}`, {
      headers: headers(),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch application");
    }

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch application");
  }
}

export async function createApplication(data) {
  try {
    const res = await fetch(`${BASE_URL}/api/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers(),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create application");
    }

    revalidatePath("/private/dashboard/applications");
    return res.json();
  } catch (error) {
    throw new Error("Failed to create application");
  }
}

export async function updateApplication(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/api/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...headers(),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update application");
    }

    revalidatePath("/private/dashboard/applications");
    revalidatePath(`/private/dashboard/applications/${id}`);
    return res.json();
  } catch (error) {
    throw new Error("Failed to update application");
  }
}

export async function deleteApplication(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/applications/${id}`, {
      method: "DELETE",
      headers: headers(),
    });

    if (!res.ok) {
      throw new Error("Failed to delete application");
    }

    revalidatePath("/private/dashboard/applications");
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete application");
  }
} 