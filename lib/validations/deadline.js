import * as z from "zod";

export const deadlineSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().datetime("Invalid date format"),
  type: z.enum(["application", "document", "payment", "other"]).default("other"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["pending", "completed", "overdue"]).default("pending"),
}); 