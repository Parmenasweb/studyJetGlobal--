"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/db";
import Application from "@/models/Application";
import { auth } from "@/auth";

// Get all applications with filtering and pagination
export async function getApplications(query = {}, options = {}) {
  try {
    await connectToDB();
    
    const {
      page = 1,
      limit = 10,
      sortBy = 'submissionDate',
      sortOrder = 'desc',
      status,
      applicationType,
      priority,
      assignedTo,
      startDate,
      endDate
    } = options;

    const filter = { ...query };
    
    if (status) filter.status = status;
    if (applicationType) filter.applicationType = applicationType;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;
    
    if (startDate || endDate) {
      filter.submissionDate = {};
      if (startDate) filter.submissionDate.$gte = new Date(startDate);
      if (endDate) filter.submissionDate.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate('clientId', 'name email phone')
        .populate('assignedTo', 'firstName lastName email'),
      Application.countDocuments(filter)
    ]);

    return {
      data: applications,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    };
  } catch (error) {
    return { error: "Failed to fetch applications" };
  }
}

// Get single application by ID
export async function getApplication(id) {
  try {
    await connectToDB();
    const application = await Application.findById(id)
      .populate('clientId', 'name email phone')
      .populate('assignedTo', 'firstName lastName email')
      .populate('reviewedBy', 'firstName lastName email');

    if (!application) {
      return { error: "Application not found" };
    }

    return { data: application };
  } catch (error) {
    return { error: "Failed to fetch application" };
  }
}

// Create new application
export async function createApplication(data) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectToDB();
    
    // Add initial timeline event
    data.timeline = [{
      title: "Application Created",
      description: "Application has been created and saved as draft",
      status: "draft",
      updatedBy: session.user.email
    }];

    const application = await Application.create(data);
    
    revalidatePath("/private/dashboard/applications");
    return { data: application };
  } catch (error) {
    return { error: "Failed to create application" };
  }
}

// Update application
export async function updateApplication(id, data) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectToDB();

    // Add timeline event for status change if status is updated
    if (data.status) {
      data.timeline = {
        $push: {
          title: "Status Updated",
          description: `Application status changed to ${data.status}`,
          status: data.status,
          updatedBy: session.user.email
        }
      };
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!application) {
      return { error: "Application not found" };
    }

    revalidatePath("/private/dashboard/applications");
    return { data: application };
  } catch (error) {
    return { error: "Failed to update application" };
  }
}

// Delete application
export async function deleteApplication(id) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectToDB();
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return { error: "Application not found" };
    }

    revalidatePath("/private/dashboard/applications");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete application" };
  }
}

// Add document to application
export async function addApplicationDocument(id, document) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectToDB();
    const application = await Application.findByIdAndUpdate(
      id,
      {
        $push: {
          documents: document,
          timeline: {
            title: "Document Added",
            description: `New document "${document.name}" has been added`,
            updatedBy: session.user.email
          }
        }
      },
      { new: true }
    );

    if (!application) {
      return { error: "Application not found" };
    }

    revalidatePath("/private/dashboard/applications");
    return { data: application };
  } catch (error) {
    return { error: "Failed to add document" };
  }
}

// Update document status
export async function updateDocumentStatus(id, documentId, status) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectToDB();
    const application = await Application.findOneAndUpdate(
      { _id: id, "documents._id": documentId },
      {
        $set: { "documents.$.status": status },
        $push: {
          timeline: {
            title: "Document Status Updated",
            description: `Document status updated to ${status}`,
            updatedBy: session.user.email
          }
        }
      },
      { new: true }
    );

    if (!application) {
      return { error: "Application or document not found" };
    }

    revalidatePath("/private/dashboard/applications");
    return { data: application };
  } catch (error) {
    return { error: "Failed to update document status" };
  }
}

// Add note to application
export async function addApplicationNote(id, content) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectToDB();
    const application = await Application.findByIdAndUpdate(
      id,
      {
        $push: {
          notes: {
            content,
            author: session.user.email,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );

    if (!application) {
      return { error: "Application not found" };
    }

    revalidatePath("/private/dashboard/applications");
    return { data: application };
  } catch (error) {
    return { error: "Failed to add note" };
  }
}

// Assign application to user
export async function assignApplication(id, userId) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectToDB();
    const application = await Application.findByIdAndUpdate(
      id,
      {
        $set: { assignedTo: userId },
        $push: {
          timeline: {
            title: "Application Assigned",
            description: "Application has been assigned to a new user",
            updatedBy: session.user.email
          }
        }
      },
      { new: true }
    );

    if (!application) {
      return { error: "Application not found" };
    }

    revalidatePath("/private/dashboard/applications");
    return { data: application };
  } catch (error) {
    return { error: "Failed to assign application" };
  }
}

// Update application progress
export async function updateApplicationProgress(id, progress) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await connectToDB();
    const application = await Application.findByIdAndUpdate(
      id,
      {
        $set: { progress },
        $push: {
          timeline: {
            title: "Progress Updated",
            description: `Application progress updated to ${progress}%`,
            updatedBy: session.user.email
          }
        }
      },
      { new: true }
    );

    if (!application) {
      return { error: "Application not found" };
    }

    revalidatePath("/private/dashboard/applications");
    return { data: application };
  } catch (error) {
    return { error: "Failed to update progress" };
  }
} 