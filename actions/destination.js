"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { serializeMongoose } from "@/lib/utils/serialize";
import { auth } from "@/auth";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// Destinations
export async function getDestinations(query = {}) {
  try {
    await connectDB();

    // Build query
    const dbQuery = {};
    if (query.status) dbQuery.status = query.status;
    if (query.search) {
      dbQuery.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { countryCode: { $regex: query.search, $options: "i" } },
        { capital: { $regex: query.search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Destination.countDocuments(dbQuery);

    // Get destinations with pagination
    const destinations = await Destination.find(dbQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      destinations: serializeMongoose(destinations),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw new Error(error.message || "Failed to fetch destinations");
  }
}

export async function getDestination(id) {
  try {
    await connectDB();
    const destination = await Destination.findById(id).lean();
    if (!destination) {
      throw new Error("Destination not found");
    }
    return serializeMongoose(destination);
  } catch (error) {
    console.error("Error fetching destination:", error);
    throw new Error(error.message || "Failed to fetch destination");
  }
}

export async function createDestination(data) {
  try {
    // Ensure media objects have all required fields
    const formattedData = {
      ...data,
      media: {
        mainImage: data.media?.mainImage || null,
        flagImage: data.media?.flagImage || null,
        galleryImages: data.media?.galleryImages || [],
        videoUrl: data.media?.videoUrl || null,
      },
    };

    const url = new URL("/api/destinations", BASE_URL);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create destination");
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to create destination");
    }

    revalidatePath("/private/dashboard/destinations");
    return result;
  } catch (error) {
    console.error("Error creating destination:", error);
    throw new Error(error.message || "Failed to create destination");
  }
}

export async function updateDestination(id, data) {
  try {
    // Ensure media objects have all required fields
    const formattedData = {
      ...data,
      media: {
        mainImage: data.media?.mainImage || null,
        flagImage: data.media?.flagImage || null,
        galleryImages: data.media?.galleryImages || [],
        videoUrl: data.media?.videoUrl || null,
      },
    };

    const url = new URL(`/api/destinations/${id}`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update destination");
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to update destination");
    }

    revalidatePath("/private/dashboard/destinations");
    revalidatePath(`/private/dashboard/destinations/${id}`);
    return result;
  } catch (error) {
    console.error("Error updating destination:", error);
    throw new Error(error.message || "Failed to update destination");
  }
}

export async function deleteDestination(id) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await connectDB();
    
    const destination = await Destination.findById(id);
    if (!destination) {
      throw new Error("Destination not found");
    }

    // Delete the destination
    await Destination.findByIdAndDelete(id);

    // Revalidate the destinations page
    revalidatePath('/private/dashboard/destinations');
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting destination:", error);
    throw new Error(error.message || "Failed to delete destination");
  }
}

// Universities
export async function getUniversities(destinationId) {
  try {
    const url = new URL(`/api/destinations/${destinationId}/universities`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch universities");
    }

    const universities = await response.json();
    return serializeMongoose(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw new Error(error.message || "Failed to fetch universities");
  }
}

export async function getUniversity(destinationId, universityId) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const url = new URL(`/api/destinations/${destinationId}/universities/${universityId}`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch university");
    }

    const university = await response.json();
    return university;
  } catch (error) {
    console.error("Error fetching university:", error);
    throw new Error(error.message || "Failed to fetch university");
  }
}

export async function addUniversity(destinationId, data) {
  try {
    const url = new URL(`/api/destinations/${destinationId}/universities`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to add university");
    }

    const newUniversity = await response.json();
    revalidatePath(`/private/dashboard/destinations/${destinationId}`);
    return newUniversity;
  } catch (error) {
    console.error("Error adding university:", error);
    throw new Error(error.message || "Failed to add university");
  }
}

export async function updateUniversity(destinationId, universityId, data) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const url = new URL(`/api/destinations/${destinationId}/universities/${universityId}`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.id}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update university");
    }

    const updatedUniversity = await response.json();
    revalidatePath(`/private/dashboard/destinations/${destinationId}`);
    return updatedUniversity;
  } catch (error) {
    console.error("Error updating university:", error);
    throw error;
  }
}

export async function deleteUniversity(destinationId, universityId) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const url = new URL(`/api/destinations/${destinationId}/universities/${universityId}`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.id}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete university");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}`);
    return await response.json();
  } catch (error) {
    console.error("Error in deleteUniversity:", error);
    throw error;
  }
}

// Scholarships
export async function getScholarships(destinationId, universityId) {
  try {
    const url = new URL(`/api/destinations/${destinationId}/universities/${universityId}/scholarships`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch scholarships");
    }

    const scholarships = await response.json();
    return scholarships;
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    throw new Error(error.message || "Failed to fetch scholarships");
  }
}

export async function getScholarship(destinationId, universityId, scholarshipId) {
  try {
    const url = new URL(`/api/destinations/${destinationId}/universities/${universityId}/scholarships/${scholarshipId}`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch scholarship");
    }

    const scholarship = await response.json();
    return scholarship;
  } catch (error) {
    console.error("Error fetching scholarship:", error);
    throw new Error(error.message || "Failed to fetch scholarship");
  }
}

export async function addScholarship(destinationId, universityId, data) {
  try {
    const url = new URL(`/api/destinations/${destinationId}/universities/${universityId}/scholarships`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to add scholarship");
    }

    const newScholarship = await response.json();
    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}`);
    return newScholarship;
  } catch (error) {
    console.error("Error adding scholarship:", error);
    throw new Error(error.message || "Failed to add scholarship");
  }
}

export async function updateScholarship(destinationId, universityId, scholarshipId, data) {
  try {
    const url = new URL(`/api/destinations/${destinationId}/universities/${universityId}/scholarships/${scholarshipId}`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update scholarship");
    }

    const updatedScholarship = await response.json();
    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}`);
    return updatedScholarship;
  } catch (error) {
    console.error("Error updating scholarship:", error);
    throw new Error(error.message || "Failed to update scholarship");
  }
}

export async function deleteScholarship(destinationId, universityId, scholarshipId) {
  try {
    const url = new URL(`/api/destinations/${destinationId}/universities/${universityId}/scholarships/${scholarshipId}`, BASE_URL);
    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete scholarship");
    }

    revalidatePath(`/private/dashboard/destinations/${destinationId}/universities/${universityId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting scholarship:", error);
    throw new Error(error.message || "Failed to delete scholarship");
  }
}