import * as z from "zod";

export const consultationSchema = z.object({
  consulteeName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 characters"),
  whatsAppNumber: z.string().min(10, "WhatsApp number must be at least 10 characters"),
  selectedDate: z.date({
    required_error: "Please select a date",
  }),
  selectedTime: z.string({
    required_error: "Please select a time",
  }),
  consultationType: z.enum(["study", "work", "general"], {
    required_error: "Please select a consultation type",
  }),
  preferredMode: z.enum(["online", "in-person"], {
    required_error: "Please select a preferred mode",
  }),
  interestedCountries: z.array(z.string()).min(1, "Please select at least one country"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).default("pending"),
  assignedTo: z.string().optional(),
  notes: z.array(
    z.object({
      content: z.string(),
      author: z.string(),
      createdAt: z.date(),
    })
  ).optional(),
}); 