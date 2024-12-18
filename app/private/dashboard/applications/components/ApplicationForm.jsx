"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { applicationSchema } from "@/lib/validations/application";
import { createApplication, updateApplication } from "@/actions/application";
import { useState } from "react";

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentUpload } from "./DocumentUpload";
import { NotesSection } from "./NotesSection";
import { Timeline } from "./Timeline";

export function ApplicationForm({ application, clients }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      clientId: application?.clientId || "",
      applicationType: application?.applicationType || "study",
      status: application?.status || "draft",
      destination: application?.destination || "",
      submissionDate: application?.submissionDate ? new Date(application.submissionDate) : new Date(),
      studyDetails: application?.studyDetails || {
        university: "",
        course: "",
        programLevel: "undergraduate",
        startDate: new Date(),
        tuitionFee: 0,
        scholarshipAmount: 0,
      },
      workDetails: application?.workDetails || {
        company: "",
        position: "",
        salary: 0,
        contractDuration: "",
        visaType: "",
      },
      documents: application?.documents || [],
      notes: application?.notes || [],
    },
  });

  const applicationType = form.watch("applicationType");

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      if (application) {
        await updateApplication(application._id, data);
        toast.success("Application updated successfully");
      } else {
        await createApplication(data);
        toast.success("Application created successfully");
      }
      router.push("/private/dashboard/applications");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client._id} value={client._id}>
                            {client.name}
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
                name="applicationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="study">Study</SelectItem>
                        <SelectItem value="work">Work</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
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
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter destination" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="submissionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Submission Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Tabs defaultValue={applicationType} className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="study">Study Details</TabsTrigger>
                <TabsTrigger value="work">Work Details</TabsTrigger>
              </TabsList>

              <TabsContent value="study" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="studyDetails.university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter university" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studyDetails.course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter course" {...field} />
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
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="undergraduate">
                              Undergraduate
                            </SelectItem>
                            <SelectItem value="postgraduate">
                              Postgraduate
                            </SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studyDetails.startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studyDetails.tuitionFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tuition Fee</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter tuition fee"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studyDetails.scholarshipAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scholarship Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter scholarship amount"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="work" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="workDetails.company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workDetails.position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter position" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workDetails.salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter salary"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workDetails.contractDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter duration" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workDetails.visaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visa Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter visa type" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {application && (
          <>
            <DocumentUpload
              applicationId={application._id}
              documents={application.documents}
              onUpload={(updatedApplication) => {
                form.setValue("documents", updatedApplication.documents);
              }}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <NotesSection
                applicationId={application._id}
                notes={application.notes}
                onAddNote={(updatedApplication) => {
                  form.setValue("notes", updatedApplication.notes);
                }}
              />
              <Timeline timeline={application.timeline} />
            </div>
          </>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/private/dashboard/applications")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "Saving..."
            ) : application ? (
              "Update Application"
            ) : (
              "Create Application"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
} 