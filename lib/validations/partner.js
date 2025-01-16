import * as z from "zod";

const documentSchema = z.object({
  type: z.enum(["MOU", "Fee Structure", "Agreement", "License", "Certificate", "Other"], {
    required_error: "Document type is required"
  }),
  title: z.string().min(1, "Document title is required"),
  fileUrl: z.string().url("Invalid file URL"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
  uploadDate: z.date().optional(),
});

const contactPersonSchema = z.object({
  name: z.string().min(1, "Contact person name is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
});

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().optional(),
});

const programSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  level: z.enum(["undergraduate", "postgraduate", "phd", "diploma"], {
    required_error: "Program level is required"
  }),
  duration: z.string().optional(),
  tuitionFee: z.number().min(0).optional(),
});

const universityDetailsSchema = z.object({
  ranking: z.number().optional(),
  accreditation: z.array(z.string()).optional(),
  commission: z.object({
    minimum: z.number().min(0, "Minimum commission must be non-negative"),
    maximum: z.number().min(0, "Maximum commission must be non-negative")
  }).refine(data => data.maximum >= data.minimum, {
    message: "Maximum commission must be greater than or equal to minimum commission"
  }).optional(),
  programs: z.array(programSchema).optional(),
  admissionRequirements: z.array(z.string()).optional(),
  facilities: z.array(z.string()).optional(),
  studentServices: z.array(z.string()).optional(),
  academicCalendar: z.string().optional(),
  applicationDeadlines: z.object({
    fall: z.object({
      early: z.string().optional(),
      regular: z.string().optional(),
      late: z.string().optional(),
    }).optional(),
    spring: z.object({
      early: z.string().optional(),
      regular: z.string().optional(),
      late: z.string().optional(),
    }).optional(),
  }).optional(),
  scholarshipInfo: z.object({
    types: z.array(z.string()).optional(),
    coverage: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
  }).optional(),
  accommodationDetails: z.string().optional(),
  internshipOpportunities: z.object({
    types: z.array(z.string()).optional(),
    duration: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
  }).optional(),
});

const agencyDetailsSchema = z.object({
  services: z.array(z.string()).optional(),
  specialization: z.array(z.string()).optional(),
  commission: z.object({
    minimum: z.number().min(0, "Minimum commission must be non-negative"),
    maximum: z.number().min(0, "Maximum commission must be non-negative")
  }).refine(data => data.maximum >= data.minimum, {
    message: "Maximum commission must be greater than or equal to minimum commission"
  }).optional(),
  coverage: z.array(z.string()).optional(),
  license: z.object({
    number: z.string().optional(),
    expiryDate: z.date().optional(),
  }).optional(),
});

export const partnerSchema = z.object({
  type: z.enum(["university", "agency"]),
  name: z.string().min(1, "Partner name is required"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  description: z.string().optional(),
  address: addressSchema,
  status: z.enum(["active", "inactive", "pending"]).default("active"),
  partnershipDate: z.date(),
  contactPersons: z.array(contactPersonSchema).min(1, "At least one contact person is required"),
  documents: z.array(documentSchema).optional(),
  universityDetails: universityDetailsSchema.optional(),
  agencyDetails: agencyDetailsSchema.optional(),
}); 