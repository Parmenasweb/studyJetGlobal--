import * as z from "zod";

export const programSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  field: z.string().min(2, "Field must be at least 2 characters"),
  level: z.enum(["Bachelor's", "Master's", "Doctoral", "Certificate", "Diploma"]),
  duration: z.object({
    value: z.coerce.number().min(1, "Duration must be at least 1"),
    unit: z.enum(["years", "months", "semesters"]),
  }),
  tuitionFee: z.object({
    amount: z.coerce.number().min(0, "Amount must be non-negative"),
    currency: z.enum(["USD", "EUR", "GBP", "CAD", "AUD"]),
    period: z.enum(["per_year", "per_semester", "total"]),
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  intakes: z.array(z.string()).default([]),
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
  language: z.object({
    name: z.string().min(2, "Language name must be at least 2 characters"),
    level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  }),
  status: z.enum(["active", "inactive"]).default("active"),
}); 