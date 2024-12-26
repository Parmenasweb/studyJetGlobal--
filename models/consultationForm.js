import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
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
    enum: ["online", "in-person"],
    required: true,
  },
  interestedCountries: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "scheduled", "completed", "cancelled"],
    default: "pending",
  },
  notes: [{
    content: String,
    createdAt: Date,
    createdBy: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Consultation = mongoose.models?.Consultation || mongoose.model("Consultation", consultationSchema);

export default Consultation;
