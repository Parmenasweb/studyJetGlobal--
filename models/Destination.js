import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: String, required: true },
  tuitionFee: { type: Number, required: true },
  description: String,
});

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  ranking: Number,
  programs: [programSchema],
});

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  criteria: String,
  deadline: Date,
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
      uppercase: true,
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
      population: { type: String },
      language: { type: String },
      currency: { type: String },
      internationalStudents: { type: String },
      averageCostOfLiving: { type: Number },
      climateInfo: { type: String }
    },
    studyInfo: {
      averageTuitionFee: { type: Number, required: true },
      academicYear: { type: String },
      majorCities: [String],
      popularPrograms: [String],
      admissionRequirements: [String],
      visaRequirements: [String]
    },
    universities: [universitySchema],
    scholarships: [scholarshipSchema],
    media: {
      mainImage: { type: String, required: true },
      flagImage: { type: String, required: true },
      galleryImages: [String],
      videoUrl: String
    },
    statistics: {
      studentSatisfactionRate: Number,
      employmentRate: Number,
      internationalStudentRatio: Number
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

// Virtual for total number of scholarships
destinationSchema.virtual('totalScholarships').get(function() {
  return this.scholarships.length;
});

// Index for efficient queries
destinationSchema.index({ name: 1, countryCode: 1 });
destinationSchema.index({ status: 1 });
destinationSchema.index({ 'universities.name': 1 });

const Destination = mongoose.models?.Destination || mongoose.model("Destination", destinationSchema);

export default Destination;
// export const User = mongoose.models?.User || mongoose.model("user", userSchema);5555

