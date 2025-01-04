import * as z from "zod";

const imageSchema = z.object({
  url: z.string().regex(/^(https?:\/\/|\/).*/, "Invalid image URL format").optional(),
  alt: z.string().optional().default(""),
  width: z.number().positive("Width must be positive").optional(),
  height: z.number().positive("Height must be positive").optional(),
  size: z.number().positive("Size must be positive").optional(),
  caption: z.string().optional(),
}).nullable().optional();

const mediaSchema = z.object({
  mainImage: imageSchema,
  flagImage: imageSchema,
  galleryImages: z.array(
    z.object({
      url: z.string().regex(/^(https?:\/\/|\/).*/, "Invalid image URL format"),
      alt: z.string().optional().default(""),
      width: z.number().positive("Width must be positive").optional(),
      height: z.number().positive("Height must be positive").optional(),
      size: z.number().positive("Size must be positive").optional(),
      caption: z.string().optional(),
    })
  ).optional().default([]),
  videoUrl: z.string().url("Invalid video URL").nullable().optional(),
});

// Common program options
export const commonPrograms = [
  "Business Administration",
  "Computer Science",
  "Engineering",
  "Information Technology",
  "Data Science",
  "Medicine",
  "Nursing",
  "Psychology",
  "Law",
  "Architecture",
  "Accounting",
  "Marketing",
  "Finance",
  "Hospitality Management",
  "Education",
  "Environmental Science",
  "Biotechnology",
  "Artificial Intelligence",
  "Digital Marketing",
  "International Relations",
];

// Common admission requirements
export const commonAdmissionRequirements = [
  "High School Diploma or Equivalent",
  "Academic Transcripts",
  "Standardized Test Scores (SAT/ACT)",
  "English Proficiency Test (IELTS/TOEFL)",
  "Letters of Recommendation",
  "Statement of Purpose",
  "CV/Resume",
  "Portfolio (for specific programs)",
  "Interview",
  "Health Insurance",
  "Proof of Funds",
  "Birth Certificate",
  "Passport Copy",
  "Passport Size Photos",
];

// Common visa requirements
export const commonVisaRequirements = [
  "Valid Passport",
  "Acceptance Letter from Institution",
  "Proof of Financial Support",
  "English Proficiency Certificate",
  "Medical Certificate",
  "Police Clearance Certificate",
  "Passport Size Photos",
  "Visa Application Form",
  "Visa Application Fee Payment",
  "Travel Insurance",
  "Accommodation Proof",
  "Bank Statements (Last 6 months)",
  "Sponsor Letter (if applicable)",
  "Previous Education Documents",
];

export const destinationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  countryCode: z.string().length(2, "Country code must be exactly 2 characters"),
  capital: z.string().min(2, "Capital must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  quickFacts: z.object({
    population: z.string().optional(),
    language: z.string().optional(),
    currency: z.string().optional(),
    internationalStudents: z.string().optional(),
    averageCostOfLiving: z.number().optional(),
    climateInfo: z.string().optional(),
    timeZone: z.string().optional(),
    visaProcessingTime: z.string().optional(),
  }),
  studyInfo: z.object({
    averageTuitionFee: z.number().optional(),
    academicYear: z.string().optional(),
    majorCities: z.array(z.string()).optional(),
    popularPrograms: z.array(z.enum(commonPrograms)).optional(),
    admissionRequirements: z.array(z.enum(commonAdmissionRequirements)).optional(),
    visaRequirements: z.array(z.enum(commonVisaRequirements)).optional(),
    workPermitInfo: z.string().optional(),
    prEligibility: z.string().optional(),
  }),
  media: mediaSchema,
  statistics: z.object({
    studentSatisfactionRate: z.number().min(0).max(100).optional(),
    employmentRate: z.number().min(0).max(100).optional(),
    internationalStudentRatio: z.number().min(0).max(100).optional(),
    visaSuccessRate: z.number().min(0).max(100).optional(),
  }).optional(),
  status: z.enum(["active", "inactive", "draft"]).default("draft"),
}); 