import * as z from "zod";

export const scholarshipSchema = z.object({
  name: z.string().min(1, "Scholarship name is required"),
  amount: z.coerce.number().min(0, "Amount must be a positive number"),
  description: z.string().optional(),
  criteria: z.string().optional(),
  deadline: z.coerce.date().optional(),
  type: z.enum(["merit", "need-based", "research", "sports", "cultural", "other"]).default("merit"),
  coverage: z.enum(["full", "partial", "specific"]).default("partial"),
  status: z.enum(["active", "inactive", "upcoming"]).default("active"),
  applicationProcess: z.string().optional(),
  requiredDocuments: z.array(z.string()).optional(),
});

export const programSchema = z.object({
  name: z.string().min(1, "Name is required"),
  level: z.string().min(1, "Level is required"),
  duration: z.string().min(1, "Duration is required"),
  tuitionFee: z.string().min(1, "Tuition fee is required"),
  description: z.string().min(1, "Description is required"),
  intakes: z.array(z.string()),
  requirements: z.array(z.string()),
  status: z.enum(["active", "inactive"]).default("active"),
  language: z.string().min(1, "Language is required"),
  credits: z.string().min(1, "Credits are required"),
  campus: z.string().min(1, "Campus is required"),
  faculty: z.string().min(1, "Faculty is required"),
  department: z.string().min(1, "Department is required"),
  specializations: z.array(z.string()),
  careerOpportunities: z.array(z.string()),
  researchAreas: z.array(z.string()),
  applicationDeadlines: z.object({
    fall: z.date().optional(),
    spring: z.date().optional(),
    summer: z.date().optional(),
  }),
});

export const universitySchema = z.object({
  name: z.string().min(1, "University name is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["public", "private"]).default("public"),
  ranking: z.coerce.number().optional(),
  description: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional(),
  contactEmail: z.string().email("Must be a valid email").optional(),
  contactPhone: z.string().optional(),
  facilities: z.array(z.string()).optional(),
  images: z.array(z.object({
    url: z.string().url("Image URL must be valid"),
    caption: z.string().optional()
  })).optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  partnershipDetails: z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    agreementFile: z.string().optional(),
    commissionRate: z.coerce.number().min(0).max(100).optional(),
    notes: z.string().optional()
  }).optional(),
});

export const destinationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  countryCode: z.string().length(2, "Country code must be exactly 2 characters"),
  capital: z.string().min(1, "Capital is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  quickFacts: z.object({
    population: z.string().optional(),
    language: z.string().optional(),
    currency: z.string().optional(),
    internationalStudents: z.string().optional(),
    averageCostOfLiving: z.coerce.number().optional(),
    climateInfo: z.string().optional(),
    timeZone: z.string().optional(),
    visaProcessingTime: z.string().optional(),
  }).optional(),
  studyInfo: z.object({
    averageTuitionFee: z.coerce.number().min(0, "Average tuition fee must be a positive number"),
    academicYear: z.string().optional(),
    majorCities: z.array(z.string()).optional(),
    popularPrograms: z.array(z.string()).optional(),
    admissionRequirements: z.array(z.string()).optional(),
    visaRequirements: z.array(z.string()).optional(),
    workPermitInfo: z.string().optional(),
    prEligibility: z.string().optional(),
  }),
  media: z.object({
    mainImage: z.string().url("Main image must be a valid URL"),
    flagImage: z.string().url("Flag image must be a valid URL"),
    galleryImages: z.array(z.string().url()).optional(),
    videoUrl: z.string().url().optional(),
  }),
  statistics: z.object({
    studentSatisfactionRate: z.coerce.number().min(0).max(100).optional(),
    employmentRate: z.coerce.number().min(0).max(100).optional(),
    internationalStudentRatio: z.coerce.number().min(0).max(100).optional(),
    visaSuccessRate: z.coerce.number().min(0).max(100).optional(),
  }).optional(),
  status: z.enum(["active", "inactive", "draft"]).default("draft"),
}); 