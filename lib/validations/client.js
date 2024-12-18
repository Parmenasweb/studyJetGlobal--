import * as z from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  clientType: z.enum(["study", "work"]),
  status: z.enum(["pending", "active", "completed"]),
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  applicationDate: z.date(),
  studyDetails: z.object({
    university: z.string().optional(),
    course: z.string().optional(),
    programLevel: z.enum(["undergraduate", "postgraduate", "phd"]).optional(),
    startDate: z.date().optional(),
  }).optional(),
  workDetails: z.object({
    company: z.string().optional(),
    jobTitle: z.string().optional(),
    contractDuration: z.string().optional(),
    expectedSalary: z.number().min(0).optional(),
  }).optional(),
  commissionAmount: z.number().min(0),
  notes: z.string().optional(),
}); 