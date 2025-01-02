// "use client";

// import { useState, useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormDescription,
// } from "@/components/ui/form";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Switch } from "@/components/ui/switch";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import {
//   CalendarIcon,
//   Loader2,
//   Building2,
//   BookOpen,
//   GraduationCap,
//   Briefcase,
//   Plus,
//   Minus,
//   Trash2,
//   Wallet,
//   Info,
//   AlertCircle,
// } from "lucide-react";
// import { applicationSchema } from "@/lib/validations/application";
// import FormError from "../dynamicComps/form-error";
// import FormSuccess from "../dynamicComps/form-success";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// export default function ApplicationForm() {
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(applicationSchema),
//     defaultValues: {
//       applicationType: "study",
//       status: "draft",
//       priority: "medium",
//       personalInfo: {
//         fullName: "",
//         email: "",
//         phone: "",
//         whatsapp: "",
//         dateOfBirth: new Date(),
//         nationality: "",
//         currentCountry: "",
//         currentCity: "",
//         passportNumber: "",
//         passportExpiry: null,
//         gender: "",
//         maritalStatus: "",
//         languages: [],
//       },
//       studyDetails: {
//         destinationCountry: "",
//         preferredCities: [],
//         intakeDate: "fall_2024",
//         programLevel: "",
//         fieldOfStudy: "",
//         specificProgram: "",
//         preferredUniversities: [],
//         academicBackground: [{
//           institution: "",
//           qualification: "",
//           fieldOfStudy: "",
//           grade: "",
//           yearCompleted: new Date().getFullYear(),
//         }],
//         englishProficiency: {
//           testType: "ielts",
//           overallScore: 0,
//           testDate: new Date(),
//           expiryDate: new Date(),
//         },
//         hasScholarshipRequirement: false,
//         studyGoals: "",
//       },
//       workDetails: null,
//       financialInfo: {
//         fundingSource: "self",
//         annualFamilyIncome: 0,
//         sponsorName: "",
//         sponsorRelation: "",
//         sponsorContact: "",
//         hasExistingFunds: false,
//         fundingAmount: 0,
//       },
//       additionalInfo: {
//         previousVisaRejections: false,
//         rejectionDetails: "",
//         travelHistory: [],
//         specialRequirements: "",
//         howDidYouHear: "",
//       },
//       progress: 0,
//     },
//   });

//   const applicationType = form.watch("applicationType");

//   // Reset the opposite type's details when application type changes
//   React.useEffect(() => {
//     if (applicationType === "study") {
//       form.setValue("workDetails", null);
//     } else {
//       form.setValue("studyDetails", null);
//     }
//   }, [applicationType, form]);

//   async function onSubmit(data) {
//     if (!acceptedTerms) {
//       setError("Please accept the terms and conditions");
//       return;
//     }

//     setError("");
//     setSuccess("");
//     setIsLoading(true);

//     try {
//       console.log("Form submission started");
//       console.log("Form data:", data);

//       // Create a deep copy of the data to avoid mutating the form state
//       const formattedData = JSON.parse(JSON.stringify(data));

//       // Format dates in personalInfo
//       if (formattedData.personalInfo) {
//         if (formattedData.personalInfo.dateOfBirth) {
//           formattedData.personalInfo.dateOfBirth = new Date(
//             formattedData.personalInfo.dateOfBirth
//           ).toISOString();
//         }
//         if (formattedData.personalInfo.passportExpiry) {
//           formattedData.personalInfo.passportExpiry = new Date(
//             formattedData.personalInfo.passportExpiry
//           ).toISOString();
//         }
//       }

//       // Handle study application specific data
//       if (formattedData.applicationType === "study" && formattedData.studyDetails) {
//         console.log("Processing study application");
//         if (formattedData.studyDetails.startDate) {
//           formattedData.studyDetails.startDate = new Date(
//             formattedData.studyDetails.startDate
//           ).toISOString();
//         }
//         if (formattedData.studyDetails.englishProficiency) {
//           if (formattedData.studyDetails.englishProficiency.testDate) {
//             formattedData.studyDetails.englishProficiency.testDate = new Date(
//               formattedData.studyDetails.englishProficiency.testDate
//             ).toISOString();
//           }
//           if (formattedData.studyDetails.englishProficiency.expiryDate) {
//             formattedData.studyDetails.englishProficiency.expiryDate = new Date(
//               formattedData.studyDetails.englishProficiency.expiryDate
//             ).toISOString();
//           }
//         }
//         delete formattedData.workDetails;
//       }

