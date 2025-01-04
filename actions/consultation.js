"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Consultation from "@/models/consultationForm";
import { unstable_noStore as noStore } from "next/cache";

export async function getConsultations(dateRange = null) {
  try {
    await connectDB();
    
    let query = {};
    
    // Add date range filter if provided
    if (dateRange?.from && dateRange?.to) {
      query.createdAt = {
        $gte: new Date(dateRange.from),
        $lte: new Date(dateRange.to),
      };
    }

    const consultations = await Consultation.find(query)
      .sort({ createdAt: -1 })
      .populate("assignedTo", "firstName lastName email")
      .populate("notes.author", "firstName lastName");

    return [consultations, null];
  } catch (error) {
    console.error("Error fetching consultations:", error);
    return [null, "Failed to fetch consultations"];
  }
}

export async function getConsultationById(id) {
  try {
    await connectDB();
    const consultation = await Consultation.findById(id)
      .populate("assignedTo", "firstName lastName email")
      .populate("notes.author", "firstName lastName")
      .lean();

    if (!consultation) {
      throw new Error("Consultation not found");
    }

    return [consultation, null];
  } catch (error) {
    console.error("Error fetching consultation:", error);
    return [null, "Failed to fetch consultation"];
  }
}

export async function createConsultation(data) {
  try {
    await connectDB();
    const consultation = await Consultation.create(data);
    revalidatePath("/private/dashboard/consultations");
    return [consultation, null];
  } catch (error) {
    console.error("Error creating consultation:", error);
    return [null, "Failed to create consultation"];
  }
}

export async function updateConsultation(id, data) {
  try {
    await connectDB();
    
    // Ensure the date is properly formatted
    const formattedData = {
      ...data,
      selectedDate: data.selectedDate ? new Date(data.selectedDate) : null,
    };

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { ...formattedData },
      { new: true }
    )
      .populate("assignedTo", "firstName lastName email")
      .populate("notes.author", "firstName lastName");

    if (!consultation) {
      throw new Error("Consultation not found");
    }

    revalidatePath("/private/dashboard/consultations");
    return [consultation, null];
  } catch (error) {
    console.error("Error updating consultation:", error);
    return [null, "Failed to update consultation"];
  }
}

export async function assignStaffToConsultation(id, staffId) {
  try {
    await connectDB();
    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { assignedTo: staffId },
      { new: true }
    ).populate("assignedTo", "firstName lastName email");

    if (!consultation) {
      throw new Error("Consultation not found");
    }

    revalidatePath("/private/dashboard/consultations");
    return [consultation, null];
  } catch (error) {
    console.error("Error assigning staff:", error);
    return [null, "Failed to assign staff"];
  }
}

export async function deleteConsultation(id) {
  try {
    await connectDB();
    await Consultation.findByIdAndDelete(id);
    
    // Add revalidation for both the list and detail pages
    revalidatePath("/private/dashboard/consultations");
    revalidatePath(`/private/dashboard/consultations/${id}`);
    
    return [true, null];
  } catch (error) {
    console.error("Error deleting consultation:", error);
    return [null, "Failed to delete consultation"];
  }
}

export async function addConsultationNote(consultationId, noteData) {
  try {
    await connectDB();
    
    const consultation = await Consultation.findByIdAndUpdate(
      consultationId,
      {
        $push: {
          notes: {
            content: noteData.content,
            author: noteData.authorId,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    )
    .populate("assignedTo", "firstName lastName email")
    .populate("notes.author", "firstName lastName");

    if (!consultation) {
      throw new Error("Consultation not found");
    }

    revalidatePath("/private/dashboard/consultations");
    revalidatePath(`/private/dashboard/consultations/${consultationId}`);
    return [consultation, null];
  } catch (error) {
    console.error("Error adding note:", error);
    return [null, "Failed to add note"];
  }
}

export async function updateConsultationStatus(id, status) {
  try {
    await connectDB();
    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("assignedTo", "firstName lastName email")
      .populate("notes.author", "firstName lastName");

    if (!consultation) {
      throw new Error("Consultation not found");
    }

    revalidatePath("/private/dashboard/consultations");
    return [consultation, null];
  } catch (error) {
    console.error("Error updating status:", error);
    return [null, "Failed to update status"];
  }
};