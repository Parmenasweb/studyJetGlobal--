import mongoose, { trusted } from "mongoose";
import { Schema } from "mongoose";

// Creating a schema for the student model
const applicationSchema = new Schema(
  {
    applicantName: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    homeCountry: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true },
    whatsAppNumber: { type: String, required: true },
    destinationCountry: { type: String, required: true },
    programCategory: { type: String, required: true },
    parentName: { type: String, required: true },
    parentOccupation: { type: String, required: true },
    parentContact: { type: Number, required: true },
  },
  { timestamps: true }
);

// Create a model for each student

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

export default Application;
