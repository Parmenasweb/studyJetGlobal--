"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema } from "@/lib/validations/application";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import FormError from "@/components/dynamicComps/form-error";
import FormSuccess from "@/components/dynamicComps/form-success";

export default function ApplicationForm({ initialData }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: initialData || {
      applicationType: "study",
      status: "draft",
      priority: "medium",
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        whatsapp: "",
        dateOfBirth: new Date(),
        nationality: "",
        currentCountry: "",
        passportNumber: "",
        passportExpiry: new Date(),
        gender: "prefer_not_to_say",
        maritalStatus: "single",
      },
      studyDetails: {
        destinationCountry: "",
        university: "",
        course: "",
        programLevel: "",
        majorSubject: "",
        startDate: new Date(),
        duration: "",
        tuitionFee: 0,
        scholarshipAmount: 0,
        englishProficiency: {
          testType: "ielts",
          overallScore: 0,
          testDate: new Date(),
          expiryDate: new Date(),
        },
      },
      workDetails: {
        destinationCountry: "",
        company: "",
        position: "",
        department: "",
        salary: 0,
        contractDuration: "",
        visaType: "",
        workExperience: [{
          company: "",
          position: "",
          duration: "",
          responsibilities: ""
        }],
      },
      financialInfo: {
        fundingSource: "self",
        monthlyIncome: 0,
        sponsorName: "",
        sponsorRelation: "",
        sponsorContact: "",
      },
      progress: 0,
    },
  });

  const applicationType = form.watch("applicationType");

  async function onSubmit(data) {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Format date fields
      const formattedData = {
        ...data,
        personalInfo: {
          ...data.personalInfo,
          dateOfBirth: data.personalInfo.dateOfBirth.toISOString(),
          passportExpiry: data.personalInfo.passportExpiry.toISOString(),
        },
      };

      if (data.applicationType === "study") {
        formattedData.studyDetails = {
          ...data.studyDetails,
          startDate: data.studyDetails.startDate.toISOString(),
          englishProficiency: {
            ...data.studyDetails.englishProficiency,
            testDate: data.studyDetails.englishProficiency.testDate.toISOString(),
            expiryDate: data.studyDetails.englishProficiency.expiryDate.toISOString(),
          },
        };
        delete formattedData.workDetails;
      }

      if (data.applicationType === "work") {
        formattedData.workDetails = {
          ...data.workDetails,
          workExperience: data.workDetails.workExperience.filter(exp => exp.company || exp.position || exp.duration || exp.responsibilities),
        };
        delete formattedData.studyDetails;
      }

      const url = initialData 
        ? `/api/applications/${initialData._id}`
        : "/api/applications";
      
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formattedData,
          status: initialData ? formattedData.status : "submitted",
          submissionDate: new Date().toISOString(),
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Something went wrong!");
      }

      setSuccess(initialData ? "Application updated successfully!" : "Application submitted successfully!");
      setShowSuccessDialog(true);
      
      if (!initialData) {
        form.reset();
      }
    } catch (error) {
      console.error("Application submission error:", error);
      setError(error.message || "Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>
                {initialData ? "Edit Application" : "New Application"}
              </CardTitle>
              <CardDescription>
                {initialData 
                  ? "Update the application details below"
                  : "Fill in the application details below"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Application Type */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Application Type</h3>
                <FormField
                  control={form.control}
                  name="applicationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="required">Application Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select application type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="study">Study Abroad</SelectItem>
                          <SelectItem value="work">Work Abroad</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="personalInfo.fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
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
                        <FormLabel className="required">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email" {...field} />
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
                        <FormLabel className="required">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalInfo.whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter WhatsApp number" {...field} />
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
                        <FormLabel className="required">Date of Birth</FormLabel>
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
                    name="personalInfo.nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">Nationality</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter nationality" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalInfo.currentCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">Current Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter current country" {...field} />
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
                          <Input placeholder="Enter passport number" {...field} />
                        </FormControl>
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
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalInfo.maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select marital status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalInfo.passportExpiry"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="required">Passport Expiry Date</FormLabel>
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
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Study Details */}
              {applicationType === "study" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Study Details</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="studyDetails.destinationCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="required">Destination Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter destination country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="studyDetails.university"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred University</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter preferred university" {...field} />
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
                          <FormLabel className="required">Program Level</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select program level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="diploma">Diploma</SelectItem>
                              <SelectItem value="bachelors">Bachelor's</SelectItem>
                              <SelectItem value="masters">Master's</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="certificate">Certificate</SelectItem>
                              <SelectItem value="foundation">Foundation</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="studyDetails.majorSubject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="required">Major Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter major subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="studyDetails.startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="required">Start Date</FormLabel>
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
                                disabled={(date) => date < new Date()}
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
                      name="studyDetails.duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="required">Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2 years" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="studyDetails.tuitionFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tuition Fee (USD)</FormLabel>
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

                    <h4 className="text-md font-medium">English Proficiency</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="studyDetails.englishProficiency.testType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">Test Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select test type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ielts">IELTS</SelectItem>
                                <SelectItem value="toefl">TOEFL</SelectItem>
                                <SelectItem value="pte">PTE</SelectItem>
                                <SelectItem value="duolingo">Duolingo</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="studyDetails.englishProficiency.overallScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">Overall Score</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.5"
                                placeholder="Enter overall score"
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
                        name="studyDetails.englishProficiency.testDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="required">Test Date</FormLabel>
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
                                  disabled={(date) => date > new Date()}
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
                        name="studyDetails.englishProficiency.expiryDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="required">Test Expiry Date</FormLabel>
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
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Work Details */}
              {applicationType === "work" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Work Details</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="workDetails.destinationCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="required">Destination Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter destination country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workDetails.company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="required">Company</FormLabel>
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
                          <FormLabel className="required">Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter job position" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workDetails.department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter department" {...field} />
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
                          <FormLabel className="required">Expected Salary (USD)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter expected salary"
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
                          <FormLabel className="required">Contract Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 12 months" {...field} />
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
                          <FormLabel className="required">Visa Type</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter visa type" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Work Experience */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-medium">Work Experience</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentExperience = form.getValues("workDetails.workExperience") || [];
                          form.setValue("workDetails.workExperience", [
                            ...currentExperience,
                            { company: "", position: "", duration: "", responsibilities: "" }
                          ]);
                        }}
                      >
                        Add Experience
                      </Button>
                    </div>
                    
                    {form.watch("workDetails.workExperience")?.map((_, index) => (
                      <div key={index} className="space-y-4 p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">Experience {index + 1}</h5>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => {
                                const currentExperience = form.getValues("workDetails.workExperience");
                                form.setValue(
                                  "workDetails.workExperience",
                                  currentExperience.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name={`workDetails.workExperience.${index}.company`}
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
                            name={`workDetails.workExperience.${index}.position`}
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
                            name={`workDetails.workExperience.${index}.duration`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 2 years" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`workDetails.workExperience.${index}.responsibilities`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Responsibilities</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Enter key responsibilities"
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Financial Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="financialInfo.fundingSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">Funding Source</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select funding source" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="self">Self</SelectItem>
                            <SelectItem value="family">Family</SelectItem>
                            <SelectItem value="scholarship">Scholarship</SelectItem>
                            <SelectItem value="loan">Loan</SelectItem>
                            <SelectItem value="sponsor">Sponsor</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="financialInfo.monthlyIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Income (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter monthly income"
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
                    name="financialInfo.sponsorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sponsor Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter sponsor name" {...field} />
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
                        <FormLabel>Sponsor Relation</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter sponsor relation" {...field} />
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
                        <FormLabel>Sponsor Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter sponsor contact" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              {error && <FormError message={error} />}
              {success && <FormSuccess message={success} />}
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {initialData ? "Update Application" : "Submit Application"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Success!</AlertDialogTitle>
            <AlertDialogDescription>
              {success}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 