import * as z from "zod";

export const consultationSchema = z.object({
  consulteeName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(1, "Contact number is required"),
  whatsAppNumber: z.string().optional(),
  selectedDate: z.date({
    required_error: "Please select a date",
    invalid_type_error: "Invalid date format"
  }),
  selectedTime: z.string().min(1, "Please select a time"),
  consultationType: z.enum(["study", "work", "other"]),
  preferredMode: z.enum(["online", "phone"]),
  interestedCountries: z.array(z.string()).optional(),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).default("pending"),
  notes: z.array(z.object({
    content: z.string(),
    author: z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string()
    }).optional(),
    createdAt: z.string().optional()
  })).optional(),
}); 