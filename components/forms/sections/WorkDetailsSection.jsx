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
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";

const destinationCountries = [
  { label: "United States", value: "usa" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "canada" },
  { label: "Australia", value: "australia" },
  { label: "New Zealand", value: "new_zealand" },
  { label: "Germany", value: "germany" },
  { label: "France", value: "france" },
  { label: "Ireland", value: "ireland" },
  { label: "Netherlands", value: "netherlands" },
  { label: "Sweden", value: "sweden" },
];

const jobCategories = [
  { label: "Information Technology", value: "it" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Engineering", value: "engineering" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Construction", value: "construction" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Other", value: "other" },
];

const experienceLevels = [
  { label: "0-1 years", value: "0-1" },
  { label: "1-3 years", value: "1-3" },
  { label: "3-5 years", value: "3-5" },
  { label: "5-10 years", value: "5-10" },
  { label: "10+ years", value: "10+" },
];

const commonSkills = [
  { label: "Communication", value: "communication" },
  { label: "Leadership", value: "leadership" },
  { label: "Problem Solving", value: "problem_solving" },
  { label: "Team Work", value: "team_work" },
  { label: "Time Management", value: "time_management" },
  { label: "Project Management", value: "project_management" },
  { label: "Customer Service", value: "customer_service" },
  { label: "Sales", value: "sales" },
  { label: "Marketing", value: "marketing" },
  { label: "Data Analysis", value: "data_analysis" },
];

export default function WorkDetailsSection({ form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="workDetails.destinationCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Destination Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {destinationCountries.map((option) => (
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
            name="workDetails.jobCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jobCategories.map((option) => (
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
            name="workDetails.preferredPosition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Position</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your preferred job position"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workDetails.yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {experienceLevels.map((option) => (
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
          name="workDetails.workExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Experience</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your work experience, including your current and previous roles"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workDetails.careerGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Career Goals</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your career goals and why you want to work abroad"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workDetails.skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Select or enter your skills"
                  selected={field.value}
                  options={commonSkills}
                  onChange={field.onChange}
                  creatable
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
