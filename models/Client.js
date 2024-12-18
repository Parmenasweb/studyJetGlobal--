import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  clientType: {
    type: String,
    enum: ['study', 'work'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending',
  },
  // Common fields for both types
  destination: {
    type: String,
    required: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  // Study-specific fields
  studyDetails: {
    university: String,
    course: String,
    programLevel: String,
    startDate: Date,
  },
  // Work-specific fields
  workDetails: {
    company: String,
    jobTitle: String,
    contractDuration: String,
    expectedSalary: Number,
  },
  // Tracking fields
  commissionAmount: {
    type: Number,
    default: 0,
  },
  notes: String,
  documents: [{
    name: String,
    url: String,
    uploadDate: Date,
  }],
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model("Client", clientSchema); 