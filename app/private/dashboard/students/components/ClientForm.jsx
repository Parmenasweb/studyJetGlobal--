"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient, updateClient } from "@/actions/client";
import { clientSchema } from "@/lib/validations/client";
import FileUpload from "@/components/fileUpload";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTheme } from "next-themes";

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
import { format, subYears } from "date-fns";
import { CalendarIcon, Loader2, Plus, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { YearPicker } from "@/components/ui/year-picker";
import { FutureDatePicker } from "@/components/ui/future-date-picker";
import { MAJORS, SPECIALIZATIONS, VISA_TYPES } from "@/lib/constants/academic";
import ImageView from "@/components/ImageView";

export function ClientForm({ client }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [availableSpecializations, setAvailableSpecializations] = useState([]);
  const { theme } = useTheme();

  const form = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      status: client?.status || "lead",
      commission: client?.commission || 0,
      personalInfo: {
        fullName: client?.personalInfo?.fullName || "",
        email: client?.personalInfo?.email || "",
        phone: client?.personalInfo?.phone || "",
        dateOfBirth: client?.personalInfo?.dateOfBirth ? new Date(client.personalInfo.dateOfBirth) : undefined,
        nationality: client?.personalInfo?.nationality || "",
        currentResidence: {
          country: client?.personalInfo?.currentResidence?.country || "",
          city: client?.personalInfo?.currentResidence?.city || "",
          address: client?.personalInfo?.currentResidence?.address || "",
        },
        passportNumber: client?.personalInfo?.passportNumber || "",
        emergencyContact: {
          name: client?.personalInfo?.emergencyContact?.name || "",
          relationship: client?.personalInfo?.emergencyContact?.relationship || "",
          phone: client?.personalInfo?.emergencyContact?.phone || "",
          email: client?.personalInfo?.emergencyContact?.email || "",
          address: client?.personalInfo?.emergencyContact?.address || "",
        },
      },
      academicInfo: {
        university: {
          name: client?.academicInfo?.university?.name || "",
          country: client?.academicInfo?.university?.country || "",
        },
        program: {
          name: client?.academicInfo?.program?.name || "",
          level: client?.academicInfo?.program?.level || "",
          major: client?.academicInfo?.program?.major || "",
        },
        enrollmentDate: client?.academicInfo?.enrollmentDate ? new Date(client.academicInfo.enrollmentDate) : undefined,
        expectedGraduationDate: client?.academicInfo?.expectedGraduationDate ? new Date(client.academicInfo.expectedGraduationDate) : undefined,
      },
      documents: client?.documents?.map(doc => ({
        type: doc.type || "",
        title: doc.title || "",
        fileUrl: doc.fileUrl || "",
        status: doc.status || "pending",
      })) || [],
      visaInfo: client?.visaInfo ? {
        type: client.visaInfo.type || "",
        number: client.visaInfo.number || "",
        issueDate: client.visaInfo.issueDate ? new Date(client.visaInfo.issueDate) : undefined,
        expiryDate: client.visaInfo.expiryDate ? new Date(client.visaInfo.expiryDate) : undefined,
        issuingCountry: client.visaInfo.issuingCountry || "",
        status: client.visaInfo.status || "active",
        permitNumber: client.visaInfo.permitNumber || "",
      } : {
        type: "",
        number: "",
        issueDate: undefined,
        expiryDate: undefined,
        issuingCountry: "",
        status: "active",
        permitNumber: "",
      },
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // Format the data to match the model structure
      const formattedData = {
        status: data.status,
        commission: Number(data.commission) || 0,
        personalInfo: {
          fullName: data.personalInfo.fullName,
          email: data.personalInfo.email,
          phone: data.personalInfo.phone,
          dateOfBirth: data.personalInfo.dateOfBirth,
          nationality: data.personalInfo.nationality,
          currentResidence: {
            country: data.personalInfo.currentResidence.country,
            city: data.personalInfo.currentResidence.city || "",
            address: data.personalInfo.currentResidence.address || "",
          },
          passportNumber: data.personalInfo.passportNumber,
          emergencyContact: {
            name: data.personalInfo.emergencyContact.name,
            relationship: data.personalInfo.emergencyContact.relationship,
            phone: data.personalInfo.emergencyContact.phone,
            email: data.personalInfo.emergencyContact.email || "",
            address: data.personalInfo.emergencyContact.address || "",
          },
        },
        academicInfo: {
          university: {
            name: data.academicInfo.university.name,
            country: data.academicInfo.university.country,
          },
          program: {
            name: data.academicInfo.program.name,
            level: data.academicInfo.program.level,
            major: data.academicInfo.program.major,
          },
          enrollmentDate: data.academicInfo.enrollmentDate || null,
          expectedGraduationDate: data.academicInfo.expectedGraduationDate || null,
        },
        documents: data.documents
          ?.filter(doc => doc.fileUrl && doc.type && doc.title) // Only include complete documents
          ?.map(doc => ({
            type: doc.type,
            title: doc.title,
            fileUrl: doc.fileUrl,
            status: "pending",
            uploadDate: new Date(),
          })) || [],
      };

      // Only include visa info if all required fields are provided
      if (data.visaInfo && data.visaInfo.type && data.visaInfo.number && data.visaInfo.issueDate && data.visaInfo.expiryDate && data.visaInfo.issuingCountry) {
        formattedData.visaInfo = {
          type: data.visaInfo.type,
          number: data.visaInfo.number,
          issueDate: data.visaInfo.issueDate,
          expiryDate: data.visaInfo.expiryDate,
          issuingCountry: data.visaInfo.issuingCountry,
          status: data.visaInfo.status || "active",
          permitNumber: data.visaInfo.permitNumber || "",
        };
      }

      // Log the formatted data
      console.log('Submitting client data:', {
        raw: data,
        formatted: formattedData
      });

      let result;
      if (client) {
        result = await updateClient(client._id, formattedData);
        console.log('Updated client:', result);
        toast.success("Client updated successfully");
      } else {
        result = await createClient(formattedData);
        console.log('Created client:', result);
        toast.success("Client created successfully");
      }

      router.push("/private/dashboard/students");
      router.refresh();
    } catch (error) {
      console.error("Error saving client:", error);
      if (error.errors) {
        // Handle validation errors
        const errorMessages = Object.values(error.errors).map(err => err.message);
        errorMessages.forEach(message => toast.error(message));
      } else {
      toast.error(error.message || "Failed to save client");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const watchStatus = form.watch("status");
  const isFormValid = form.formState.isValid;
  const isDirty = form.formState.isDirty;

  // const handleFileUpload = async (file, index) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (!data.success) {
  //       throw new Error(data.error || "Failed to upload file");
  //     }

  //     const currentDocs = form.getValues("documents");
  //     currentDocs[index].fileUrl = data.url;
  //     form.setValue("documents", currentDocs);
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: error.message || "Failed to upload file",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const handleMajorChange = (major) => {
    form.setValue("academicInfo.program.major", major);
    form.setValue("academicInfo.program.specialization", ""); // Reset specialization
    setAvailableSpecializations(SPECIALIZATIONS[major] || []);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="visa">Visa</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
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
                          <SelectItem value="lead">Lead</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

                <FormField
                  control={form.control}
                  name="commission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the commission amount for this client
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

          <FormField
            control={form.control}
                    name="personalInfo.fullName"
            render={({ field }) => (
              <FormItem>
                        <FormLabel>Full Name</FormLabel>
                <FormControl>
                        <Input {...field} />
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
                        <Input type="email" {...field} />
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
                      <FormLabel>Phone</FormLabel>
                  <FormControl>
                        <PhoneInput
                          country="us"
                          value={field.value}
                          onChange={(phone) => field.onChange(phone)}
                          inputProps={{
                            required: true,
                          }}
                          containerClass="phone-input-container"
                          inputClass={cn(
                            "!w-full !h-11 !text-base !rounded-md",
                            theme === "dark" && "!bg-background !text-foreground"
                          )}
                          buttonClass={cn(
                            "!h-11 !rounded-l-md",
                            theme === "dark" && "!bg-background"
                          )}
                          dropdownClass={theme === "dark" ? "dark-dropdown" : ""}
                        />
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
                            defaultMonth={field.value || subYears(new Date(), 18)}
                      initialFocus
                            captionLayout="dropdown-buttons"
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
                      <FormDescription>
                        Your date of birth is used to verify your age and eligibility.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalInfo.gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                            { value: "prefer_not_to_say", label: "Prefer not to say" }
                          ].map((option) => (
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
                    name="personalInfo.nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
                        </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

              {/* Current Residence */}
                <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Residence</h3>
                <div className="grid gap-4 grid-cols-2">
            <FormField
              control={form.control}
                    name="personalInfo.currentResidence.country"
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
                    name="personalInfo.currentResidence.state"
              render={({ field }) => (
                <FormItem>
                        <FormLabel>State/Province</FormLabel>
                  <FormControl>
                          <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                    name="personalInfo.currentResidence.city"
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
                    name="personalInfo.currentResidence.postalCode"
              render={({ field }) => (
                <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalInfo.currentResidence.address"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Emergency Contact</h3>
                <div className="grid gap-4 grid-cols-2">
                  <FormField
                    control={form.control}
                    name="personalInfo.emergencyContact.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
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
                        <FormLabel>Emergency Contact Phone</FormLabel>
                        <FormControl>
                          <PhoneInput
                            country="us"
                            value={field.value}
                            onChange={(phone) => field.onChange(phone)}
                            containerClass="phone-input-container"
                            inputClass={cn(
                              "!w-full !h-11 !text-base !rounded-md",
                              theme === "dark" && "!bg-background !text-foreground"
                            )}
                            buttonClass={cn(
                              "!h-11 !rounded-l-md",
                              theme === "dark" && "!bg-background"
                            )}
                            dropdownClass={theme === "dark" ? "dark-dropdown" : ""}
                          />
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
                          <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
                    name="personalInfo.emergencyContact.address"
              render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Contact Address</FormLabel>
                    <FormControl>
                          <Textarea {...field} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4">
              {/* University Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">University Information</h3>
                <div className="grid gap-4 grid-cols-2">
            <FormField
              control={form.control}
                    name="academicInfo.university.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                    name="academicInfo.university.city"
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
                    name="academicInfo.university.campus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campus</FormLabel>
                            <FormControl>
                          <Input {...field} />
                      </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
              </div>

              {/* Program Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Program Information</h3>
                <div className="grid gap-4 grid-cols-2">
            <FormField
              control={form.control}
                    name="academicInfo.program.name"
              render={({ field }) => (
                <FormItem>
                        <FormLabel>Program Name</FormLabel>
                  <FormControl>
                            <Input {...field} />
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
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { value: "foundation", label: "Foundation" },
                              { value: "bachelor", label: "Bachelor" },
                              { value: "master", label: "Master" },
                              { value: "phd", label: "PhD" },
                              { value: "diploma", label: "Diploma" },
                              { value: "certificate", label: "Certificate" }
                            ].map((option) => (
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
                    name="academicInfo.program.major"
              render={({ field }) => (
                <FormItem>
                        <FormLabel>Major</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={handleMajorChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select major" />
                          </SelectTrigger>
                          <SelectContent>
                            {MAJORS.map((major) => (
                              <SelectItem key={major} value={major}>
                                {major}
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
                    name="academicInfo.program.specialization"
                      render={({ field }) => (
                        <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={!form.watch("academicInfo.program.major")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSpecializations.map((spec) => (
                              <SelectItem key={spec} value={spec}>
                                {spec}
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
                    name="academicInfo.program.duration"
              render={({ field }) => (
                <FormItem>
                        <FormLabel>Duration</FormLabel>
                          <FormControl>
                          <Input {...field} placeholder="e.g., 4 years" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                    name="academicInfo.program.studyMode"
                      render={({ field }) => (
                      <FormItem>
                        <FormLabel>Study Mode</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { value: "full_time", label: "Full Time" },
                              { value: "part_time", label: "Part Time" },
                              { value: "online", label: "Online" },
                              { value: "hybrid", label: "Hybrid" }
                            ].map((option) => (
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
              </div>

              {/* Enrollment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Enrollment Information</h3>
                <div className="grid gap-4 grid-cols-2">
                    <FormField
                      control={form.control}
                    name="academicInfo.studentId"
                      render={({ field }) => (
                        <FormItem>
                        <FormLabel>Student ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
                    name="academicInfo.enrollmentDate"
              render={({ field }) => (
                <FormItem>
                        <FormLabel>Enrollment Date</FormLabel>
                  <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                    name="academicInfo.expectedGraduationDate"
                      render={({ field }) => (
                        <FormItem>
                        <FormLabel>Expected Graduation Date</FormLabel>
                          <FormControl>
                          <FutureDatePicker
                            value={field.value}
                            onChange={field.onChange}
                            yearsInFuture={6}
                          />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
              </div>
            </TabsContent>

            <TabsContent value="visa" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Visa Information</h3>
                <div className="grid gap-4 grid-cols-2">
        <FormField
          control={form.control}
                    name="visaInfo.type"
          render={({ field }) => (
            <FormItem>
                        <FormLabel>Visa Type</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select visa type" />
                          </SelectTrigger>
                          <SelectContent>
                            {VISA_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
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
                    name="visaInfo.number"
          render={({ field }) => (
            <FormItem>
                        <FormLabel>Visa Number</FormLabel>
              <FormControl>
                          <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

                  <FormField
                    control={form.control}
                    name="visaInfo.issueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Date</FormLabel>
                        <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                              </Button>
                          </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visaInfo.expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                          <FutureDatePicker
                            value={field.value}
                            onChange={field.onChange}
                            yearsInFuture={5}
                          />
                            </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visaInfo.issuingCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issuing Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
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
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          <SelectContent>
                            {[
                              { value: "active", label: "Active" },
                              { value: "expired", label: "Expired" },
                              { value: "renewal_needed", label: "Renewal Needed" },
                              { value: "processing", label: "Processing" },
                              { value: "rejected", label: "Rejected" }
                            ].map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <Badge variant={
                                  option.value === "active" ? "success" :
                                  option.value === "processing" ? "warning" :
                                  option.value === "expired" ? "destructive" :
                                  option.value === "rejected" ? "destructive" :
                                  "default"
                                }>
                                  {option.label}
                                </Badge>
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
                    name="visaInfo.permitNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Permit/Residence Number (optional)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                      />
                    </div>
                  </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Documents</h3>
                <div className="grid gap-4">
                    {form.watch("documents")?.map((doc, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            Document {index + 1}
                          </h4>
                        <Button
                            type="button"
                            variant="ghost"
                          size="icon"
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
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <FormField
                          control={form.control}
                          name={`documents.${index}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Document Type</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    { value: "passport", label: "Passport" },
                                    { value: "visa", label: "Visa" },
                                    { value: "admission_letter", label: "Admission Letter" },
                                    { value: "academic_transcript", label: "Academic Transcript" },
                                    { value: "english_proficiency", label: "English Proficiency" },
                                    { value: "financial_statement", label: "Financial Statement" },
                                    { value: "other", label: "Other" }
                                  ].map((option) => (
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
                          name={`documents.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name={`documents.${index}.fileUrl`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Document File</FormLabel>
                                <FormControl>
                                  <FileUpload
                                    folder="/student-docs"
                                    onSuccess={(response) => {
                                      form.setValue(`documents.${index}.fileUrl`, response.url);
                                    }}
                                    onError={(error) => {
                                      toast.error(error.message || "Failed to upload document");
                                    }}
                                    existingUrl={field.value}
                                    onRemove={() => {
                                      form.setValue(`documents.${index}.fileUrl`, "");
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {form.watch(`documents.${index}.fileUrl`) && (
                            <div className="mt-2">
                              <ImageView
                                src={form.watch(`documents.${index}.fileUrl`)}
                                alt={form.watch(`documents.${index}.title`) || "Document preview"}
                                className="w-full max-w-md rounded-lg shadow-sm"
                                width={150}
                                height={150}
                                quality={100}
                                loading="lazy"
                                lo="true"
                              />
                  </div>
                          )}
                </div>
              </CardContent>
            </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentDocs = form.getValues("documents") || [];
                      form.setValue("documents", [
                        ...currentDocs,
                        {
                          type: "",
                          title: "",
                          fileUrl: "",
                          status: "pending",
                        }
                      ]);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                </div>
              </div>
          </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
              onClick={() => router.push("/private/dashboard/students")}
          >
            Cancel
          </Button>
            <Button type="submit" disabled={!isFormValid || !isDirty || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {client ? "Update Client" : "Create Client"}
          </Button>
        </div>
      </form>
    </Form>
    </div>
  );
} 