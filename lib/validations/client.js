import * as z from "zod";

const documentSchema = z.object({
  type: z.enum([
    "passport",
    "visa",
    "admission_letter",
    "academic_transcript",
    "english_proficiency",
    "financial_statement",
    "other"
  ]),
  title: z.string().min(1, "Document title is required"),
  fileUrl: z.string().min(1, "Document URL is required"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

const emergencyContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address").optional().nullable(),
  address: z.string().optional().nullable(),
});

const currentResidenceSchema = z.object({
  country: z.string().min(1, "Country is required"),
  city: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
});

const universitySchema = z.object({
  name: z.string().min(1, "University name is required"),
  country: z.string().min(1, "Country is required"),
});

const programSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  level: z.enum(["foundation", "bachelor", "master", "phd"], {
    required_error: "Program level is required",
  }),
  major: z.string().min(1, "Major is required"),
});

export const clientSchema = z.object({
  status: z.enum(["lead", "active", "inactive"], {
    required_error: "Status is required",
  }).default("lead"),
  commission: z.number().min(0, "Commission cannot be negative").default(0),
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    dateOfBirth: z.date({
      required_error: "Date of birth is required",
      invalid_type_error: "Invalid date",
    }),
    nationality: z.string().min(1, "Nationality is required"),
    currentResidence: currentResidenceSchema,
    passportNumber: z.string().min(1, "Passport number is required"),
    emergencyContact: emergencyContactSchema,
  }),
  academicInfo: z.object({
    university: universitySchema,
    program: programSchema,
    enrollmentDate: z.date().optional().nullable(),
    expectedGraduationDate: z.date().optional().nullable(),
  }),
  documents: z.array(documentSchema).optional().default([]),
  visaInfo: z.object({
    type: z.string().min(1, "Visa type is required"),
    number: z.string().min(1, "Visa number is required"),
    issueDate: z.date({
      required_error: "Issue date is required",
      invalid_type_error: "Invalid date",
    }),
    expiryDate: z.date({
      required_error: "Expiry date is required",
      invalid_type_error: "Invalid date",
    }),
    issuingCountry: z.string().min(1, "Issuing country is required"),
    status: z.enum([
      "active",
      "expired",
      "renewal_needed",
      "processing",
      "rejected",
    ]),
    permitNumber: z.string().optional().nullable(),
  }).optional().nullable(),
}); 