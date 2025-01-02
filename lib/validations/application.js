import * as z from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  whatsapp: z.string().regex(phoneRegex, "Invalid WhatsApp number"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format",
  }),
  nationality: z.string().min(1, "Nationality is required"),
  currentCountry: z.string().min(1, "Current country is required"),
  currentCity: z.string().min(1, "Current city is required"),
  passportNumber: z.string().optional(),
  passportExpiry: z.date().nullable().optional(),
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  languages: z
    .array(
      z.object({
        language: z.string().min(1, "Language is required"),
        proficiencyLevel: z.enum([
          "basic",
          "intermediate",
          "advanced",
          "native",
        ]),
      })
    )
    .min(1, "At least one language is required"),
});

const academicBackgroundSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  qualification: z.string().min(1, "Qualification is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  grade: z.string().min(1, "Grade is required"),
  yearCompleted: z.number().min(1900).max(new Date().getFullYear()),
});

const englishProficiencySchema = z.object({
  testType: z.enum(["ielts", "toefl", "pte", "duolingo", "other"]),
  overallScore: z.number().min(0, "Score must be a positive number"),
  testDate: z.date({
    required_error: "Test date is required",
    invalid_type_error: "Invalid test date format",
  }),
  expiryDate: z.date({
    required_error: "Expiry date is required",
    invalid_type_error: "Invalid expiry date format",
  }),
});

const studyDetailsSchema = z.object({
  destinationCountry: z.string().min(1, "Destination country is required"),
  preferredCities: z.array(z.string()),
  intakeDate: z.string().min(1, "Intake date is required"),
  programLevel: z.string().min(1, "Program level is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  specificProgram: z.string().optional(),
  preferredUniversities: z.array(z.string()),
  academicBackground: z
    .array(academicBackgroundSchema)
    .min(1, "At least one academic qualification is required"),
  englishProficiency: englishProficiencySchema,
  hasScholarshipRequirement: z.boolean().default(false),
  studyGoals: z.string().min(1, "Study goals are required"),
});

const workExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  duration: z.string().min(1, "Duration is required"),
  responsibilities: z.string().min(1, "Responsibilities are required"),
});

const workDetailsSchema = z.object({
  destinationCountry: z.string().min(1, "Destination country is required"),
  jobCategory: z.string().min(1, "Job category is required"),
  preferredPosition: z.string().min(1, "Preferred position is required"),
  yearsOfExperience: z.number().min(0),
  workExperience: z
    .array(workExperienceSchema)
    .min(1, "At least one work experience entry is required"),
  careerGoals: z.string().min(1, "Career goals are required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

const financialInfoSchema = z
  .object({
    fundingSource: z.enum(["self", "family", "sponsor", "loan", "scholarship"]),
    annualFamilyIncome: z.number().min(0),
    hasExistingFunds: z.boolean(),
    fundingAmount: z.number().optional(),
    sponsorName: z.string().optional(),
    sponsorRelation: z.string().optional(),
    sponsorContact: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.fundingSource === "sponsor") {
        return Boolean(
          data.sponsorName && data.sponsorRelation && data.sponsorContact
        );
      }
      return true;
    },
    {
      message: "Sponsor details are required when funding source is sponsor",
      path: ["sponsorName"],
    }
  );

const travelHistorySchema = z.object({
  country: z.string().min(1, "Country is required"),
  purpose: z.string().min(1, "Purpose is required"),
  duration: z.string().min(1, "Duration is required"),
  year: z.number().min(1900).max(new Date().getFullYear()),
});

const additionalInfoSchema = z.object({
  previousVisaRejections: z.boolean(),
  rejectionDetails: z.string().optional().default(""),
  travelHistory: z.array(travelHistorySchema).optional().default([]),
  specialRequirements: z.string().optional().default(""),
  howDidYouHear: z.string().min(1, "Please tell us how you heard about us"),
});

export const applicationSchema = z.object({
  applicationType: z.enum(["study", "work"]),
  status: z.string().default("draft"),
  priority: z.string().default("medium"),
  personalInfo: personalInfoSchema,
  studyDetails: z.union([studyDetailsSchema, z.null()]),
  workDetails: z.union([workDetailsSchema, z.null()]),
  financialInfo: financialInfoSchema,
  additionalInfo: additionalInfoSchema,
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});
