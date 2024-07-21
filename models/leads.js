import mongoose, { trusted } from "mongoose";
import { Schema } from "mongoose";

// Creating a schema for the student model
const leadSchema = new Schema(
  {
    leadName: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    homeCountry: { type: String, required: true, trim: true },
    whatsAppNumber: { type: String, required: true },
    destinationCountry: { type: String, required: true },
    programChosen: { type: String, required: true },
    universityOfChoice: { type: String },
    status: {
      type: Array,
      default: ["consulting", "enrolled", "admitted", "completed"],
    },
  },
  { timestamps: true }
);

// Create a model for each student

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export default Lead;
