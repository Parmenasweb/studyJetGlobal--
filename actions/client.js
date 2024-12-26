"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Client from "@/models/Client";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function getClients(query = {}) {
  try {
    await connectDB();

    // Build query
    const dbQuery = {};
    if (query.status) dbQuery.status = query.status;
    if (query.clientType) dbQuery.clientType = query.clientType;
    if (query.search) {
      dbQuery.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
        { destination: { $regex: query.search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Client.countDocuments(dbQuery);

    // Get clients with pagination
    const clients = await Client.find(dbQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      clients,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error(error.message || "Failed to fetch clients");
  }
}

export async function getClient(id) {
  try {
    await connectDB();
    const client = await Client.findById(id).lean();
    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  } catch (error) {
    console.error("Error fetching client:", error);
    throw new Error(error.message || "Failed to fetch client");
  }
}

export async function createClient(data) {
  try {
    const response = await fetch(`${BASE_URL}/api/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create client");
    }

    const newClient = await response.json();
    revalidatePath("/private/dashboard/students");
    return newClient;
  } catch (error) {
    console.error("Error creating client:", error);
    throw new Error(error.message || "Failed to create client");
  }
}

export async function updateClient(id, data) {
  try {
    const response = await fetch(`${BASE_URL}/api/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update client");
    }

    const updatedClient = await response.json();
    revalidatePath("/private/dashboard/students");
    revalidatePath(`/private/dashboard/students/${id}`);
    return updatedClient;
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error(error.message || "Failed to update client");
  }
}

export async function deleteClient(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/clients/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete client");
    }

    revalidatePath("/private/dashboard/students");
    return { success: true };
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error(error.message || "Failed to delete client");
  }
} 