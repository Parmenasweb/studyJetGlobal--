import mongoose, { trusted } from "mongoose";
import { Schema } from "mongoose";

// Creating a schema for the student model
const consultationSchema = new Schema(
  {
    consulteeName: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    contactNumber: { type: Number, required: true, trim: true },
    whatsAppNumber: { type: Number, required: true },
    selectedDate: { type: String, required: true },
    selectedTime: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a model for each student

const Consultation =
  mongoose.models.Consultation ||
  mongoose.model("Consultation", consultationSchema);

export default Consultation;
