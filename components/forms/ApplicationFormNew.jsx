"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  Loader2,
  Building2,
  BookOpen,
  GraduationCap,
  Briefcase,
  Plus,
  Minus,
  Trash2,
  Wallet,
  Info,
  AlertCircle,
  User,
} from "lucide-react";
import { applicationSchema } from "@/lib/validations/application";
import FormError from "../dynamicComps/form-error";
import FormSuccess from "../dynamicComps/form-success";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import ReactConfetti from 'react-confetti';
import { useTheme } from "next-themes";
import { addYears, subYears } from "date-fns";

export default function ApplicationForm({ isEditing = false, initialData = null, onSubmit }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { theme } = useTheme();
  
  // Add window dimensions state for confetti
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Update window dimensions on mount and resize
  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    updateWindowDimensions();

    // Add event listener
    window.addEventListener("resize", updateWindowDimensions);

    // Cleanup
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  // Scroll to top and auto-hide confetti after 5 seconds
  useEffect(() => {
    if (showConfetti) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

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
        currentCity: "",
        passportNumber: "",
        passportExpiry: null,
        gender: "",
        maritalStatus: "",
        languages: [{ language: "", proficiencyLevel: "basic" }],
      },
      studyDetails: {
        destinationCountry: "",
        preferredCities: [],
        intakeDate: "",
        programLevel: "",
        fieldOfStudy: "",
        specificProgram: "",
        preferredUniversities: [],
        academicBackground: [
          {
            institution: "",
            qualification: "",
            fieldOfStudy: "",
            grade: "",
            yearCompleted: new Date().getFullYear(),
          },
        ],
        englishProficiency: {
          testType: "ielts",
          overallScore: 0,
          testDate: new Date(),
          expiryDate: new Date(),
        },
        hasScholarshipRequirement: false,
        studyGoals: "",
      },
      workDetails: null,
      financialInfo: {
        fundingSource: "self",
        annualFamilyIncome: 0,
        hasExistingFunds: false,
        fundingAmount: 0,
        sponsorName: "",
        sponsorRelation: "",
        sponsorContact: "",
      },
      additionalInfo: {
        previousVisaRejections: false,
        rejectionDetails: "",
        travelHistory: [],
        specialRequirements: "",
        howDidYouHear: "",
      },
      acceptedTerms: false,
    },
    mode: "onChange",
  });

  // Debug validation errors
  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.log("Form Errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  // Watch for form values changes
  const applicationType = form.watch("applicationType");

  // Reset irrelevant sections when application type changes
  useEffect(() => {
    if (applicationType === "study") {
      form.setValue("workDetails", null);
      if (!form.getValues("studyDetails")) {
        form.setValue("studyDetails", {
          destinationCountry: "",
          preferredCities: [],
          intakeDate: "",
          programLevel: "",
          fieldOfStudy: "",
          specificProgram: "",
          preferredUniversities: [],
          academicBackground: [
            {
              institution: "",
              qualification: "",
              fieldOfStudy: "",
              grade: "",
              yearCompleted: new Date().getFullYear(),
            },
          ],
          englishProficiency: {
            testType: "ielts",
            overallScore: 0,
            testDate: new Date(),
            expiryDate: new Date(),
          },
          hasScholarshipRequirement: false,
          studyGoals: "",
        });
      }
    } else {
      form.setValue("studyDetails", null);
      if (!form.getValues("workDetails")) {
        form.setValue("workDetails", {
          destinationCountry: "",
          jobCategory: "",
          preferredPosition: "",
          yearsOfExperience: 1,
          workExperience: [
            {
              company: "",
              position: "",
              duration: "",
              responsibilities: "",
            },
          ],
          careerGoals: "",
          skills: [],
        });
      }
    }
  }, [applicationType, form]);

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await fetch(`/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit application");
      }

      const result = await res.json();
      form.reset();
      setSuccess("🎉 Your application has been submitted successfully!, our team will reahc out to you after reviewing your application!.");
      setShowConfetti(true); // Trigger confetti
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <ReactConfetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
          />
        </div>
      )}
      <Card className="sm:w-[90%] lg:w-[70%] bg-primary-foreground p-6 mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader className="text-center p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Study & Work Abroad Application
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Take the first step towards your international journey with
                StudyJetGlobal
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Application Type Selection */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  Choose Your Path
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={
                      form.watch("applicationType") === "study"
                        ? "default"
                        : "outline"
                    }
                    className="h-24 relative"
                    onClick={() => form.setValue("applicationType", "study")}
                  >
                    <div className="flex flex-col items-center">
                      <BookOpen className="h-8 w-8 mb-2" />
                      <div className="text-center">
                        <div className="font-semibold">Study Abroad</div>
                        <div className="text-sm opacity-90">
                          Pursue international education
                        </div>
                      </div>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant={
                      form.watch("applicationType") === "work"
                        ? "default"
                        : "outline"
                    }
                    className="h-24 relative"
                    onClick={() => form.setValue("applicationType", "work")}
                  >
                    <div className="flex flex-col items-center">
                      <Briefcase className="h-8 w-8 mb-2" />
                      <div className="text-center">
                        <div className="font-semibold">Work Abroad</div>
                        <div className="text-sm opacity-90">
                          Start your international career
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="personalInfo.fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
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
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label className="required">Phone Number</Label>
                    <PhoneInput
                      country="us"
                      value={form.watch("personalInfo.phone")}
                      onChange={(phone) =>
                        form.setValue("personalInfo.phone", phone)
                      }
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
                    {form.formState.errors.personalInfo?.phone && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.personalInfo.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="required">WhatsApp Number</Label>
                    <PhoneInput
                      country="us"
                      value={form.watch("personalInfo.whatsapp")}
                      onChange={(phone) =>
                        form.setValue("personalInfo.whatsapp", phone)
                      }
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
                    {form.formState.errors.personalInfo?.whatsapp && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.personalInfo.whatsapp.message}
                      </p>
                    )}
                  </div>

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
                            <div className="flex items-center justify-center gap-2 p-3 border-b">
                              <Select
                                value={field.value?.getFullYear().toString()}
                                onValueChange={(year) => {
                                  const newDate = new Date(field.value);
                                  newDate.setFullYear(parseInt(year));
                                  field.onChange(newDate);
                                }}
                              >
                                <SelectTrigger className="w-[100px]">
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 100 }, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date > addYears(new Date(), 1) ||
                                date < subYears(new Date(), 100)
                              }
                              fromYear={new Date().getFullYear() - 100}
                              toYear={new Date().getFullYear()}
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
                          <Input placeholder="Your nationality" {...field} />
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
                        <FormLabel className="required">
                          Current Country
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Country of residence" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalInfo.currentCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">Current City</FormLabel>
                        <FormControl>
                          <Input placeholder="City of residence" {...field} />
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
                        <FormLabel>Passport Number (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter passport number if available"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalInfo.passportExpiry"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Passport Expiry Date (Optional)</FormLabel>
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
                    name="personalInfo.gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer_not_to_say">
                              Prefer not to say
                            </SelectItem>
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
                        <FormLabel className="required">Marital Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                </div>

                {/* Languages Section */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-base required">
                      Languages
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentLanguages =
                          form.getValues("personalInfo.languages") || [];
                        form.setValue("personalInfo.languages", [
                          ...currentLanguages,
                          { language: "", proficiencyLevel: "intermediate" },
                        ]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Language
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {form.watch("personalInfo.languages")?.map((_, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <FormField
                          control={form.control}
                          name={`personalInfo.languages.${index}.language`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="Enter language" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`personalInfo.languages.${index}.proficiencyLevel`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="basic">Basic</SelectItem>
                                  <SelectItem value="intermediate">
                                    Intermediate
                                  </SelectItem>
                                  <SelectItem value="advanced">
                                    Advanced
                                  </SelectItem>
                                  <SelectItem value="native">Native</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const currentLanguages = form.getValues(
                              "personalInfo.languages"
                            );
                            if (currentLanguages.length > 1) {
                              form.setValue(
                                "personalInfo.languages",
                                currentLanguages.filter((_, i) => i !== index)
                              );
                            }
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Study Details Section */}
              {form.watch("applicationType") === "study" && (
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Study Details
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="studyDetails.destinationCountry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">
                              Destination Country
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="india">India</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="usa">United States</SelectItem>
                                <SelectItem value="italy">Italy</SelectItem>
                                <SelectItem value="france">France</SelectItem>
                                <SelectItem value="australia">
                                  Australia
                                </SelectItem>
                                <SelectItem value="canada">Canada</SelectItem>
                                <SelectItem value="dubai">Dubai</SelectItem>
                                <SelectItem value="ireland">Ireland</SelectItem>
                                <SelectItem value="germany">Germany</SelectItem>
                                <SelectItem value="singapore">
                                  Singapore
                                </SelectItem>
                                <SelectItem value="georgia">Georgia</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="studyDetails.intakeDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">
                              Preferred Intake
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select intake" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="fall_2024">
                                  Fall 2024
                                </SelectItem>
                                <SelectItem value="spring_2025">
                                  Spring 2025
                                </SelectItem>
                                <SelectItem value="fall_2025">
                                  Fall 2025
                                </SelectItem>
                                <SelectItem value="spring_2026">
                                  Spring 2026
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="studyDetails.programLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">
                              Program Level
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select program level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="diploma">Diploma</SelectItem>
                                <SelectItem value="bachelors">
                                  Bachelor&apos;s Degree
                                </SelectItem>
                                <SelectItem value="masters">
                                  Master&apos;s Degree
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
                        name="studyDetails.fieldOfStudy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">
                              Field of Study
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select field" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="business">
                                  Business & Management
                                </SelectItem>
                                <SelectItem value="engineering">
                                  Engineering
                                </SelectItem>
                                <SelectItem value="it">
                                  Information Technology
                                </SelectItem>
                                <SelectItem value="health">
                                  Health Sciences
                                </SelectItem>
                                <SelectItem value="arts">
                                  Arts & Design
                                </SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="social_sciences">
                                  Social Sciences
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
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
                              <Input
                                placeholder="e.g., Master of Business Analytics"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              If you have a specific program in mind
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Academic Background */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base required">
                          Academic Background
                        </FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentBackground =
                              form.getValues("studyDetails.academicBackground") ||
                              [];
                            form.setValue("studyDetails.academicBackground", [
                              ...currentBackground,
                              {
                                institution: "",
                                qualification: "",
                                fieldOfStudy: "",
                                grade: "",
                                yearCompleted: new Date().getFullYear(),
                              },
                            ]);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {form
                          .watch("studyDetails.academicBackground")
                          ?.map((_, index) => (
                            <div
                              key={index}
                              className="border rounded-lg p-4 space-y-4"
                            >
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">
                                  Education {index + 1}
                                </h4>
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => {
                                      const currentBackground = form.getValues(
                                        "studyDetails.academicBackground"
                                      );
                                      form.setValue(
                                        "studyDetails.academicBackground",
                                        currentBackground.filter(
                                          (_, i) => i !== index
                                        )
                                      );
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name={`studyDetails.academicBackground.${index}.institution`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="required">
                                        Institution
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Name of institution"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`studyDetails.academicBackground.${index}.qualification`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="required">
                                        Qualification
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="e.g., Bachelor of Science"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`studyDetails.academicBackground.${index}.fieldOfStudy`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="required">
                                        Field of Study
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="e.g., Computer Science"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`studyDetails.academicBackground.${index}.grade`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="required">
                                        Grade/GPA
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="e.g., 3.5/4.0"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`studyDetails.academicBackground.${index}.yearCompleted`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="required">
                                        Year Completed
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          min={1900}
                                          max={new Date().getFullYear()}
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(Number(e.target.value))
                                          }
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

                    {/* English Proficiency */}
                    <div className="space-y-4">
                      <FormLabel className="text-base required">
                        English Proficiency
                      </FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="studyDetails.englishProficiency.testType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="required">
                                Test Type
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select test" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="ielts">IELTS</SelectItem>
                                  <SelectItem value="toefl">TOEFL</SelectItem>
                                  <SelectItem value="pte">PTE</SelectItem>
                                  <SelectItem value="duolingo">
                                    Duolingo
                                  </SelectItem>
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
                              <FormLabel className="required">
                                Overall Score
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.5"
                                  placeholder="Enter score"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
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
                            <FormItem>
                              <FormLabel className="required">
                                Test Date
                              </FormLabel>
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
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("2020-01-01")
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
                    </div>

                    {/* Study Goals */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="studyDetails.studyGoals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">
                              Study Goals
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Briefly describe your academic and career goals..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Explain why you want to study abroad and your future
                              plans
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Scholarship Requirement */}
                    <FormField
                      control={form.control}
                      name="studyDetails.hasScholarshipRequirement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Scholarship Requirement</FormLabel>
                            <FormDescription>
                              Are you interested in scholarship opportunities?
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
              )}

              {/* Work Details Section */}
              {form.watch("applicationType") === "work" && (
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Work Details
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="workDetails.destinationCountry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">
                              Preferred Country
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="australia">
                                  Australia
                                </SelectItem>
                                <SelectItem value="canada">Canada</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="usa">United States</SelectItem>
                                <SelectItem value="new_zealand">
                                  New Zealand
                                </SelectItem>
                                <SelectItem value="ireland">Ireland</SelectItem>
                                <SelectItem value="germany">Germany</SelectItem>
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
                            <FormLabel className="required">
                              Job Category
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="it">IT & Software</SelectItem>
                                <SelectItem value="healthcare">
                                  Healthcare
                                </SelectItem>
                                <SelectItem value="engineering">
                                  Engineering
                                </SelectItem>
                                <SelectItem value="hospitality">
                                  Hospitality
                                </SelectItem>
                                <SelectItem value="construction">
                                  Construction
                                </SelectItem>
                                <SelectItem value="agriculture">
                                  Agriculture
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
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
                            <FormLabel className="required">
                              Preferred Position
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Software Developer"
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
                            <FormLabel className="required">
                              Years of Experience
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.5"
                                placeholder="Enter years of experience"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Work Experience */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base required">
                          Work Experience
                        </FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentExperience =
                              form.getValues("workDetails.workExperience") || [];
                            form.setValue("workDetails.workExperience", [
                              ...currentExperience,
                              {
                                company: "",
                                position: "",
                                duration: "",
                                responsibilities: "",
                              },
                            ]);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {form
                          .watch("workDetails.workExperience")
                          ?.map((_, index) => (
                            <div
                              key={index}
                              className="border rounded-lg p-4 space-y-4"
                            >
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">
                                  Experience {index + 1}
                                </h4>
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => {
                                      const currentExperience = form.getValues(
                                        "workDetails.workExperience"
                                      );
                                      form.setValue(
                                        "workDetails.workExperience",
                                        currentExperience.filter(
                                          (_, i) => i !== index
                                        )
                                      );
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name={`workDetails.workExperience.${index}.company`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="required">
                                        Company
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Company name"
                                          {...field}
                                        />
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
                                      <FormLabel className="required">
                                        Position
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Job title"
                                          {...field}
                                        />
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
                                      <FormLabel className="required">
                                        Duration
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="e.g., 2 years"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`workDetails.workExperience.${index}.responsibilities`}
                                  render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                      <FormLabel className="required">
                                        Key Responsibilities
                                      </FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Describe your main responsibilities and achievements"
                                          className="min-h-[100px]"
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

                    {/* Career Goals */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="workDetails.careerGoals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">
                              Career Goals
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Briefly describe your career goals and why you want to work abroad..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Explain your motivation for seeking international
                              work opportunities
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="workDetails.skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">Key Skills</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List your relevant technical and fundamental skills (separate with commas)..."
                                className="min-h-[100px]"
                                {...field}
                                onChange={(e) => {
                                  // Allow direct typing of commas
                                  const value = e.target.value;
                                  
                                  // Only split into array when saving the value
                                  const skillsArray = value.includes(',') ? 
                                    value.split(',')
                                      .map(skill => skill.trim())
                                      .filter(skill => skill !== '') :
                                    [value];
                                  
                                  field.onChange(skillsArray);
                                }}
                                value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
                              />
                            </FormControl>
                            <FormDescription>
                              Include both technical and soft skills relevant to
                              your field
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Information Section */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  Financial Information
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="financialInfo.fundingSource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="required">
                            Source of Funding
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select funding source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="self">Self-Funded</SelectItem>
                              <SelectItem value="family">
                                Family Support
                              </SelectItem>
                              <SelectItem value="loan">Bank Loan</SelectItem>
                              <SelectItem value="scholarship">
                                Scholarship
                              </SelectItem>
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
                      name="financialInfo.annualFamilyIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="required">
                            Annual Family Income (USD)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter annual family income"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            This helps us suggest suitable programs and financial
                            options
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="financialInfo.hasExistingFunds"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Available Funds</FormLabel>
                            <FormDescription>
                              Do you have funds ready for your program?
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

                    {form.watch("financialInfo.hasExistingFunds") && (
                      <FormField
                        control={form.control}
                        name="financialInfo.fundingAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="required">
                              Available Amount (USD)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter available amount"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {form.watch("financialInfo.fundingSource") === "sponsor" && (
                      <>
                        <FormField
                          control={form.control}
                          name="financialInfo.sponsorName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="required">
                                Sponsor Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter sponsor's name"
                                  {...field}
                                />
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
                              <FormLabel className="required">
                                Relation with Sponsor
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Uncle, Organization"
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
                              <FormLabel className="required">
                                Sponsor Contact
                              </FormLabel>
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
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Info className="mr-2 h-5 w-5" />
                  Additional Information
                </h3>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="additionalInfo.previousVisaRejections"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Previous Visa Rejections</FormLabel>
                          <FormDescription>
                            Have you ever had a visa application rejected?
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

                  {form.watch("additionalInfo.previousVisaRejections") && (
                    <FormField
                      control={form.control}
                      name="additionalInfo.rejectionDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="required">
                            Rejection Details
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide details about the visa rejection(s), including country, year, and reason..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Travel History */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-base">Travel History</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentHistory =
                            form.getValues("additionalInfo.travelHistory") || [];
                          form.setValue("additionalInfo.travelHistory", [
                            ...currentHistory,
                            {
                              country: "",
                              purpose: "",
                              duration: "",
                              year: new Date().getFullYear(),
                            },
                          ]);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Travel
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {form
                        .watch("additionalInfo.travelHistory")
                        ?.map((_, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-4 space-y-4"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Travel {index + 1}</h4>
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                  const currentHistory = form.getValues(
                                    "additionalInfo.travelHistory"
                                  );
                                  form.setValue(
                                    "additionalInfo.travelHistory",
                                    currentHistory.filter((_, i) => i !== index)
                                  );
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`additionalInfo.travelHistory.${index}.country`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Country visited"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`additionalInfo.travelHistory.${index}.purpose`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Purpose</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., Tourism, Business"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`additionalInfo.travelHistory.${index}.duration`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Duration</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., 2 weeks"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`additionalInfo.travelHistory.${index}.year`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min={1900}
                                        max={new Date().getFullYear()}
                                        {...field}
                                        onChange={(e) =>
                                          field.onChange(Number(e.target.value))
                                        }
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

                  <FormField
                    control={form.control}
                    name="additionalInfo.howDidYouHear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">
                          How did you hear about us?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="social_media">
                              Social Media
                            </SelectItem>
                            <SelectItem value="friend">Friend/Family</SelectItem>
                            <SelectItem value="search">Search Engine</SelectItem>
                            <SelectItem value="advertisement">
                              Advertisement
                            </SelectItem>
                            <SelectItem value="education_fair">
                              Education Fair
                            </SelectItem>
                            <SelectItem value="agent">Education Agent</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
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
                            placeholder="Any special requirements or additional information you'd like to share..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include any special requirements, medical conditions, or
                          additional information that may be relevant
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-8">
                <FormField
                  control={form.control}
                  name="acceptedTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the{" "}
                          <Link
                            href="/terms"
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            terms and conditions
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Error Display */}
              {Object.keys(form.formState.errors).length > 0 && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Validation Errors</AlertTitle>
                  <AlertDescription>
                    Please fix the highlighted errors before submitting.
                  </AlertDescription>
                </Alert>
              )}

              {/* Debug Information */}
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Form Status: {form.formState.isValid ? "Valid" : "Invalid"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Terms Accepted: {form.watch("acceptedTerms") ? "Yes" : "No"}
                </p>
              </div>
              {error && <FormError message={error} />}
              {success && <FormSuccess message={success} />}

              <Button
                type="submit"
                className="w-full h-12 text-lg mt-6"
                disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>

            </CardContent>
          </form>
        </Form>
      </Card>
    </>
  );
}
