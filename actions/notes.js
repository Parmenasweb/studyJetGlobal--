import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { Application } from "@/models/Application";
import { revalidatePath } from "next/cache";

export async function addNote(applicationId, content) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    await connectDB();

    const application = await Application.findById(applicationId);
    if (!application) {
      throw new Error("Application not found");
    }

    const note = {
      content,
      author: session.user.email,
      createdAt: new Date(),
    };

    application.notes.push(note);
    await application.save();

    revalidatePath(`/private/dashboard/applications/${applicationId}/notes`);
    return { success: true };
  } catch (error) {
    console.error("Error adding note:", error);
    return { error: error.message };
  }
}

export async function getNotes(applicationId) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    await connectDB();

    const application = await Application.findById(applicationId);
    if (!application) {
      throw new Error("Application not found");
    }

    return {
      notes: application.notes || [],
      timeline: application.timeline || [],
    };
  } catch (error) {
    console.error("Error getting notes:", error);
    return { error: error.message };
  }
} 