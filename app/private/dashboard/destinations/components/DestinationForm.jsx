"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { destinationSchema } from "@/lib/validations/destination";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createDestination, updateDestination } from "@/actions/destination";

export function DestinationForm({ initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize the form with default values
  const form = useForm({
    resolver: zodResolver(destinationSchema),
    defaultValues: initialData || {
      name: "",
      countryCode: "",
      capital: "",
      description: "",
      quickFacts: {
        population: "",
        language: "",
        currency: "",
        internationalStudents: "",
        averageCostOfLiving: 0,
        climateInfo: "",
      },
      studyInfo: {
        averageTuitionFee: 0,
        academicYear: "",
        majorCities: [],
        popularPrograms: [],
        admissionRequirements: [],
        visaRequirements: [],
      },
      media: {
        mainImage: "",
        flagImage: "",
        galleryImages: [],
        videoUrl: "",
      },
      statistics: {
        studentSatisfactionRate: 0,
        employmentRate: 0,
        internationalStudentRatio: 0,
      },
      status: "draft",
    },
  });

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const action = initialData ? updateDestination : createDestination;
      const { error } = await action(initialData?._id, data);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success(
        initialData ? "Destination updated successfully" : "Destination created successfully"
      );
      router.push("/private/dashboard/destinations");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="study">Study Info</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. United States" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. US" maxLength={2} {...field} />
                        </FormControl>
                        <FormDescription>
                          Two-letter ISO country code
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capital"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capital City</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Washington, D.C." {...field} />
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
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
                    <FormItem className="mt-4">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the destination..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Quick Facts</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quickFacts.population"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Population</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 331 million" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quickFacts.language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quickFacts.currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. USD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quickFacts.internationalStudents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>International Students</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 1 million" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quickFacts.averageCostOfLiving"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Cost of Living (USD/year)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 15000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quickFacts.climateInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Climate Info</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Four distinct seasons"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="study" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="studyInfo.averageTuitionFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Tuition Fee (USD/year)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 25000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studyInfo.academicYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Year</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. September to May"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="studyInfo.majorCities"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Major Cities</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter cities separated by commas"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.split(",").map((s) => s.trim()))
                          }
                          value={field.value?.join(", ") || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studyInfo.popularPrograms"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Popular Programs</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter programs separated by commas"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.split(",").map((s) => s.trim()))
                          }
                          value={field.value?.join(", ") || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="media.mainImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="media.flagImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flag Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="media.videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="media.galleryImages"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Gallery Images</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter image URLs separated by commas"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.split(",").map((s) => s.trim()))
                          }
                          value={field.value?.join(", ") || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="statistics.studentSatisfactionRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student Satisfaction Rate (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g. 85"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="statistics.employmentRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Rate (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g. 92"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="statistics.internationalStudentRatio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>International Student Ratio (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g. 15"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </div>
            ) : initialData ? (
              "Update Destination"
            ) : (
              "Create Destination"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
} 