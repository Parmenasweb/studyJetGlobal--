"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Globe, Mail, Calendar } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  siteName: z
    .string()
    .min(2, "Site name must be at least 2 characters")
    .max(50, "Site name must not exceed 50 characters"),
  siteDescription: z
    .string()
    .max(200, "Site description must not exceed 200 characters")
    .optional(),
  contactEmail: z.string().email("Please enter a valid email address"),
  timezone: z.string(),
  dateFormat: z.string(),
});

const timezones = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "British Time (BST)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Asia/Dubai", label: "Gulf Standard Time (GST)" },
  { value: "Asia/Singapore", label: "Singapore Time (SGT)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
];

const dateFormats = [
  { value: "YYYY-MM-DD", label: "2024-01-31" },
  { value: "MM/DD/YYYY", label: "01/31/2024" },
  { value: "DD/MM/YYYY", label: "31/01/2024" },
  { value: "MMM D, YYYY", label: "Jan 31, 2024" },
  { value: "D MMM YYYY", label: "31 Jan 2024" },
];

export default function GeneralSettingsForm({ initialData, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: initialData?.siteName || "",
      siteDescription: initialData?.siteDescription || "",
      contactEmail: initialData?.contactEmail || "",
      timezone: initialData?.timezone || "UTC",
      dateFormat: initialData?.dateFormat || "YYYY-MM-DD",
    },
  });

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="siteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The name of your website as it appears to users
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="siteDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    A brief description of your website (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input className="pl-10" type="email" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The primary contact email for your website
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timezones.map((timezone) => (
                          <SelectItem
                            key={timezone.value}
                            value={timezone.value}
                          >
                            {timezone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Your website&apos;s default timezone
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Format</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dateFormats.map((format) => (
                          <SelectItem
                            key={format.value}
                            value={format.value}
                          >
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How dates are displayed across your website
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 