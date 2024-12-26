import * as z from "zod";

export const universitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["public", "private"]),
  ranking: z.number().min(0).optional(),
  description: z.string().min(1, "Description is required"),
  website: z.string().url("Invalid website URL").optional(),
  contactEmail: z.string().email("Invalid email address").optional(),
  contactPhone: z.string().optional(),
  facilities: z.array(z.string()).optional(),
  images: z.array(
    z.object({
      url: z.string().url("Invalid image URL"),
      caption: z.string().optional(),
    })
  ).optional(),
  status: z.enum(["active", "inactive"]),
  partnershipDetails: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    agreementFile: z.string().optional(),
    commissionRate: z.number().min(0).optional(),
    notes: z.string().optional(),
  }).optional(),
}); 