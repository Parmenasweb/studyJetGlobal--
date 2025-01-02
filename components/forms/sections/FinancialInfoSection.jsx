"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PhoneInput } from "@/components/ui/phone-input";

const fundingSourceOptions = [
  { label: "Self-Funded", value: "self" },
  { label: "Family Support", value: "family" },
  { label: "Sponsor", value: "sponsor" },
  { label: "Bank Loan", value: "loan" },
  { label: "Scholarship", value: "scholarship" },
  { label: "Other", value: "other" },
];

const annualIncomeRanges = [
  { label: "Less than $10,000", value: "0-10000" },
  { label: "$10,000 - $30,000", value: "10000-30000" },
  { label: "$30,000 - $50,000", value: "30000-50000" },
  { label: "$50,000 - $70,000", value: "50000-70000" },
  { label: "$70,000 - $100,000", value: "70000-100000" },
  { label: "More than $100,000", value: "100000+" },
];

export default function FinancialInfoSection({ form }) {
  const fundingSource = form.watch("financialInfo.fundingSource");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="financialInfo.fundingSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source of Funding</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding source" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fundingSourceOptions.map((option) => (
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
            name="financialInfo.annualFamilyIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Average Annual Family Income</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {annualIncomeRanges.map((option) => (
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
        </div>

        <FormField
          control={form.control}
          name="financialInfo.hasExistingFunds"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Existing Funds</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Do you have any existing funds for your{" "}
                  {form.watch("applicationType") === "study"
                    ? "studies"
                    : "relocation"}
                  ?
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

        {fundingSource === "sponsor" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="financialInfo.sponsorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sponsor&apos;s Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter sponsor's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialInfo.sponsorRelation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship with Sponsor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your relationship with sponsor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialInfo.sponsorContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sponsor&apos;s Contact Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Enter sponsor's contact number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
