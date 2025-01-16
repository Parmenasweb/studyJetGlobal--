import * as z from "zod";

export const deadlineSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum([
    "application",
    "document_submission",
    "payment",
    "visa",
    "enrollment",
    "accommodation",
    "other"
  ], {
    required_error: "Type is required",
  }),
  priority: z.enum(["low", "medium", "high", "urgent"], {
    required_error: "Priority is required",
  }),
  status: z.enum(["pending", "in_progress", "completed", "overdue"]).default("pending"),
  progress: z.number().min(0).max(100).default(0),
  dueDate: z.string().min(1, "Due date is required"),
  reminderDate: z.string().optional().nullable(),
  assignedTo: z.string().optional().nullable(),
  relatedTo: z.object({
    type: z.enum(["student", "partner", "university", "program"], {
      required_error: "Related type is required",
    }),
    id: z.string().min(1, "Related ID is required"),
  }),
  attachments: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      type: z.string(),
      size: z.number(),
      uploadedAt: z.date().optional(),
    })
  ).default([]),
  subtasks: z.array(
    z.object({
      title: z.string(),
      completed: z.boolean().default(false),
      dueDate: z.string().optional(),
    })
  ).default([]),
  tags: z.array(z.string()).default([]),
});

export const deadlineUpdateSchema = deadlineSchema.partial();

export const deadlineCommentSchema = z.object({
  content: z.string().min(1, "Comment is required"),
});

export const deadlineFilterSchema = z.object({
  status: z.enum(["pending", "in_progress", "completed", "overdue"]).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  type: z.enum([
    "application",
    "document_submission",
    "payment",
    "visa",
    "enrollment",
    "accommodation",
    "other"
  ]).optional(),
  assignedTo: z.string().optional(),
  relatedType: z.enum(["student", "partner", "university", "program"]).optional(),
  relatedId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  search: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
}); 