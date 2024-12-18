"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Key, Clock } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  twoFactorAuth: z.boolean(),
  passwordPolicy: z.object({
    minLength: z.number().min(8).max(128),
    requireNumbers: z.boolean(),
    requireSymbols: z.boolean(),
    requireUppercase: z.boolean(),
  }),
  sessionTimeout: z.number().min(300).max(86400), // 5 minutes to 24 hours
});

const sessionTimeouts = [
  { value: 900, label: "15 Minutes" },
  { value: 1800, label: "30 Minutes" },
  { value: 3600, label: "1 Hour" },
  { value: 7200, label: "2 Hours" },
  { value: 14400, label: "4 Hours" },
  { value: 28800, label: "8 Hours" },
  { value: 43200, label: "12 Hours" },
  { value: 86400, label: "24 Hours" },
];

export default function SecuritySettingsForm({ initialData, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactorAuth: initialData?.security?.twoFactorAuth || false,
      passwordPolicy: {
        minLength: initialData?.security?.passwordPolicy?.minLength || 8,
        requireNumbers: initialData?.security?.passwordPolicy?.requireNumbers || true,
        requireSymbols: initialData?.security?.passwordPolicy?.requireSymbols || true,
        requireUppercase: initialData?.security?.passwordPolicy?.requireUppercase || true,
      },
      sessionTimeout: initialData?.security?.sessionTimeout || 3600,
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
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="twoFactorAuth"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Two-Factor Authentication
                    </FormLabel>
                    <FormDescription>
                      Require 2FA for all admin users
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Password Policy</h3>
              
              <FormField
                control={form.control}
                name="passwordPolicy.minLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Password Length</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input
                          className="pl-10"
                          type="number"
                          min={8}
                          max={128}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Minimum number of characters required for passwords
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="passwordPolicy.requireNumbers"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Require Numbers
                        </FormLabel>
                        <FormDescription>
                          Passwords must contain at least one number
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordPolicy.requireSymbols"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Require Symbols
                        </FormLabel>
                        <FormDescription>
                          Passwords must contain at least one special character
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordPolicy.requireUppercase"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Require Uppercase
                        </FormLabel>
                        <FormDescription>
                          Passwords must contain at least one uppercase letter
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="sessionTimeout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Timeout</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select session timeout" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sessionTimeouts.map((timeout) => (
                        <SelectItem
                          key={timeout.value}
                          value={String(timeout.value)}
                        >
                          {timeout.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    How long until an inactive session expires
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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