import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  applicationType: {
    type: String,
    enum: ['study', 'work'],
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'processing', 'approved', 'rejected'],
    default: 'draft',
  },
  destination: {
    type: String,
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  // Study application details
  studyDetails: {
    university: String,
    course: String,
    programLevel: {
      type: String,
      enum: ['undergraduate', 'postgraduate', 'phd'],
    },
    startDate: Date,
    tuitionFee: Number,
    scholarshipAmount: Number,
  },
  // Work application details
  workDetails: {
    company: String,
    position: String,
    salary: Number,
    contractDuration: String,
    visaType: String,
  },
  // Common fields
  documents: [{
    name: String,
    url: String,
    uploadDate: Date,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }],
  notes: [{
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    author: String
  }],
  timeline: [{
    status: String,
    date: Date,
    description: String,
    updatedBy: String
  }]
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model("Application", applicationSchema); 