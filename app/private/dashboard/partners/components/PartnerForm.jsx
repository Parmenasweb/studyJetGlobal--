"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useState } from "react";

import { partnerSchema } from "@/lib/validations/partner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import FileUpload from "@/components/fileUpload";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon, CalendarIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";


// Dynamically import ImageView with SSR disabled
const ImageView = dynamic(() => import("@/components/ImageView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-muted">
      <FileIcon className="w-8 h-8 text-muted-foreground" />
    </div>
  ),
});

// Document types for the dropdown
const DOCUMENT_TYPES = [
  "MOU",
  "Fee Structure",
  "Agreement",
  "License",
  "Certificate",
  "Other",
];

// Program levels for universities
const PROGRAM_LEVELS = [
  "undergraduate",
  "postgraduate",
  "phd",
  "diploma",
];

// Add these constants at the top with other constants
const ACADEMIC_CALENDAR = {
  fall: "September - December",
  spring: "January - April",
  summer: "May - August"
};

const COMMON_ADMISSION_REQUIREMENTS = [
  "High School Diploma or Equivalent",
  "Academic Transcripts",
  "English Proficiency Test (IELTS/TOEFL)",
  "Letters of Recommendation",
  "Statement of Purpose",
  "CV/Resume",
  "Passport Copy",
  "Passport Size Photos"
];

const COMMON_APPLICATION_DEADLINES = {
  fall: {
    early: "January 15",
    regular: "March 31",
    late: "June 30"
  },
  spring: {
    early: "September 15",
    regular: "October 31",
    late: "November 30"
  }
};

const COMMON_SCHOLARSHIP_INFO = {
  types: [
    "Merit-based Scholarships",
    "Need-based Financial Aid",
    "Sports Scholarships",
    "Cultural Scholarships",
    "Research Scholarships"
  ],
  coverage: [
    "Full Tuition Fee Waiver",
    "Partial Tuition Fee Waiver (25%-75%)",
    "Monthly Stipend",
    "Accommodation Support",
    "Travel Grants"
  ],
  requirements: [
    "Minimum GPA of 3.0",
    "Strong Academic Record",
    "Extracurricular Achievements",
    "Financial Need Documentation",
    "Research Proposal (for research scholarships)"
  ]
};

const COMMON_INTERNSHIP_DETAILS = {
  types: [
    "Industry Internships",
    "Research Internships",
    "Teaching Assistantships",
    "Part-time Work Opportunities",
    "Co-op Programs"
  ],
  duration: [
    "Summer Internships (2-3 months)",
    "Semester Internships (4-6 months)",
    "Year-long Internships"
  ],
  benefits: [
    "Academic Credits",
    "Stipend/Payment",
    "Industry Experience",
    "Networking Opportunities",
    "Potential Job Placement"
  ]
};

// Add these constants for agency fields
const COMMON_AGENCY_SERVICES = [
  "Student Counseling",
  "Visa Assistance",
  "Accommodation Support",
  "Airport Pickup",
  "Document Translation",
  "Test Preparation",
  "Career Guidance",
  "Financial Aid Guidance"
];

const COMMON_AGENCY_SPECIALIZATIONS = [
  "Undergraduate Programs",
  "Postgraduate Programs",
  "Language Programs",
  "Professional Courses",
  "Vocational Training",
  "Study Abroad Programs",
  "Exchange Programs",
  "Summer Schools"
];

const COMMON_COVERAGE_AREAS = [
  "North America",
  "Europe",
  "Asia",
  "Australia",
  "Middle East",
  "Africa",
  "South America",
  "Southeast Asia"
];

