"use client";

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

const leadFormSchema = z.object({
  clientId: z.string().optional(),
  studentName: z.string().min(1, "Student name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  program: z.string().min(1, "Program is required"),
  university: z.string().min(1, "University is required"),
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
  const { data: clients = [], isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const form = useForm({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      clientId: lead?.clientId || "",
      studentName: lead?.studentName || "",
      email: lead?.email || "",
      phone: lead?.phone || "",
      country: lead?.country || "",
      program: lead?.program || "",
      university: lead?.university || "",
      status: lead?.status || "new",
      notes: lead?.notes || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      lead
        ? updateLead(agent._id, lead._id, data)
        : createLead(agent._id, data),
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

  const handleClientChange = (clientId) => {
    if (!clientId) {
      // Clear form fields if no client is selected
      form.setValue("clientId", "");
      form.setValue("studentName", "");
      form.setValue("email", "");
      form.setValue("phone", "");
      form.setValue("country", "");
      form.setValue("program", "");
      form.setValue("university", "");
      return;
    }
    
    const selectedClient = clients.find((c) => c._id === clientId);
    if (selectedClient) {
      form.setValue("clientId", clientId);
      form.setValue("studentName", selectedClient.personalInfo.fullName);
      form.setValue("email", selectedClient.personalInfo.email);
      form.setValue("phone", selectedClient.personalInfo.phone);
      form.setValue("country", selectedClient.personalInfo.currentResidence.country);
      if (selectedClient.academicInfo) {
        form.setValue("program", selectedClient.academicInfo.program.name);
        form.setValue("university", selectedClient.academicInfo.university.name);
      }
    }
  };

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!lead && (
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Client (Optional)</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value === "none") {
                      handleClientChange(null);
                    } else {
                      handleClientChange(value);
                    }
                  }}
                  value={field.value || "none"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Select a client</SelectItem>
                    {!isLoadingClients && clients.map((client) => (
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
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter student name" {...field} readOnly={!!form.watch("clientId")} />
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
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    {...field}
                    readOnly={!!form.watch("clientId")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} readOnly={!!form.watch("clientId")} />
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
                  <Input placeholder="Enter country" {...field} readOnly={!!form.watch("clientId")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program</FormLabel>
                <FormControl>
                  <Input placeholder="Enter program" {...field} readOnly={!!form.watch("clientId")} />
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
                  <Input placeholder="Enter university" {...field} readOnly={!!form.watch("clientId")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="application_started">Application Started</SelectItem>
                  <SelectItem value="application_submitted">Application Submitted</SelectItem>
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

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional notes"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {lead ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{lead ? "Update Lead" : "Create Lead"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
