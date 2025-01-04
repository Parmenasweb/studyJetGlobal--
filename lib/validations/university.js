import { z } from "zod";

export const universitySchema = z.object({
  name: z.string().min(1, "University name is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["public", "private"]),
  ranking: z.number().optional().nullable(),
  description: z.string().min(1, "Description is required"),
  website: z.string().url("Invalid website URL"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(1, "Contact phone is required"),
  facilities: z.array(z.string()),
  status: z.enum(["active", "inactive"]),
  media: z.object({
    mainImage: z.object({
      url: z.string(),
      alt: z.string().optional(),
    }).optional().nullable(),
    galleryImages: z.array(
      z.object({
        url: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      })
    ).optional().default([]),
  }).optional().default({}),
}); 