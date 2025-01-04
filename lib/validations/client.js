import * as z from "zod";

const emergencyContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address").optional().nullable(),
});

const universitySchema = z.object({
  name: z.string().min(1, "University name is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
});

const programSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  level: z.enum(["undergraduate", "postgraduate", "phd"], {
    required_error: "Program level is required",
  }),
  duration: z.string().min(1, "Duration is required"),
});

const workDetailsSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  industry: z.string().min(1, "Industry is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  startDate: z.date().optional().nullable(),
  salary: z.string().optional(),
  contractDuration: z.string().optional(),
  workPermitType: z.string().min(1, "Work permit type is required"),
});

export const clientSchema = z.object({
  clientType: z.enum(["study", "work"], {
    required_error: "Client type is required",
  }),
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    dateOfBirth: z.date({
      required_error: "Date of birth is required",
      invalid_type_error: "Invalid date",
    }),
    nationality: z.string().min(1, "Nationality is required"),
    passportNumber: z.string().min(1, "Passport number is required"),
    emergencyContact: emergencyContactSchema,
    profileImage: z.object({
      url: z.string().optional(),
      alt: z.string().optional(),
    }).optional().nullable(),
  }),
  academicInfo: z.object({
    university: universitySchema,
    program: programSchema,
    studentId: z.string().optional(),
    enrollmentDate: z.date().optional().nullable(),
    expectedGraduationDate: z.date().optional().nullable(),
  }).optional().nullable(),
  workInfo: workDetailsSchema.optional().nullable(),
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
    status: z.enum(["active", "expired", "renewal_needed", "processing"], {
      required_error: "Status is required",
    }),
  }),
  status: z.enum(["active", "graduated", "withdrawn", "deferred", "employed", "terminated"], {
    required_error: "Status is required",
  }),
  documents: z.array(
    z.object({
      url: z.string(),
      type: z.string(),
      uploadedAt: z.date(),
    })
  ).optional().default([]),
  notes: z.array(
    z.object({
      content: z.string(),
      createdBy: z.string().optional(),
      createdAt: z.date().optional(),
    })
  ).optional().default([]),
}); 