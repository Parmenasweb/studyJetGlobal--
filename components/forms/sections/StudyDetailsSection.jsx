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
import { DatePicker } from "@/components/ui/date-picker";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";

const programLevels = [
  { label: "Diploma", value: "diploma" },
  { label: "Bachelor's Degree", value: "bachelors" },
  { label: "Master's Degree", value: "masters" },
  { label: "PhD", value: "phd" },
  { label: "Certificate", value: "certificate" },
];

const studyFields = [
  { label: "Business & Management", value: "business" },
  { label: "Computer Science & IT", value: "computer_science" },
  { label: "Engineering", value: "engineering" },
  { label: "Medicine & Healthcare", value: "medicine" },
  { label: "Arts & Design", value: "arts" },
  { label: "Social Sciences", value: "social_sciences" },
  { label: "Natural Sciences", value: "natural_sciences" },
  { label: "Law", value: "law" },
  { label: "Education", value: "education" },
  { label: "Other", value: "other" },
];

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

const englishTests = [
  { label: "IELTS", value: "ielts" },
  { label: "TOEFL", value: "toefl" },
  { label: "PTE", value: "pte" },
  { label: "Duolingo", value: "duolingo" },
  { label: "Other", value: "other" },
];

export default function StudyDetailsSection({ form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="studyDetails.destinationCountry"
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
            name="studyDetails.preferredCities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Cities</FormLabel>
                <FormControl>
                  <MultiSelect
                    placeholder="Select preferred cities"
                    selected={field.value}
                    options={[]}
                    onChange={field.onChange}
                    creatable
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studyDetails.intakeDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Intake Date</FormLabel>
                <FormControl>
                  <DatePicker
                    placeholder="Select intake date"
                    onChange={field.onChange}
                    date={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studyDetails.programLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {programLevels.map((option) => (
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
            name="studyDetails.fieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field of study" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {studyFields.map((option) => (
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
            name="studyDetails.specificProgram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Program (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter specific program name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studyDetails.preferredUniversities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Universities (Optional)</FormLabel>
                <FormControl>
                  <MultiSelect
                    placeholder="Enter preferred universities"
                    selected={field.value}
                    options={[]}
                    onChange={field.onChange}
                    creatable
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="studyDetails.academicBackground"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Background</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your academic background, including your highest qualification"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="studyDetails.englishProficiency.testType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Test Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {englishTests.map((option) => (
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
            name="studyDetails.englishProficiency.score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Score</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your test score" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studyDetails.englishProficiency.testDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Date</FormLabel>
                <FormControl>
                  <DatePicker
                    placeholder="Select test date"
                    onChange={field.onChange}
                    date={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="studyDetails.studyGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Study Goals</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your study goals and why you want to study abroad"
                  {...field}
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
