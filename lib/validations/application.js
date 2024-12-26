import * as z from "zod";

const documentSchema = z.object({
  name: z.string().min(1, "Document name is required"),
  url: z.string().url("Invalid document URL"),
  type: z.enum(['passport', 'transcript', 'certificate', 'resume', 'recommendation', 'language_test', 'other'], {
    required_error: "Document type is required"
  }),
  uploadDate: z.date().default(() => new Date()),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  notes: z.string().optional()
});

const noteSchema = z.object({
  content: z.string().min(1, "Note content is required"),
  author: z.string().min(1, "Author is required"),
  createdAt: z.date().default(() => new Date())
});

const timelineEventSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  description: z.string().optional(),
  status: z.string().optional(),
  date: z.date().default(() => new Date()),
  updatedBy: z.string().optional()
});

const academicBackgroundSchema = z.object({
  institution: z.string().min(1, "Institution name is required"),
  qualification: z.string().min(1, "Qualification is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  grade: z.string().min(1, "Grade is required"),
  yearCompleted: z.number().min(1900).max(new Date().getFullYear())
});

const workExperienceSchema = z.object({
  company: z.string().optional(),
  position: z.string().optional(),
  duration: z.string().optional(),
  responsibilities: z.string().optional(),
});

const englishProficiencySchema = z.object({
  testType: z.enum(["ielts", "toefl", "pte", "duolingo", "other"]),
  overallScore: z.number().min(0),
  testDate: z.date(),
  expiryDate: z.date(),
});

export const applicationSchema = z.object({
  applicationType: z.enum(["study", "work"]),
  status: z.enum(["draft", "submitted", "under_review", "approved", "rejected"]).default("draft"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    whatsapp: z.string().min(1, "WhatsApp number is required"),
    dateOfBirth: z.date({
      required_error: "Date of birth is required",
    }),
    nationality: z.string().min(1, "Nationality is required"),
    currentCountry: z.string().min(1, "Current country is required"),
    passportNumber: z.string().min(1, "Passport number is required"),
    passportExpiry: z.date({
      required_error: "Passport expiry date is required",
    }),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
    maritalStatus: z.enum(["single", "married", "other"]),
  }),
  studyDetails: z.object({
    destinationCountry: z.string().min(1, "Destination country is required"),
    university: z.string().optional(),
    course: z.string().optional(),
    programLevel: z.enum([
      "diploma",
      "bachelors",
      "masters",
      "phd",
      "certificate",
      "foundation",
    ]),
    majorSubject: z.string().min(1, "Major subject is required"),
    startDate: z.date({
      required_error: "Start date is required",
    }),
    duration: z.string().min(1, "Duration is required"),
    tuitionFee: z.number().min(0).optional(),
    scholarshipAmount: z.number().min(0).optional(),
    englishProficiency: englishProficiencySchema,
  }).optional(),
  workDetails: z.object({
    destinationCountry: z.string().min(1, "Destination country is required"),
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    department: z.string().optional(),
    salary: z.number().min(0),
    contractDuration: z.string().min(1, "Contract duration is required"),
    visaType: z.string().min(1, "Visa type is required"),
    workExperience: z.array(workExperienceSchema),
  }).optional(),
  financialInfo: z.object({
    fundingSource: z.enum([
      "self",
      "family",
      "scholarship",
      "loan",
      "sponsor",
      "other",
    ]),
    monthlyIncome: z.number().min(0).optional(),
    sponsorName: z.string().optional(),
    sponsorRelation: z.string().optional(),
    sponsorContact: z.string().optional(),
  }),
  progress: z.number().min(0).max(100).default(0),
}).refine(
  (data) => {
    if (data.applicationType === "study") {
      return data.studyDetails !== undefined;
    }
    if (data.applicationType === "work") {
      return data.workDetails !== undefined;
    }
    return true;
  },
  {
    message: "Study details are required for study applications, work details for work applications",
    path: ["applicationType"],
  }
); 