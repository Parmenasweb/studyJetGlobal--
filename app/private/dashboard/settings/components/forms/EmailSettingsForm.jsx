"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Server, Key } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const smtpSchema = z.object({
  host: z.string().min(1, "SMTP host is required"),
  port: z.coerce
    .number()
    .int()
    .min(1, "Port must be a positive number")
    .max(65535, "Port must not exceed 65535"),
  username: z.string().min(1, "SMTP username is required"),
  password: z.string().min(1, "SMTP password is required"),
});

const apiSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  domain: z.string().optional(),
});

const formSchema = z.object({
  emailProvider: z.enum(["smtp", "sendgrid", "mailgun"]),
  emailSettings: z.union([smtpSchema, apiSchema]),
});

const providers = [
  { value: "smtp", label: "SMTP Server" },
  { value: "sendgrid", label: "SendGrid" },
  { value: "mailgun", label: "Mailgun" },
];

export default function EmailSettingsForm({ initialData, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [provider, setProvider] = useState(initialData?.emailProvider || "smtp");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailProvider: initialData?.emailProvider || "smtp",
      emailSettings: initialData?.emailSettings || {
        host: "",
        port: 587,
        username: "",
        password: "",
        apiKey: "",
        domain: "",
      },
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

  const handleProviderChange = (value) => {
    setProvider(value);
    form.setValue("emailProvider", value);
    // Reset email settings when changing provider
    form.setValue("emailSettings", {
      host: "",
      port: 587,
      username: "",
      password: "",
      apiKey: "",
      domain: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="emailProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Provider</FormLabel>
                  <Select
                    onValueChange={(value) => handleProviderChange(value)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select email provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem
                          key={provider.value}
                          value={provider.value}
                        >
                          {provider.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose your email service provider
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {provider === "smtp" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="emailSettings.host"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMTP Host</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Server className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          <Input className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Your SMTP server hostname
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailSettings.port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMTP Port</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your SMTP server port (usually 587 or 465)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailSettings.username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMTP Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          <Input className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailSettings.password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMTP Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          <Input
                            className="pl-10"
                            type="password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {(provider === "sendgrid" || provider === "mailgun") && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="emailSettings.apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          <Input
                            className="pl-10"
                            type="password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Your {provider === "sendgrid" ? "SendGrid" : "Mailgun"} API key
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {provider === "mailgun" && (
                  <FormField
                    control={form.control}
                    name="emailSettings.domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domain</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Your Mailgun domain name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}

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