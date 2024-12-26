import mongoose from "mongoose";

const academicBackgroundSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  qualification: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  grade: { type: String, required: true },
  yearCompleted: { type: Number, required: true },
});

const englishProficiencySchema = new mongoose.Schema({
  testType: { 
    type: String, 
    enum: ["ielts", "toefl", "pte", "duolingo", "other"],
    required: true 
  },
  overallScore: { type: Number, required: true },
  testDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
});

const applicationSchema = new mongoose.Schema({
  applicationType: {
    type: String,
    enum: ["study", "work", "other"],
    default: "study",
  },
  status: {
    type: String,
    enum: ["draft", "submitted", "under_review", "approved", "rejected"],
    default: "draft",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    currentCountry: { type: String, required: true },
    passportNumber: { type: String, required: true },
    passportExpiry: { type: Date, required: true },
    gender: { 
      type: String, 
      enum: ["male", "female", "other", "prefer_not_to_say"],
      required: true 
    },
    maritalStatus: { 
      type: String, 
      enum: ["single", "married", "other"],
      required: true 
    },
  },
  studyDetails: {
    destinationCountry: { type: String, required: true },
    university: { type: String },
    course: { type: String },
    programLevel: { 
      type: String, 
      enum: ["diploma", "bachelors", "masters", "phd", "certificate", "foundation"],
      required: true 
    },
    majorSubject: { type: String, required: true },
    startDate: { type: Date, required: true },
    duration: { type: String, required: true },
    tuitionFee: { type: Number },
    scholarshipAmount: { type: Number, default: 0 },
    academicBackground: [academicBackgroundSchema],
    englishProficiency: englishProficiencySchema,
  },
  financialInfo: {
    fundingSource: { 
      type: String, 
      enum: ["self", "family", "scholarship", "loan", "sponsor", "other"],
      required: true 
    },
    monthlyIncome: { type: Number },
    sponsorName: { type: String },
    sponsorRelation: { type: String },
    sponsorContact: { type: String },
  },
  documents: [{
    name: { type: String },
    type: { type: String },
    url: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  }],
  notes: [{
    content: { type: String },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now },
  }],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.models?.Application || mongoose.model("Application", applicationSchema);

export default Application; 