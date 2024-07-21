import mongoose, { trusted } from "mongoose";
import { Schema } from "mongoose";

// Creating a schema for the student model
const programSchema = new Schema(
  {
    programName: { type: String, required: true },
    duration: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Create a model for each student

const Program =
  mongoose.models.Program || mongoose.model("Program", programSchema);

export default Program;
