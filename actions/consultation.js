"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Consultation from "@/models/consultationForm";

export async function getConsultations() {
  try {
    await connectDB();
    const consultations = await Consultation.find()
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
      .populate("notes.author", "firstName lastName");

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
    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { ...data },
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

export async function deleteConsultation(id) {
  try {
    await connectDB();
    const consultation = await Consultation.findByIdAndDelete(id);

    if (!consultation) {
      throw new Error("Consultation not found");
    }

    revalidatePath("/private/dashboard/consultations");
    return [true, null];
  } catch (error) {
    console.error("Error deleting consultation:", error);
    return [null, "Failed to delete consultation"];
  }
}

export async function addConsultationNote(id, note) {
  try {
    await connectDB();
    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { $push: { notes: note } },
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
}
