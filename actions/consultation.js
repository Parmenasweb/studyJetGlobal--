"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/db";
import Consultation from "@/models/consultationForm";
import { auth } from "@/auth";

export async function getConsultations(query = {}) {
  try {
    await connectToDB();
    const consultations = await Consultation.find(query)
      .sort({ selectedDate: 1, selectedTime: 1 });
    return { data: consultations };
  } catch (error) {
    return { error: "Failed to fetch consultations" };
  }
}

export async function getConsultation(id) {
  try {
    await connectToDB();
    const consultation = await Consultation.findById(id);
    if (!consultation) {
      return { error: "Consultation not found" };
    }
    return { data: consultation };
  } catch (error) {
    return { error: "Failed to fetch consultation" };
  }
}

export async function createConsultation(data) {
  try {
    await connectToDB();
    const consultation = await Consultation.create(data);
    revalidatePath("/private/dashboard/consultations");
    return { data: consultation };
  } catch (error) {
    return { error: "Failed to create consultation" };
  }
}

export async function updateConsultation(id, data) {
  try {
    await connectToDB();
    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!consultation) {
      return { error: "Consultation not found" };
    }
    
    revalidatePath("/private/dashboard/consultations");
    return { data: consultation };
  } catch (error) {
    return { error: "Failed to update consultation" };
  }
}

export async function deleteConsultation(id) {
  try {
    await connectToDB();
    const consultation = await Consultation.findByIdAndDelete(id);
    
    if (!consultation) {
      return { error: "Consultation not found" };
    }
    
    revalidatePath("/private/dashboard/consultations");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete consultation" };
  }
}

export async function addConsultationNote(id, note) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectToDB();
    const consultation = await Consultation.findByIdAndUpdate(
      id,
      {
        $push: {
          notes: {
            content: note,
            author: session.user.email,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );
    
    if (!consultation) {
      return { error: "Consultation not found" };
    }
    
    revalidatePath("/private/dashboard/consultations");
    return { data: consultation };
  } catch (error) {
    return { error: "Failed to add note" };
  }
}

export async function updateConsultationStatus(id, status) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectToDB();
    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { 
        status,
        $push: {
          notes: {
            content: `Status updated to ${status}`,
            author: session.user.email,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );
    
    if (!consultation) {
      return { error: "Consultation not found" };
    }
    
    revalidatePath("/private/dashboard/consultations");
    return { data: consultation };
  } catch (error) {
    return { error: "Failed to update status" };
  }
} 