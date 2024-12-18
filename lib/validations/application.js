import * as z from "zod";

const documentSchema = z.object({
  name: z.string().min(1, "Document name is required"),
  url: z.string().url("Invalid URL"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

const noteSchema = z.object({
  content: z.string().min(1, "Note content is required"),
  author: z.string().min(1, "Author is required"),
});

export const applicationSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  applicationType: z.enum(["study", "work"], {
    required_error: "Application type is required",
  }),
  status: z.enum(["draft", "submitted", "processing", "approved", "rejected"]),
  destination: z.string().min(2, "Destination is required"),
  submissionDate: z.date(),
  
  // Conditional fields based on applicationType
  studyDetails: z.object({
    university: z.string().min(1, "University is required"),
    course: z.string().min(1, "Course is required"),
    programLevel: z.enum(["undergraduate", "postgraduate", "phd"]),
    startDate: z.date(),
    tuitionFee: z.number().min(0),
    scholarshipAmount: z.number().min(0).optional(),
  }).optional(),

  workDetails: z.object({
    company: z.string().min(1, "Company is required"),
    position: z.string().min(1, "Position is required"),
    salary: z.number().min(0),
    contractDuration: z.string().min(1, "Contract duration is required"),
    visaType: z.string().min(1, "Visa type is required"),
  }).optional(),

  documents: z.array(documentSchema).optional(),
  notes: z.array(noteSchema).optional(),
}).refine((data) => {
  if (data.applicationType === "study") {
    return !!data.studyDetails;
  }
  if (data.applicationType === "work") {
    return !!data.workDetails;
  }
  return true;
}, {
  message: "Please provide the required details for the selected application type",
}); 