"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "@/components/fileUpload";

const leadFormSchema = z.object({
  clientId: z.string().nullable(),
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  country: z.string().min(2, "Country is required"),
  program: z.string().min(2, "Program is required"),
  university: z.string().min(2, "University is required"),
  status: z.enum([
    "new",
    "contacted",
    "application_started",
    "application_submitted",
    "visa_applied",
    "visa_approved",
    "enrolled",
    "rejected",
    "cancelled",
  ]),
  notes: z.string().optional(),
  documents: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
    })
  ).optional(),
});

async function getClients() {
  const res = await fetch("/api/clients");
  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }
  return res.json();
}

async function createLead(agentId, data) {
  const res = await fetch(`/api/agents/${agentId}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create lead");
  }

  return res.json();
}

async function updateLead(agentId, leadId, data) {
  const res = await fetch(`/api/agents/${agentId}/leads/${leadId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update lead");
  }

  return res.json();
}

export function LeadForm({ agent, lead, onSuccess }) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [documents, setDocuments] = useState(lead?.documents || []);

  const { data: clients, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const form = useForm({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      clientId: lead?.clientId || "none",
      studentName: lead?.studentName || "",
      email: lead?.email || "",
      phone: lead?.phone || "",
      country: lead?.country || "",
      program: lead?.program || "",
      university: lead?.university || "",
      status: lead?.status || "new",
      notes: lead?.notes || "",
      documents: lead?.documents || [],
    },
  });

  // Function to handle client selection and auto-fill form
  const handleClientSelection = (clientId) => {
    if (clientId === "none") {
      // Reset form to empty values if "none" is selected
      form.reset({
        clientId: "none",
        studentName: "",
        email: "",
        phone: "",
        country: "",
        program: "",
        university: "",
        status: "new",
        notes: "",
        documents: [],
      });
      setDocuments([]);
    } else {
      // Find the selected client
      const selectedClient = clients?.find(client => client._id === clientId);
      if (selectedClient) {
        // Auto-fill form with client data
        form.reset({
          clientId,
          studentName: selectedClient.personalInfo.fullName,
          email: selectedClient.personalInfo.email,
          phone: selectedClient.personalInfo.phone,
          country: selectedClient.personalInfo.currentResidence.country,
          program: lead?.program || "", // Keep existing or empty
          university: lead?.university || "", // Keep existing or empty
          status: lead?.status || "new",
          notes: lead?.notes || "",
          documents: lead?.documents || [],
        });
      }
    }
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      // Transform the data before sending to the API
      const transformedData = {
        ...data,
        clientId: data.clientId === "none" ? null : data.clientId,
      };
      return lead
        ? updateLead(agent._id, lead._id, transformedData)
        : createLead(agent._id, transformedData);
    },
    onSuccess: () => {
      toast.success(
        lead ? "Lead updated successfully" : "Lead created successfully"
      );
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoadingForm(true);
      data.documents = documents;
      await mutation.mutateAsync(data);
    } finally {
      setIsLoadingForm(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {/* Client Selection */}
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link to Client (Optional)</FormLabel>
                  <Select
                    disabled={isLoadingForm || isLoadingClients}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleClientSelection(value);
                    }}
                    value={field.value || "none"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {clients?.map((client) => (
                        <SelectItem key={client._id} value={client._id}>
                          {client.personalInfo.fullName} ({client.personalInfo.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoadingForm} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled={isLoadingForm} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoadingForm} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoadingForm} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Program Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoadingForm} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoadingForm} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    disabled={isLoadingForm}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="application_started">
                        Application Started
                      </SelectItem>
                      <SelectItem value="application_submitted">
                        Application Submitted
                      </SelectItem>
                      <SelectItem value="visa_applied">Visa Applied</SelectItem>
                      <SelectItem value="visa_approved">Visa Approved</SelectItem>
                      <SelectItem value="enrolled">Enrolled</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isLoadingForm}
                      rows={4}
                      placeholder="Add any notes about the lead..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Documents */}
            <div className="space-y-4">
              <FormLabel>Documents (Optional)</FormLabel>
              <div className="grid gap-4">
                <FileUpload
                  folder="/agents/leads"
                  onSuccess={(response) => {
                    const newDoc = {
                      title: response.name,
                      url: response.url,
                    };
                    setDocuments([...documents, newDoc]);
                  }}
                  onError={(error) => {
                    toast.error(error.message || "Failed to upload document");
                  }}
                />
                {documents.length > 0 && (
                  <div className="grid gap-2">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded-md"
                      >
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {doc.title}
                        </a>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newDocs = [...documents];
                            newDocs.splice(index, 1);
                            setDocuments(newDocs);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoadingForm}>
            {isLoadingForm ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : lead ? (
              "Update Lead"
            ) : (
              "Create Lead"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