//       // Handle work application specific data
//       if (formattedData.applicationType === "work" && formattedData.workDetails) {
//         console.log("Processing work application");
//         formattedData.workDetails.workExperience = formattedData.workDetails.workExperience.filter(
//           exp => exp.company || exp.position || exp.duration || exp.responsibilities
//         );
//         delete formattedData.studyDetails;
//       }

//       console.log("Sending request to API");
//       console.log("Formatted data:", formattedData);

//       const res = await fetch("/api/applications", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formattedData,
//           status: "submitted",
//           submissionDate: new Date().toISOString(),
//         }),
//       });

//       console.log("API Response status:", res.status);
//       const responseData = await res.json();
//       console.log("API Response data:", responseData);

//       if (!res.ok) {
//         throw new Error(responseData.message || "Failed to submit application");
//       }

//       setSuccess("🎉 Your application has been submitted successfully! We'll contact you shortly.");
//       form.reset();
//       setAcceptedTerms(false);
//     } catch (error) {
//       console.error("Application submission error:", error);
//       setError(error.message || "Failed to submit application. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <Card className="sm:w-[90%] lg:w-[70%] bg-primary-foreground p-6 mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <CardHeader className="text-center p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg">
//             <CardTitle className="text-2xl font-bold tracking-tight">
//               Study & Work Abroad Application
//             </CardTitle>
//             <CardDescription className="text-lg mt-2">
//               Take the first step towards your international journey with StudyJetGlobal
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-8">
//             {/* Application Type Selection */}
//             <div className="bg-card rounded-lg p-6 shadow-sm">
//               <h3 className="text-xl font-semibold mb-4 flex items-center">
//                 Choose Your Path
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Button
//                   type="button"
//                   variant={applicationType === "study" ? "default" : "outline"}
//                   className="h-24 relative"
//                   onClick={() => form.setValue("applicationType", "study")}
//                 >
//                   <div className="flex flex-col items-center">
//                     <BookOpen className="h-8 w-8 mb-2" />
//                     <div className="text-center">
//                       <div className="font-semibold">Study Abroad</div>
//                       <div className="text-sm opacity-90">
//                         Pursue international education
//                       </div>
//                     </div>
//                   </div>
//                 </Button>
//                 <Button
//                   type="button"
//                   variant={applicationType === "work" ? "default" : "outline"}
//                   className="h-24 relative"
//                   onClick={() => form.setValue("applicationType", "work")}
//                 >
//                   <div className="flex flex-col items-center">
//                     <Briefcase className="h-8 w-8 mb-2" />
//                     <div className="text-center">
//                       <div className="font-semibold">Work Abroad</div>
//                       <div className="text-sm opacity-90">
//                         Start your international career
//                       </div>
//                     </div>
//                   </div>
//                 </Button>
//               </div>
//             </div>

//             {/* Rest of the form sections */}
//             {/* ... Personal Information Section ... */}
//             {/* ... Study/Work Details Section ... */}
//             {/* ... Financial Information Section ... */}
//             {/* ... Additional Information Section ... */}

//             {/* Terms and Submit Section */}
//             <div className="space-y-6">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="terms"
//                   checked={acceptedTerms}
//                   onCheckedChange={setAcceptedTerms}
//                   className="required"
//                 />
//                 <label
//                   htmlFor="terms"
//                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                 >
//                   I agree to the terms and conditions
//                 </label>
//               </div>

//               {/* Error Display */}
//               {Object.keys(form.formState.errors).length > 0 && (
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertTitle>Validation Errors</AlertTitle>
//                   <AlertDescription>
//                     Please fix the highlighted errors before submitting.
//                   </AlertDescription>
//                 </Alert>
//               )}

//               <Button
//                 type="submit"
//                 className="w-full h-12 text-lg"
//                 disabled={isLoading || !acceptedTerms}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                     Submitting Application...
//                   </>
//                 ) : (
//                   "Submit Application"
//                 )}
//               </Button>

//               {error && <FormError message={error} />}
//               {success && <FormSuccess message={success} />}
//             </div>
//           </CardContent>
//         </form>
//       </Form>
//     </Card>
//   );
// }

//                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                     Submitting Application...
//                   </>
//                 ) : (
//                   "Submit Application"
//                 )}
//               </Button>

//               {error && <FormError message={error} />}
//               {success && <FormSuccess message={success} />}
//             </div>
//           </CardContent>
//         </form>
//       </Form>
//     </Card>
//   );
// }
