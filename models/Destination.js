import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: [
      'Merit-based', 'Need-based', 'Athletic', 'Research', 'Cultural',
      'Diversity', 'First Generation', 'International Student', 'Government',
      'Private', 'Full Funding', 'Partial Funding'
    ]
  },
  coverage: [String],
  amount: {
    type: { 
      type: String, 
      required: true,
      enum: ['fixed', 'percentage']
    },
    value: { type: Number, required: true, min: 0 },
    currency: { type: String, required: function() { return this.amount.type === 'fixed'; } },
    period: { 
      type: String, 
      required: true,
      enum: ['per_year', 'per_semester', 'total']
    }
  },
  description: String,
  eligibility: [String],
  deadline: { type: String, required: true },
  applicationProcess: [String],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  field: { type: String, required: true },
  level: { type: String, required: true },
  duration: {
    value: { type: Number, required: true, min: 1 },
    unit: { 
      type: String, 
      required: true,
      enum: ["years", "months", "semesters"]
    }
  },
  tuitionFee: {
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true },
    period: { 
      type: String, 
      required: true,
      enum: ["per_year", "per_semester", "total"]
    }
  },
  description: String,
  intakes: [String],
  requirements: {
    type: [{
      type: String,
      required: true,
      trim: true
    }],
    validate: {
      validator: function(requirements) {
        return requirements.length > 0;
      },
      message: 'At least one requirement must be specified'
    },
    default: []
  },
  language: {
    name: { type: String, required: true },
    level: { 
      type: String, 
      required: true,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"]
    }
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
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
  ranking: { type: Number, required: false },
  description: String,
  website: String,
  contactEmail: String,
  contactPhone: String,
  programs: [programSchema],
  scholarships: [scholarshipSchema],
  facilities: [String],
  media: {
    mainImage: {
      url: { type: String },
      alt: { type: String, default: "" },
      width: { type: Number, required: false },
      height: { type: Number, required: false },
      size: { type: Number, required: false },
      caption: { type: String, required: false },
    },
    galleryImages: [{
      url: { type: String },
      alt: { type: String, default: "" },
      width: { type: Number, required: false },
      height: { type: Number, required: false },
      size: { type: Number, required: false },
      caption: { type: String, required: false },
    }],
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
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
      mainImage: {
        url: { type: String },
        alt: { type: String, default: "" },
        width: { type: Number, required: false },
        height: { type: Number, required: false },
        size: { type: Number, required: false },
        caption: { type: String, required: false },
      },
      flagImage: {
        url: { type: String },
        alt: { type: String, default: "" },
        width: { type: Number, required: false },
        height: { type: Number, required: false },
        size: { type: Number, required: false },
        caption: { type: String, required: false },
      },
      galleryImages: [{
        url: { type: String },
        alt: { type: String, default: "" },
        width: { type: Number, required: false },
        height: { type: Number, required: false },
        size: { type: Number, required: false },
        caption: { type: String, required: false },
      }],
      videoUrl: { type: String, required: false },
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

