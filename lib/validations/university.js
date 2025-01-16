import * as z from "zod";

// University schema
export const universitySchema = z.object({
  name: z.string().min(1, "University name is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "University type is required"),
  ranking: z.number().optional(),
  description: z.string().optional(),
  website: z.string().url("Must be a valid URL"),
  contactEmail: z.string().email("Must be a valid email"),
  contactPhone: z.string().optional(),
  facilities: z.array(z.string()).optional(),
  media: z.object({
    mainImage: z.object({
      url: z.string().url("Must be a valid URL"),
      alt: z.string().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      size: z.number().optional(),
      caption: z.string().optional(),
    }).optional(),
    galleryImages: z.array(z.object({
      url: z.string().url("Must be a valid URL"),
        alt: z.string().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      size: z.number().optional(),
        caption: z.string().optional(),
    })).optional(),
  }).optional(),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

// Common program data
export const PROGRAM_LEVELS = [
  "Foundation",
  "Certificate",
  "Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctoral Degree",
  "Post Graduate Diploma",
  "Professional Certificate",
];

export const PROGRAM_FIELDS = [
  "Accounting and Finance",
  "Agriculture and Environmental Sciences",
  "Architecture and Design",
  "Arts and Humanities",
  "Business and Management",
  "Computer Science and IT",
  "Education and Teaching",
  "Engineering",
  "Health and Medicine",
  "Hospitality and Tourism",
  "Law and Legal Studies",
  "Marketing and Communications",
  "Mathematics and Statistics",
  "Natural Sciences",
  "Psychology",
  "Social Sciences",
];

export const COMMON_INTAKES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Common scholarship data
export const SCHOLARSHIP_TYPES = [
  "Merit-based",
  "Need-based",
  "Athletic",
  "Research",
  "Cultural",
  "Diversity",
  "First Generation",
  "International Student",
  "Government",
  "Private",
  "Full Funding",
  "Partial Funding",
];

export const SCHOLARSHIP_COVERAGE = [
  "Tuition Fee",
  "Living Expenses",
  "Books and Supplies",
  "Travel Costs",
  "Health Insurance",
  "Research Expenses",
  "Language Courses",
  "Housing",
  "Meal Plan",
  "Technology Fee",
];

// Program schema
export const programSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  field: z.string().min(1, "Field of study is required"),
  level: z.string().min(1, "Program level is required"),
  duration: z.object({
    value: z.number().min(1, "Duration value must be at least 1"),
    unit: z.enum(["years", "months", "semesters"], {
      required_error: "Duration unit is required",
    }),
  }),
  tuitionFee: z.object({
    amount: z.number().min(0, "Tuition fee must be a positive number"),
    currency: z.string().min(1, "Currency is required"),
    period: z.enum(["per_year", "per_semester", "total"], {
      required_error: "Payment period is required",
    }),
  }),
  description: z.string().optional(),
  intakes: z.array(z.string()).min(1, "At least one intake is required"),
  requirements: z.array(z.string()).optional(),
  language: z.object({
    name: z.string().min(1, "Language name is required"),
    level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"], {
      required_error: "Language level is required",
    }),
  }),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

// Common scholarship data
export const COMMON_ELIGIBILITY_REQUIREMENTS = [
  "Minimum GPA of 3.0",
  "Demonstrated Financial Need",
  "Academic Excellence",
  "Leadership Experience",
  "Community Service",
  "Research Experience",
  "Specific Country/Region Residence",
  "First Generation Student",
  "Athletic Achievement",
  "Artistic Achievement",
  "IELTS/TOEFL Score Requirements",
  "Enrolled Full-time",
  "Undergraduate/Graduate Status",
  "Field of Study Specific",
  "Merit Based Performance",
];

export const COMMON_APPLICATION_STEPS = [
  "Complete Online Application Form",
  "Submit Academic Transcripts",
  "Provide Letters of Recommendation",
  "Write Personal Statement/Essay",
  "Submit Financial Documents",
  "Provide Standardized Test Scores",
  "Submit Portfolio",
  "Complete Interview Process",
  "Submit Research Proposal",
  "Provide Language Proficiency Proof",
  "Submit Resume/CV",
  "Fill Scholarship-specific Forms",
];

// Update scholarship schema
export const scholarshipSchema = z.object({
  name: z.string().min(1, "Scholarship name is required"),
  type: z.string().min(1, "Scholarship type is required"),
  coverage: z.array(z.string()).min(1, "At least one coverage item is required"),
  amount: z.object({
    type: z.enum(["fixed", "percentage"]),
    value: z.number().min(0, "Amount must be a positive number"),
    currency: z.string().optional(),
    period: z.enum(["per_year", "per_semester", "total"], {
      required_error: "Payment period is required",
    }),
  }),
  description: z.string().optional(),
  eligibility: z.array(z.string()).min(1, "At least one eligibility requirement is required"),
  deadline: z.string().min(1, "Application deadline is required"),
  applicationProcess: z.array(z.string()).min(1, "At least one application step is required"),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

export const COMMON_PROGRAM_REQUIREMENTS = [
  "High School Diploma/Certificate",
  "Bachelor's Degree",
  "Master's Degree",
  "Academic Transcripts",
  "Language Proficiency Test (IELTS/TOEFL)",
  "Statement of Purpose",
  "Letters of Recommendation",
  "CV/Resume",
  "Portfolio",
  "Research Proposal",
  "GRE/GMAT Score",
  "Passport Copy",
  "Financial Statements",
  "Health Insurance",
  "Police Clearance Certificate",
  "Work Experience"
]; 