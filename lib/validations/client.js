import * as z from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  clientType: z.enum(["study", "work"]),
  status: z.enum(["pending", "active", "completed"]).default("pending"),
  destination: z.string().min(1, "Destination is required"),
  applicationDate: z.date().default(() => new Date()),
  studyDetails: z.object({
    university: z.string().optional(),
    course: z.string().optional(),
    programLevel: z.string().optional(),
    startDate: z.date().optional(),
  }).optional(),
  workDetails: z.object({
    company: z.string().optional(),
    jobTitle: z.string().optional(),
    contractDuration: z.string().optional(),
    expectedSalary: z.number().optional(),
  }).optional(),
  commissionAmount: z.number().default(0),
  notes: z.string().optional(),
  documents: z.array(z.object({
    name: z.string(),
    url: z.string().url("Invalid document URL"),
    uploadDate: z.date(),
  })).default([]),
}); 