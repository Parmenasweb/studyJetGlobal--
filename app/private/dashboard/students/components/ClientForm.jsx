"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient, updateClient } from "@/actions/client";
import { clientSchema } from "@/lib/validations/client";
import { DocumentUpload } from "./DocumentUpload";
import { ImageUpload } from "@/components/ui/image-upload";

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
import { CalendarIcon, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X } from "lucide-react";

export function ClientForm({ client }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: client ? {
      clientType: client.clientType || "study",
      personalInfo: {
        fullName: client.personalInfo?.fullName || "",
        email: client.personalInfo?.email || "",
        phone: client.personalInfo?.phone || "",
        dateOfBirth: client.personalInfo?.dateOfBirth ? new Date(client.personalInfo.dateOfBirth) : null,
        nationality: client.personalInfo?.nationality || "",
        passportNumber: client.personalInfo?.passportNumber || "",
        profileImage: client.personalInfo?.profileImage || null,
        emergencyContact: {
          name: client.personalInfo?.emergencyContact?.name || "",
          relationship: client.personalInfo?.emergencyContact?.relationship || "",
          phone: client.personalInfo?.emergencyContact?.phone || "",
          email: client.personalInfo?.emergencyContact?.email || "",
        },
      },
      academicInfo: client.academicInfo ? {
        university: {
          name: client.academicInfo.university?.name || "",
          country: client.academicInfo.university?.country || "",
          city: client.academicInfo.university?.city || "",
        },
        program: {
          name: client.academicInfo.program?.name || "",
          level: client.academicInfo.program?.level || "",
          duration: client.academicInfo.program?.duration || "",
        },
        studentId: client.academicInfo.studentId || "",
        enrollmentDate: client.academicInfo.enrollmentDate ? new Date(client.academicInfo.enrollmentDate) : null,
        expectedGraduationDate: client.academicInfo.expectedGraduationDate ? new Date(client.academicInfo.expectedGraduationDate) : null,
      } : null,
      workInfo: client.workInfo ? {
        company: client.workInfo.company || "",
        position: client.workInfo.position || "",
        industry: client.workInfo.industry || "",
        country: client.workInfo.country || "",
        city: client.workInfo.city || "",
        startDate: client.workInfo.startDate ? new Date(client.workInfo.startDate) : null,
        salary: client.workInfo.salary || "",
        contractDuration: client.workInfo.contractDuration || "",
        workPermitType: client.workInfo.workPermitType || "",
      } : null,
      visaInfo: {
        type: client.visaInfo?.type || "",
        number: client.visaInfo?.number || "",
        issueDate: client.visaInfo?.issueDate ? new Date(client.visaInfo.issueDate) : null,
        expiryDate: client.visaInfo?.expiryDate ? new Date(client.visaInfo.expiryDate) : null,
        status: client.visaInfo?.status || "active",
      },
      status: client.status || "active",
      notes: client.notes || [],
    } : {
      clientType: "study",
      personalInfo: {
        fullName: "",
      email: "",
      phone: "",
        dateOfBirth: null,
        nationality: "",
        passportNumber: "",
        profileImage: null,
        emergencyContact: {
          name: "",
          relationship: "",
          phone: "",
          email: "",
        },
      },
      academicInfo: {
        university: {
          name: "",
          country: "",
          city: "",
        },
        program: {
          name: "",
          level: "",
          duration: "",
        },
        studentId: "",
        enrollmentDate: null,
        expectedGraduationDate: null,
      },
      workInfo: null,
      visaInfo: {
        type: "",
        number: "",
        issueDate: null,
        expiryDate: null,
        status: "active",
      },
      status: "active",
      notes: [],
    },
    mode: "onChange",
  });

  const clientType = form.watch("clientType");

  const isFormValid = form.formState.isValid;
  const isDirty = form.formState.isDirty;

  const personalInfoValid = Object.keys(form.formState.errors).length === 0 || 
    !Object.keys(form.formState.errors).some(key => key.startsWith('personalInfo'));
  const academicInfoValid = clientType === "work" || (Object.keys(form.formState.errors).length === 0 || 
    !Object.keys(form.formState.errors).some(key => key.startsWith('academicInfo')));
  const workInfoValid = clientType === "study" || (Object.keys(form.formState.errors).length === 0 || 
    !Object.keys(form.formState.errors).some(key => key.startsWith('workInfo')));
  const visaInfoValid = Object.keys(form.formState.errors).length === 0 || 
    !Object.keys(form.formState.errors).some(key => key.startsWith('visaInfo'));

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "profile");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      form.setValue("personalInfo.profileImage", {
        url: data.url,
        alt: file.name,
      });
      setProfileImage(data.url);
      toast.success("Profile image uploaded successfully");
    } catch (error) {
      console.error("Profile image upload error:", error);
      toast.error(error.message || "Failed to upload profile image");
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      setError(null);

      if (client) {
        await updateClient(client._id, data);
        toast.success("Client updated successfully");
      } else {
        await createClient(data);
        toast.success("Client created successfully");
      }

      router.push("/private/dashboard/students");
      router.refresh();
    } catch (error) {
      console.error("Form submission error:", error);
      setError(error.message || "Something went wrong");
      toast.error(error.message || "Failed to save client");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDocumentUpload = async (formData) => {
    try {
      setIsLoading(true);
      // Add client ID to formData if we're editing
      if (client) {
        formData.append("clientId", client._id);
      }

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload documents");
      }

      toast.success("Documents uploaded successfully");
      router.refresh();
    } catch (error) {
      console.error("Document upload error:", error);
      toast.error(error.message || "Failed to upload documents");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal" className="relative">
          Personal Info
          {!personalInfoValid && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
          )}
        </TabsTrigger>
        {clientType === "study" ? (
        <TabsTrigger value="academic" className="relative">
          Academic Info
          {!academicInfoValid && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
          )}
        </TabsTrigger>
        ) : (
          <TabsTrigger value="work" className="relative">
            Work Info
            {!workInfoValid && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
            )}
          </TabsTrigger>
        )}
        <TabsTrigger value="visa" className="relative">
          Visa Info
          {!visaInfoValid && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
          )}
        </TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>

    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="clientType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client type" />
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

                  <div className="col-span-2">
                    <Label>Profile Image</Label>
                    <div className="mt-2">
                      <ImageUpload
                        value={form.watch("personalInfo.profileImage")}
                        disabled={isLoading}
                        folder="studyjet/profiles"
                        onUpload={(data) => {
                          form.setValue("personalInfo.profileImage", {
                            url: data.url,
                            alt: "Profile image",
                          });
                        }}
                      />
                    </div>
                  </div>

          <FormField
            control={form.control}
                    name="personalInfo.fullName"
            render={({ field }) => (
              <FormItem>
                        <FormLabel>Full Name</FormLabel>
                <FormControl>
                          <Input placeholder="John Doe" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalInfo.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
                    name="personalInfo.phone"
            render={({ field }) => (
              <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                          <Input placeholder="+1234567890" {...field} disabled={isLoading} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
                    name="personalInfo.dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                                variant="outline"
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
                      disabled={isLoading}
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
                    name="personalInfo.nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                          <Input placeholder="Nationality" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalInfo.passportNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Passport number" {...field} disabled={isLoading} />
                        </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Emergency Contact</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
                      name="personalInfo.emergencyContact.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Emergency contact name" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.emergencyContact.relationship"
              render={({ field }) => (
                <FormItem>
                          <FormLabel>Relationship</FormLabel>
                  <FormControl>
                            <Input placeholder="Relationship" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.emergencyContact.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Emergency contact phone" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
                      name="personalInfo.emergencyContact.email"
              render={({ field }) => (
                <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                            <Input placeholder="Emergency contact email" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {clientType === "study" ? (
          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="academicInfo.university.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University Name</FormLabel>
                        <FormControl>
                          <Input placeholder="University name" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="academicInfo.university.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="academicInfo.university.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="academicInfo.program.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Program name" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
                    name="academicInfo.program.level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
                    name="academicInfo.program.duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 4 years" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="academicInfo.studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Student ID" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="academicInfo.enrollmentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                        <FormLabel>Enrollment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                                variant="outline"
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
                          disabled={isLoading}
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
                    name="academicInfo.expectedGraduationDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Expected Graduation Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
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
                        disabled={isLoading}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
              </CardContent>
            </Card>
          </TabsContent>
          ) : (
            <TabsContent value="work">
              <Card>
                <CardHeader>
                  <CardTitle>Work Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
                      name="workInfo.company"
              render={({ field }) => (
                <FormItem>
                          <FormLabel>Company Name</FormLabel>
                  <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workInfo.position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
                      name="workInfo.industry"
              render={({ field }) => (
                <FormItem>
                          <FormLabel>Industry</FormLabel>
                  <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workInfo.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
                      name="workInfo.city"
              render={({ field }) => (
                <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workInfo.startDate"
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
                    <FormField
                      control={form.control}
                      name="workInfo.salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary</FormLabel>
                          <FormControl>
                            <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
                      name="workInfo.contractDuration"
              render={({ field }) => (
                <FormItem>
                          <FormLabel>Contract Duration</FormLabel>
                  <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workInfo.workPermitType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Permit Type</FormLabel>
                          <FormControl>
                            <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="visa">
            <Card>
              <CardHeader>
                <CardTitle>Visa Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
                    name="visaInfo.type"
          render={({ field }) => (
            <FormItem>
                        <FormLabel>Visa Type</FormLabel>
              <FormControl>
                          <Input placeholder="e.g., Student Visa" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
                    name="visaInfo.number"
          render={({ field }) => (
            <FormItem>
                        <FormLabel>Visa Number</FormLabel>
              <FormControl>
                          <Input placeholder="Visa number" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

                  <FormField
                    control={form.control}
                    name="visaInfo.issueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Issue Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
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
                              disabled={isLoading}
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
                    name="visaInfo.expiryDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Expiry Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
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
                              disabled={isLoading}
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
                    name="visaInfo.status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visa Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select visa status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                            <SelectItem value="renewal_needed">Renewal Needed</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label>Upload Documents</Label>
                    <div className="mt-2">
                      <ImageUpload
                        folder="studyjet/documents"
                        disabled={isLoading}
                        onUpload={(data) => {
                          // Handle document upload
                          const currentDocs = form.getValues("documents") || [];
                          form.setValue("documents", [
                            ...currentDocs,
                            {
                              url: data.url,
                              type: "document",
                              uploadedAt: new Date(),
                            },
                          ]);
                        }}
                      />
                    </div>
                  </div>

                  {/* Display uploaded documents */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {form.watch("documents")?.map((doc, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                        <Image
                          src={doc.url}
                          alt={`Document ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => {
                            const currentDocs = form.getValues("documents");
                            form.setValue(
                              "documents",
                              currentDocs.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
              onClick={() => router.push("/private/dashboard/students")}
            disabled={isLoading}
          >
            Cancel
          </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !isFormValid || !isDirty}
            >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {client ? "Update Client" : "Create Client"}
              {!isFormValid && !isLoading && (
                <span className="ml-2 text-xs text-muted-foreground">
                  (Complete all required fields)
                </span>
              )}
          </Button>
        </div>
      </form>
    </Form>
    </Tabs>
  );
} 