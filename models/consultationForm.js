import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    consulteeName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    whatsAppNumber: {
      type: String,
      required: true,
    },
    selectedDate: {
      type: Date,
      required: true,
    },
    selectedTime: {
      type: String,
      required: true,
    },
    consultationType: {
      type: String,
      enum: ["study", "work", "general"],
      required: true,
    },
    preferredMode: {
      type: String,
      enum: ["online", "phone"],
      required: true,
    },
    interestedCountries: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: [
      {
        content: {
          type: String,
          required: true,
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
consultationSchema.index({ status: 1, createdAt: -1 });
consultationSchema.index({ consultationType: 1 });
consultationSchema.index({ selectedDate: 1 });

const Consultation =
  mongoose.models?.Consultation ||
  mongoose.model("Consultation", consultationSchema);

export default Consultation;