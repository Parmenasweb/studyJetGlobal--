import * as z from "zod";

const programSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  level: z.string().min(1, "Program level is required"),
  duration: z.string().min(1, "Duration is required"),
  tuitionFee: z.number().min(0, "Tuition fee must be a positive number"),
  description: z.string().optional(),
});

const universitySchema = z.object({
  name: z.string().min(1, "University name is required"),
  location: z.string().min(1, "Location is required"),
  ranking: z.number().optional(),
  programs: z.array(programSchema).optional(),
});

const scholarshipSchema = z.object({
  name: z.string().min(1, "Scholarship name is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  criteria: z.string().optional(),
  deadline: z.string().datetime().optional(),
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
    averageCostOfLiving: z.number().optional(),
    climateInfo: z.string().optional(),
  }).optional(),
  studyInfo: z.object({
    averageTuitionFee: z.number().min(0, "Average tuition fee must be a positive number"),
    academicYear: z.string().optional(),
    majorCities: z.array(z.string()).optional(),
    popularPrograms: z.array(z.string()).optional(),
    admissionRequirements: z.array(z.string()).optional(),
    visaRequirements: z.array(z.string()).optional(),
  }),
  universities: z.array(universitySchema).optional(),
  scholarships: z.array(scholarshipSchema).optional(),
  media: z.object({
    mainImage: z.string().url("Main image must be a valid URL"),
    flagImage: z.string().url("Flag image must be a valid URL"),
    galleryImages: z.array(z.string().url()).optional(),
    videoUrl: z.string().url().optional(),
  }),
  statistics: z.object({
    studentSatisfactionRate: z.number().min(0).max(100).optional(),
    employmentRate: z.number().min(0).max(100).optional(),
    internationalStudentRatio: z.number().min(0).max(100).optional(),
  }).optional(),
  status: z.enum(['active', 'inactive', 'draft']).default('draft'),
}); 