import mongoose from "mongoose";

const deadlineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    type: {
      type: String,
      required: true,
      enum: [
        "application",
        "document_submission",
        "payment",
        "visa",
        "enrollment",
        "accommodation",
        "other",
      ],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "overdue"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    reminderDates: [
      {
        type: Date,
      },
    ],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
    relatedDocuments: [
      {
        title: String,
        fileUrl: String,
        uploadDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    notes: [
      {
        content: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    completedAt: Date,
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notificationsSent: [
      {
        type: {
          type: String,
          enum: ["email", "sms", "in_app"],
        },
        sentAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["success", "failed"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
deadlineSchema.index({ dueDate: 1 });
deadlineSchema.index({ status: 1 });
deadlineSchema.index({ type: 1 });
deadlineSchema.index({ assignedTo: 1 });
deadlineSchema.index({ client: 1 });
deadlineSchema.index({ application: 1 });

// Virtual field for days remaining
deadlineSchema.virtual("daysRemaining").get(function () {
  if (!this.dueDate) return null;
  const today = new Date();
  const dueDate = new Date(this.dueDate);
  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Method to check if deadline is overdue
deadlineSchema.methods.isOverdue = function () {
  if (!this.dueDate) return false;
  return new Date() > this.dueDate && this.status !== "completed";
};

// Method to update status based on due date and completion
deadlineSchema.methods.updateStatus = function () {
  if (this.status === "completed") return;

  const today = new Date();
  if (today > this.dueDate) {
    this.status = "overdue";
  } else if (this.status === "pending" && this.daysRemaining <= 7) {
    this.status = "in_progress";
  }
};

// Pre-save middleware to update status
deadlineSchema.pre("save", function (next) {
  this.updateStatus();
  next();
});

export const Deadline =
  mongoose.models.Deadline || mongoose.model("Deadline", deadlineSchema);
