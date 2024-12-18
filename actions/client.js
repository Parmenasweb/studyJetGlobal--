"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { mockClients } from "@/app/private/dashboard/students/data/mock-clients";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getClients() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockClients;
  } catch (error) {
    throw new Error(
      error.message || "There was a problem loading the clients. Please try again."
    );
  }
}

export async function getClient(id) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const client = mockClients.find(c => c._id === id);
    if (!client) throw new Error("Client not found");
    return client;
  } catch (error) {
    throw new Error("Failed to fetch client");
  }
}

export async function createClient(data) {
  try {
    const res = await fetch(`${BASE_URL}/api/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers(),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create client");
    }

    revalidatePath("/private/dashboard/students");
    return res.json();
  } catch (error) {
    throw new Error("Failed to create client");
  }
}

export async function updateClient(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/api/clients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...headers(),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update client");
    }

    revalidatePath("/private/dashboard/students");
    revalidatePath(`/private/dashboard/students/${id}`);
    return res.json();
  } catch (error) {
    throw new Error("Failed to update client");
  }
}

export async function deleteClient(id) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const clientIndex = mockClients.findIndex(c => c._id === id);
    if (clientIndex === -1) throw new Error("Client not found");
    
    mockClients.splice(clientIndex, 1);
    revalidatePath("/private/dashboard/students");
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete client");
  }
} 