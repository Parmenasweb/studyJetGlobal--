"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { scholarshipSchema } from "@/lib/validations/scholarship";
import { addScholarship, updateScholarship } from "@/actions/destination";

export default function ScholarshipForm({
  destinationId,
  universityId,
  initialData,
  onSuccess,
  onError,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: initialData || {
      name: "",
      amount: 0,
      description: "",
      criteria: "",
      deadline: "",
      type: "merit",
      coverage: "partial",
      status: "active",
      applicationProcess: "",
      requiredDocuments: [],
    },
  });

  async function onSubmit(data) {
    try {
      setIsLoading(true);

      if (initialData) {
        await updateScholarship(
          destinationId,
          universityId,
          initialData._id,
          data
        );
        toast.success("Scholarship updated successfully");
      } else {
        await addScholarship(destinationId, universityId, data);
        toast.success("Scholarship added successfully");
      }

      onSuccess?.();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(error.message || "Something went wrong");
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scholarship Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., International Merit Scholarship"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 10000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Amount in USD</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="merit">Merit-based</SelectItem>
                    <SelectItem value="need-based">Need-based</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coverage</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full">Full</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="specific">Specific</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Deadline</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of the scholarship..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="criteria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eligibility Criteria</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List the eligibility criteria..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applicationProcess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Process</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the application process..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requiredDocuments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Documents</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter required documents separated by commas"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((item) => item.trim())
                    )
                  }
                  value={field.value?.join(", ") || ""}
                />
              </FormControl>
              <FormDescription>
                Enter documents separated by commas (e.g., Passport, Transcripts,
                CV)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Scholarship" : "Add Scholarship"}
        </Button>
      </form>
    </Form>
  );
}