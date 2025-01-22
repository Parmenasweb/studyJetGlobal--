import mongoose from "mongoose";

const deadlineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "application",
        "document_submission",
        "payment",
        "visa",
        "enrollment",
        "accommodation",
        "other"
      ],
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "overdue"],
      default: "pending",
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    reminderDate: {
      type: Date,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relatedTo: {
      type: {
        type: String,
        enum: ["student", "partner", "university", "program"],
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "relatedTo.type",
      },
    },
    attachments: [{
      name: String,
      url: String,
      type: String,
      size: Number,
      uploadedAt: Date,
    }],
    subtasks: [{
      title: String,
      completed: {
        type: Boolean,
        default: false,
      },
      dueDate: Date,
    }],
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    tags: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for days remaining
deadlineSchema.virtual("daysRemaining").get(function() {
  if (!this.dueDate) return null;
  const now = new Date();
  const dueDate = new Date(this.dueDate);
  const diffTime = dueDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Pre-save middleware to update status based on due date and progress
deadlineSchema.pre("save", function(next) {
  const now = new Date();
  const dueDate = new Date(this.dueDate);

  if (this.progress >= 100) {
    this.status = "completed";
  } else if (dueDate < now && this.status !== "completed") {
    this.status = "overdue";
  } else if (this.progress > 0 && this.status === "pending") {
    this.status = "in_progress";
  }

  next();
});

// Index for efficient queries
deadlineSchema.index({ dueDate: 1, status: 1 });
deadlineSchema.index({ "relatedTo.type": 1, "relatedTo.id": 1 });
deadlineSchema.index({ createdBy: 1 });
deadlineSchema.index({ assignedTo: 1 });

const Deadline = mongoose.models.Deadline || mongoose.model("Deadline", deadlineSchema);

export default Deadline;