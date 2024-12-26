import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  description: String,
  criteria: String,
  deadline: Date,
  type: {
    type: String,
    enum: ['merit', 'need-based', 'research', 'sports', 'cultural', 'other'],
    default: 'merit'
  },
  coverage: {
    type: String,
    enum: ['full', 'partial', 'specific'],
    default: 'partial'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'upcoming'],
    default: 'active'
  },
  applicationProcess: String,
  requiredDocuments: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: String, required: true },
  tuitionFee: { type: Number, required: true },
  description: String,
  intakes: [String],
  requirements: [String],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ['public', 'private'],
    required: true
  },
  ranking: Number,
  description: String,
  website: String,
  contactEmail: String,
  contactPhone: String,
  programs: [programSchema],
  scholarships: [scholarshipSchema],
  facilities: [String],
  images: [{
    url: String,
    caption: String
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  partnershipDetails: {
    startDate: Date,
    endDate: Date,
    agreementFile: String,
    commissionRate: Number,
    notes: String
  }
});

const destinationSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      unique: true,
      trim: true 
    },
    countryCode: {
      type: String,
      required: true,
      length: 2
    },
    capital: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    quickFacts: {
      population: String,
      language: String,
      currency: String,
      internationalStudents: String,
      averageCostOfLiving: Number,
      climateInfo: String,
      timeZone: String,
      visaProcessingTime: String
    },
    studyInfo: {
      averageTuitionFee: Number,
      academicYear: String,
      majorCities: [String],
      popularPrograms: [String],
      admissionRequirements: [String],
      visaRequirements: [String],
      workPermitInfo: String,
      prEligibility: String
    },
    universities: [universitySchema],
    media: {
      mainImage: String,
      flagImage: String,
      galleryImages: [String],
      videoUrl: String
    },
    statistics: {
      studentSatisfactionRate: Number,
      employmentRate: Number,
      internationalStudentRatio: Number,
      visaSuccessRate: Number
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'draft'
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for total number of universities
destinationSchema.virtual('totalUniversities').get(function() {
  return this.universities.length;
});

// Virtual for total number of active universities
destinationSchema.virtual('activeUniversities').get(function() {
  return this.universities.filter(uni => uni.status === 'active').length;
});

// Virtual for total number of scholarships across all universities
destinationSchema.virtual('totalScholarships').get(function() {
  return this.universities.reduce((total, uni) => total + uni.scholarships.length, 0);
});

// Virtual for total number of programs across all universities
destinationSchema.virtual('totalPrograms').get(function() {
  return this.universities.reduce((total, uni) => total + uni.programs.length, 0);
});

// Indexes for efficient queries
destinationSchema.index({ name: 1, countryCode: 1 });
destinationSchema.index({ status: 1 });
destinationSchema.index({ 'universities.name': 1 });
destinationSchema.index({ 'universities.status': 1 });

const Destination = mongoose.models?.Destination || mongoose.model("Destination", destinationSchema);

export default Destination;

