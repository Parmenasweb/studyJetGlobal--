"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const referralSources = [
  { label: "Google Search", value: "google" },
  { label: "Social Media", value: "social_media" },
  { label: "Friend/Family", value: "referral" },
  { label: "Education Agent", value: "agent" },
  { label: "University/College", value: "institution" },
  { label: "Advertisement", value: "ad" },
  { label: "Other", value: "other" },
];

export default function AdditionalInfoSection({ form }) {
  const hasVisaRejection = form.watch("additionalInfo.previousVisaRejections");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="additionalInfo.previousVisaRejections"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Previous Visa Rejections
                </FormLabel>
                <div className="text-sm text-muted-foreground">
                  Have you ever been rejected for a visa application?
                </div>
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

        {hasVisaRejection && (
          <FormField
            control={form.control}
            name="additionalInfo.rejectionDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rejection Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide details about your visa rejection(s), including the country, year, and reason if known"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="additionalInfo.travelHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Travel History</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please list any countries you have visited in the past 5 years (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalInfo.specialRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requirements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please mention any special requirements or additional information you would like us to know (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalInfo.howDidYouHear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about us?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select how you found us" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {referralSources.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptedTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Terms and Conditions</FormLabel>
                <p className="text-sm text-muted-foreground">
                  I agree to the terms and conditions and confirm that all
                  information provided is accurate and true.
                </p>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
