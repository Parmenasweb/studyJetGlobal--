import * as z from "zod";

const languageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  proficiencyLevel: z.enum(["basic", "intermediate", "advanced", "native"]),
});

const academicBackgroundSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  qualification: z.string().min(1, "Qualification is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  grade: z.string().min(1, "Grade is required"),
  yearCompleted: z.number().min(2000, "Year completed is required"),
});

const workExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  duration: z.string().min(1, "Duration is required"),
  responsibilities: z.string().min(1, "Responsibilities are required"),
});

const travelHistorySchema = z.object({
  country: z.string().min(1, "Country is required"),
  purpose: z.string().min(1, "Purpose is required"),
  year: z.string().min(1, "Year is required"),
  duration: z.string().optional(),
});

const englishProficiencySchema = z.object({
  testType: z.enum(["ielts", "toefl", "pte", "duolingo", "other"]),
  overallScore: z.number().min(0, "Overall score is required"),
  testDate: z.date({
    required_error: "Test date is required",
    invalid_type_error: "That's not a valid date!",
  }),
  expiryDate: z.date({
    required_error: "Expiry date is required",
    invalid_type_error: "That's not a valid date!",
  }),
});

export const applicationSchema = z.object({
  applicationType: z.enum(["study", "work"]),
  status: z.enum(["draft", "submitted", "under_review", "approved", "rejected", "pending_documents"])
    .default("draft"),
  priority: z.enum(["low", "medium", "high"])
    .default("medium"),
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    whatsapp: z.string().min(1, "WhatsApp number is required"),
    dateOfBirth: z.date({
      required_error: "Date of birth is required",
      invalid_type_error: "That's not a valid date!",
    }),
    nationality: z.string().min(1, "Nationality is required"),
    currentCountry: z.string().min(1, "Current country is required"),
    currentCity: z.string().min(1, "Current city is required"),
    passportNumber: z.string().optional(),
    passportExpiry: z.date().optional().nullable(),
    gender: z.string().min(1, "Gender is required"),
    maritalStatus: z.string().min(1, "Marital status is required"),
    languages: z.array(languageSchema).min(1, "At least one language is required"),
  }),
  studyDetails: z.object({
    destinationCountry: z.string().min(1, "Destination country is required"),
    preferredCities: z.array(z.string()).min(1, "At least one preferred city is required").optional(),
    intakeDate: z.string().min(1, "Intake date is required"),
    programLevel: z.string().min(1, "Program level is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    specificProgram: z.string().min(1, "Specific program is required"),
    preferredUniversities: z.array(z.string()).min(1, "At least one preferred university is required").optional(),
    academicBackground: z.array(academicBackgroundSchema).min(1, "Academic background is required"),
    englishProficiency: englishProficiencySchema,
    hasScholarshipRequirement: z.boolean().default(false),
    studyGoals: z.string().min(1, "Study goals are required"),
  }).optional().nullable(),
  workDetails: z.object({
    destinationCountry: z.string().min(1, "Destination country is required"),
    jobCategory: z.string().min(1, "Job category is required"),
    preferredPosition: z.string().min(1, "Preferred position is required"),
    yearsOfExperience: z.string().min(1, "Years of experience is required"),
    workExperience: z.array(workExperienceSchema).optional(),
    careerGoals: z.string().min(1, "Career goals are required"),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
  }).optional().nullable(),
  financialInfo: z.object({
    fundingSource: z.enum(["self", "family", "sponsor", "loan", "scholarship"]),
    annualFamilyIncome: z.number().min(0, "Annual family income is required"),
    hasExistingFunds: z.boolean(),
    fundingAmount: z.number().optional(),
    sponsorName: z.string().optional(),
    sponsorRelation: z.string().optional(),
    sponsorContact: z.string().optional(),
  }),
  additionalInfo: z.object({
    previousVisaRejections: z.boolean(),
    rejectionDetails: z.string().optional(),
    travelHistory: z.array(travelHistorySchema).optional(),
    specialRequirements: z.string().optional(),
    howDidYouHear: z.string().min(1, "Please tell us how you heard about us"),
  }),
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});