export function PartnerForm({ partner }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(partnerSchema),
    mode: "onChange",
    defaultValues: {
      type: partner?.type || "university",
      name: partner?.name || "",
      website: partner?.website || "",
      email: partner?.email || "",
      phone: partner?.phone || "",
      description: partner?.description || "",
      address: {
        street: partner?.address?.street || "",
        city: partner?.address?.city || "",
        country: partner?.address?.country || "",
        state: partner?.address?.state || "",
        postalCode: partner?.address?.postalCode || "",
      },
      status: partner?.status || "active",
      partnershipDate: partner?.partnershipDate ? new Date(partner.partnershipDate) : new Date(),
      contactPersons: partner?.contactPersons || [{ name: "", position: "", email: "", phone: "" }],
      documents: partner?.documents || [],
      
      ...(partner?.type === "university" 
        ? {
            universityDetails: {
              ranking: partner?.universityDetails?.ranking ? Number(partner.universityDetails.ranking) : "",
              admissionRequirements: partner?.universityDetails?.admissionRequirements || [],
              academicCalendar: partner?.universityDetails?.academicCalendar || "",
              applicationDeadlines: partner?.universityDetails?.applicationDeadlines || {
                fall: { early: "", regular: "", late: "" },
                spring: { early: "", regular: "", late: "" }
              },
              scholarshipInfo: partner?.universityDetails?.scholarshipInfo || {
                types: [],
                coverage: [],
                requirements: []
              },
              accommodationDetails: partner?.universityDetails?.accommodationDetails || "",
              internshipOpportunities: partner?.universityDetails?.internshipOpportunities || {
                types: [],
                duration: [],
                benefits: []
              },
              programs: partner?.universityDetails?.programs || [],
              facilities: partner?.universityDetails?.facilities || [],
              studentServices: partner?.universityDetails?.studentServices || [],
              commission: {
                minimum: partner?.universityDetails?.commission?.minimum || 0,
                maximum: partner?.universityDetails?.commission?.maximum || 0,
              },
            },
          }
        : {
            agencyDetails: {
              services: partner?.agencyDetails?.services || [],
              specialization: partner?.agencyDetails?.specialization || [],
              commission: {
                minimum: partner?.agencyDetails?.commission?.minimum || 0,
                maximum: partner?.agencyDetails?.commission?.maximum || 0,
              },
              coverage: partner?.agencyDetails?.coverage || [],
              license: {
                number: partner?.agencyDetails?.license?.number || "",
                expiryDate: partner?.agencyDetails?.license?.expiryDate ? 
                  new Date(partner.agencyDetails.license.expiryDate) : undefined,
              },
            },
          }),
    },
  });

  const [documentType, setDocumentType] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");

  // Watch all required fields
  const partnerType = form.watch("type");
  const contactPersons = form.watch("contactPersons");
  const documents = form.watch("documents");
  const name = form.watch("name");
  const email = form.watch("email");
  const phone = form.watch("phone");
  const website = form.watch("website");
  const address = form.watch("address");

  // Form state
  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const isDirty = form.formState.isDirty;
  const errors = form.formState.errors;

  // Check if all required fields are filled
  const isFormValid = () => {
    const hasDocuments = documents && documents.length > 0;
    const hasRequiredFields = name && email && phone && website && 
      address?.street && address?.city && address?.country;
    const hasValidContacts = contactPersons?.every(contact => 
      contact.name && contact.position && contact.email && contact.phone
    );

    return hasDocuments && hasRequiredFields && hasValidContacts;
  };

  async function onSubmit(data) {
    try {
      // Create a clean copy of the form data
      const formData = { ...data };
      
      // Format dates
      formData.partnershipDate = format(new Date(formData.partnershipDate), "yyyy-MM-dd");

      // Handle university-specific data
      if (formData.type === "university") {
        delete formData.agencyDetails;
        
        if (formData.universityDetails?.ranking) {
          formData.universityDetails.ranking = Number(formData.universityDetails.ranking);
        }

        // Ensure commission values are numbers
        if (formData.universityDetails.commission) {
          formData.universityDetails.commission = {
            minimum: Number(formData.universityDetails.commission.minimum) || 0,
            maximum: Number(formData.universityDetails.commission.maximum) || 0
          };
        }
        
        // Ensure admission requirements is an array
        if (formData.universityDetails?.admissionRequirements) {
          formData.universityDetails.admissionRequirements = 
            Array.isArray(formData.universityDetails.admissionRequirements) 
              ? formData.universityDetails.admissionRequirements 
              : [formData.universityDetails.admissionRequirements];
        }
      } else {
        // Handle agency-specific data
        delete formData.universityDetails;
        
        if (formData.agencyDetails?.license?.expiryDate) {
          formData.agencyDetails.license.expiryDate = format(
            new Date(formData.agencyDetails.license.expiryDate),
            "yyyy-MM-dd"
          );
        }

        // Ensure commission values are numbers (now in USD)
        if (formData.agencyDetails?.commission) {
          formData.agencyDetails.commission = {
            minimum: Number(formData.agencyDetails.commission.minimum) || 0,
            maximum: Number(formData.agencyDetails.commission.maximum) || 0
          };
        }
      }

      // Filter out empty documents
      if (formData.documents) {
        formData.documents = formData.documents.filter(doc => 
          doc.fileUrl && doc.type && doc.title
        ).map(doc => ({
          ...doc,
          status: doc.status || "pending",
          uploadDate: doc.uploadDate || new Date().toISOString()
        }));
      }

      // Filter out empty contact persons
      if (formData.contactPersons) {
        formData.contactPersons = formData.contactPersons.filter(contact => 
          contact.name && contact.position && contact.email && contact.phone
        );
      }

      console.log("Submitting form data:", formData);

      const url = partner ? `/api/partners/${partner._id}` : "/api/partners";
      const response = await fetch(url, {
        method: partner ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save partner");
      }

      toast.success(partner ? "Partner updated successfully" : "Partner created successfully");
      router.push("/private/dashboard/partners");
      router.refresh();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(error.message || "Failed to save partner");
    }
  }

  // Handle document upload success
  const handleDocumentUpload = (fileUrl) => {
    if (!documentType || !documentTitle) {
      toast.error("Please select a document type and enter a title");
      return;
    }

    const newDoc = {
      type: documentType,
      title: documentTitle,
      fileUrl: fileUrl,
      status: "pending",
      uploadDate: new Date().toISOString()
    };

    const currentDocs = form.getValues("documents") || [];
    form.setValue("documents", [...currentDocs, newDoc], { shouldValidate: true, shouldDirty: true });
    
    // Reset the document form fields
    setDocumentType("");
    setDocumentTitle("");
    
    toast.success("Document uploaded successfully");
  };

  // Add contact person
  const addContactPerson = () => {
    const currentContacts = form.getValues("contactPersons") || [];
    form.setValue("contactPersons", [...currentContacts, { name: "", position: "", email: "", phone: "" }], { shouldValidate: true });
  };

  // Remove contact person
  const removeContactPerson = (index) => {
    const currentContacts = form.getValues("contactPersons");
    if (currentContacts.length > 1) {
      form.setValue(
        "contactPersons",
        currentContacts.filter((_, i) => i !== index),
        { shouldValidate: true }
      );
    }
  };

  // Remove document
  const removeDocument = (index) => {
    const currentDocs = form.getValues("documents");
    form.setValue(
      "documents",
      currentDocs.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="contact">Contact & Address</TabsTrigger>
              <TabsTrigger value="details">
                {partnerType === "university" ? "University Details" : "Agency Details"}
              </TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partner Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select partner type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="agency">Agency</SelectItem>
                        </SelectContent>
                      </Select>
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
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter partner name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter partner description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter website URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="partnershipDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Partnership Date</FormLabel>
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
                      <FormDescription>
                        Select the date when the partnership started
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            {/* Contact & Address Tab */}
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Contact Persons</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addContactPerson}
                  >
                    Add Contact Person
                  </Button>
                </div>

                {contactPersons?.map((_, index) => (
                  <Card key={index} className="p-4">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`contactPersons.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`contactPersons.${index}.position`}
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
                          name={`contactPersons.${index}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`contactPersons.${index}.phone`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter phone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {contactPersons.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="mt-4"
                          onClick={() => removeContactPerson(index)}
                        >
                          Remove Contact Person
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter state/province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter postal code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            {/* Partner-specific Details Tab */}
            <TabsContent value="details" className="space-y-4">
              {partnerType === "university" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="universityDetails.ranking"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>University Ranking</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter ranking"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the university&apos;s global ranking position (e.g., 100)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="universityDetails.academicCalendar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Academic Calendar</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(ACADEMIC_CALENDAR[value]);
                            }}
                            defaultValue={Object.keys(ACADEMIC_CALENDAR).find(
                              key => ACADEMIC_CALENDAR[key] === field.value
                            )}
                          >
                          <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select academic calendar" />
                              </SelectTrigger>
                          </FormControl>
                            <SelectContent>
                              {Object.entries(ACADEMIC_CALENDAR).map(([term, dates]) => (
                                <SelectItem key={term} value={term}>
                                  {term.toUpperCase()}: {dates}
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
                    name="universityDetails.admissionRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admission Requirements</FormLabel>
                        <div className="space-y-2">
                          {COMMON_ADMISSION_REQUIREMENTS.map((requirement, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox
                                checked={Array.isArray(field.value) && field.value.includes(requirement)}
                                onCheckedChange={(checked) => {
                                  let updatedValue = Array.isArray(field.value) ? [...field.value] : [];
                                  if (checked) {
                                    updatedValue.push(requirement);
                                  } else {
                                    updatedValue = updatedValue.filter(v => v !== requirement);
                                  }
                                  field.onChange(updatedValue);
                                }}
                              />
                              <label className="text-sm">{requirement}</label>
                            </div>
                          ))}
                        </div>
                        <FormDescription>
                          Select all required documents for admission
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="universityDetails.applicationDeadlines"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Deadlines</FormLabel>
                        <div className="space-y-4">
                          {Object.entries(COMMON_APPLICATION_DEADLINES).map(([term, deadlines]) => (
                            <div key={term} className="space-y-2">
                              <h4 className="font-medium capitalize">{term} Semester</h4>
                              {Object.entries(deadlines).map(([type, defaultDate]) => (
                                <div key={type} className="flex items-center gap-2">
                                  <label className="w-24 capitalize">{type}:</label>
                                  <Input
                                    type="date"
                                    value={field.value?.[term]?.[type] || defaultDate}
                                    onChange={(e) => {
                                      const currentValue = field.value || {};
                                      field.onChange({
                                        ...currentValue,
                                        [term]: {
                                          ...(currentValue[term] || {}),
                                          [type]: e.target.value
                                        }
                                      });
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="universityDetails.scholarshipInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scholarship Information</FormLabel>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Available Scholarships</h4>
                            <div className="space-y-2">
                              {COMMON_SCHOLARSHIP_INFO.types.map((type, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={field.value?.types?.includes(type)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || {};
                                      const currentTypes = currentValue.types || [];
                                      const newTypes = checked
                                        ? [...currentTypes, type]
                                        : currentTypes.filter(t => t !== type);
                                      field.onChange({
                                        ...currentValue,
                                        types: newTypes
                                      });
                                    }}
                                  />
                                  <label className="text-sm">{type}</label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Coverage Options</h4>
                            <div className="space-y-2">
                              {COMMON_SCHOLARSHIP_INFO.coverage.map((coverage, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={field.value?.coverage?.includes(coverage)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || {};
                                      const currentCoverage = currentValue.coverage || [];
                                      const newCoverage = checked
                                        ? [...currentCoverage, coverage]
                                        : currentCoverage.filter(c => c !== coverage);
                                      field.onChange({
                                        ...currentValue,
                                        coverage: newCoverage
                                      });
                                    }}
                                  />
                                  <label className="text-sm">{coverage}</label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Eligibility Requirements</h4>
                            <div className="space-y-2">
                              {COMMON_SCHOLARSHIP_INFO.requirements.map((requirement, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={field.value?.requirements?.includes(requirement)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || {};
                                      const currentRequirements = currentValue.requirements || [];
                                      const newRequirements = checked
                                        ? [...currentRequirements, requirement]
                                        : currentRequirements.filter(r => r !== requirement);
                                      field.onChange({
                                        ...currentValue,
                                        requirements: newRequirements
                                      });
                                    }}
                                  />
                                  <label className="text-sm">{requirement}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="universityDetails.accommodationDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accommodation Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter accommodation details"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="universityDetails.internshipOpportunities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internship Opportunities</FormLabel>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Internship Types</h4>
                            <div className="space-y-2">
                              {COMMON_INTERNSHIP_DETAILS.types.map((type, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={field.value?.types?.includes(type)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || {};
                                      const currentTypes = currentValue.types || [];
                                      const newTypes = checked
                                        ? [...currentTypes, type]
                                        : currentTypes.filter(t => t !== type);
                                      field.onChange({
                                        ...currentValue,
                                        types: newTypes
                                      });
                                    }}
                                  />
                                  <label className="text-sm">{type}</label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Duration Options</h4>
                            <div className="space-y-2">
                              {COMMON_INTERNSHIP_DETAILS.duration.map((duration, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={field.value?.duration?.includes(duration)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || {};
                                      const currentDuration = currentValue.duration || [];
                                      const newDuration = checked
                                        ? [...currentDuration, duration]
                                        : currentDuration.filter(d => d !== duration);
                                      field.onChange({
                                        ...currentValue,
                                        duration: newDuration
                                      });
                                    }}
                                  />
                                  <label className="text-sm">{duration}</label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Benefits</h4>
                            <div className="space-y-2">
                              {COMMON_INTERNSHIP_DETAILS.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={field.value?.benefits?.includes(benefit)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || {};
                                      const currentBenefits = currentValue.benefits || [];
                                      const newBenefits = checked
                                        ? [...currentBenefits, benefit]
                                        : currentBenefits.filter(b => b !== benefit);
                                      field.onChange({
                                        ...currentValue,
                                        benefits: newBenefits
                                      });
                                    }}
                                  />
                                  <label className="text-sm">{benefit}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Card>
                    <CardContent className="pt-6">
                      <FormField
                        control={form.control}
                        name="universityDetails.commission.minimum"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Commission</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                placeholder="Enter minimum commission"
                                {...field}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  field.onChange(isNaN(value) ? "" : value);
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter the minimum commission amount
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="universityDetails.commission.maximum"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Commission</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                placeholder="Enter maximum commission"
                                {...field}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  field.onChange(isNaN(value) ? "" : value);
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter the maximum commission amount
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardContent className="pt-6">
                        <FormField
                          control={form.control}
                          name="agencyDetails.commission.minimum"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Commission (USD)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  step="50"
                                  placeholder="Enter minimum commission in USD"
                                  {...field}
                                  onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    field.onChange(isNaN(value) ? "" : value);
                                  }}
                                />
                              </FormControl>
                              <FormDescription>
                                Enter the minimum commission amount in USD
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="agencyDetails.commission.maximum"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Commission (USD)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  step="50"
                                  placeholder="Enter maximum commission in USD"
                                  {...field}
                                  onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    field.onChange(isNaN(value) ? "" : value);
                                  }}
                                />
                              </FormControl>
                              <FormDescription>
                                Enter the maximum commission amount in USD
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <FormField
                          control={form.control}
                          name="agencyDetails.license.number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>License Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter license number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="agencyDetails.license.expiryDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>License Expiry Date</FormLabel>
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
                              <FormDescription>
                                License expiry date must be in the future
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <FormField
                          control={form.control}
                          name="agencyDetails.services"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Services</FormLabel>
                              <FormDescription>
                                Select the services offered by the agency
                              </FormDescription>
                              <div className="grid gap-2">
                                {COMMON_AGENCY_SERVICES.map((service) => (
                                  <FormField
                                    key={service}
                                    control={form.control}
                                    name="agencyDetails.services"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(service)}
                                            onCheckedChange={(checked) => {
                                              const updatedServices = checked
                                                ? [...(field.value || []), service]
                                                : field.value?.filter((s) => s !== service) || [];
                                              field.onChange(updatedServices);
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {service}
                                        </FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <FormField
                          control={form.control}
                          name="agencyDetails.specialization"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Specializations</FormLabel>
                              <FormDescription>
                                Select the agency&apos;s areas of specialization
                              </FormDescription>
                              <div className="grid gap-2">
                                {COMMON_AGENCY_SPECIALIZATIONS.map((spec) => (
                                  <FormField
                                    key={spec}
                                    control={form.control}
                                    name="agencyDetails.specialization"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(spec)}
                                            onCheckedChange={(checked) => {
                                              const updatedSpecs = checked
                                                ? [...(field.value || []), spec]
                                                : field.value?.filter((s) => s !== spec) || [];
                                              field.onChange(updatedSpecs);
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {spec}
                                        </FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <FormField
                          control={form.control}
                          name="agencyDetails.coverage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Coverage Areas</FormLabel>
                              <FormDescription>
                                Select the geographical areas covered by the agency
                              </FormDescription>
                              <div className="grid gap-2">
                                {COMMON_COVERAGE_AREAS.map((area) => (
                                  <FormField
                                    key={area}
                                    control={form.control}
                                    name="agencyDetails.coverage"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(area)}
                                            onCheckedChange={(checked) => {
                                              const updatedAreas = checked
                                                ? [...(field.value || []), area]
                                                : field.value?.filter((a) => a !== area) || [];
                                              field.onChange(updatedAreas);
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {area}
                                        </FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Documents</h3>
                  <Button type="button" variant="outline" onClick={() => {
                      delete form.getValues("newDocumentType");
                      delete form.getValues("newDocumentTitle");
                      delete form.getValues("fileUpload");
                    console.log(form.getValues())
                  
                  }}>
                    Reset
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="documents"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-4">
                        {field.value?.map((doc, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="space-y-4">
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
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select document type" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="MOU">MOU</SelectItem>
                                          <SelectItem value="Fee Structure">Fee Structure</SelectItem>
                                          <SelectItem value="Agreement">Agreement</SelectItem>
                                          <SelectItem value="License">License</SelectItem>
                                          <SelectItem value="Certificate">Certificate</SelectItem>
                                          <SelectItem value="Other">Other</SelectItem>
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
                                <FormField
                                  control={form.control}
                                  name={`documents.${index}.fileUrl`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Document File</FormLabel>
                                      <FormControl>
                                        <FileUpload
                                          folder={`/partners/${partnerType === "university" ? "universities" : "agencies"}`}
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
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeDocument(index)}
                                >
                                  Remove Document
                                </Button>
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
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/private/dashboard/partners")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
            >
              {isSubmitting ? (
                "Saving..."
              ) : partner ? (
                "Update Partner"
              ) : (
                "Create Partner"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 