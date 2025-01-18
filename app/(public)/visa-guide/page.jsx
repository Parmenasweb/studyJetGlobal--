"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MessageCircle,
  FileCheck,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

const countries = [
  {
    name: "United States",
    visaTypes: ["F1 Student Visa", "J1 Exchange Visa"],
    requirements: [
      "Acceptance letter from a SEVP-approved institution",
      "Form I-20",
      "Valid passport",
      "DS-160 form",
      "SEVIS fee payment",
      "Proof of financial support",
      "English proficiency test scores",
    ],
    timeline: "3-5 weeks",
    cost: "$160 application fee + $350 SEVIS fee",
    interviewRequired: true,
  },
  {
    name: "United Kingdom",
    visaTypes: ["Student Visa (Tier 4)", "Short-term Study Visa"],
    requirements: [
      "CAS from licensed institution",
      "Valid passport",
      "Proof of financial means",
      "English language qualification",
      "TB test results (if applicable)",
    ],
    timeline: "3 weeks",
    cost: "£348 for Student Visa",
    interviewRequired: false,
  },
  {
    name: "Ireland",
    visaTypes: ["Stamp 2 Student Visa", "Short Stay Study Visa"],
    requirements: [
      "Acceptance letter from an Irish institution",
      "Proof of tuition fee payment",
      "Proof of funds (€7,000 minimum)",
      "Valid passport",
      "Health insurance",
      "English proficiency proof",
      "Medical check (if required)",
    ],
    timeline: "4-8 weeks",
    cost: "€60 for Student Visa + €300 registration fee",
    interviewRequired: false,
  },
  {
    name: "Singapore",
    visaTypes: ["Student Pass", "Student's Pass (Short Course)"],
    requirements: [
      "Acceptance letter from institution",
      "Proof of financial means",
      "Health insurance",
      "Medical examination report",
      "Passport validity",
      "Academic transcripts",
    ],
    timeline: "2-4 weeks",
    cost: "SGD 30 application fee + SGD 60 issuance fee",
    interviewRequired: false,
  },
  {
    name: "France",
    visaTypes: ["Long-stay Student Visa (VLS-TS)", "Short-stay Student Visa"],
    requirements: [
      "Acceptance letter from French institution",
      "Proof of financial means",
      "Health insurance",
      "Accommodation proof",
      "Valid passport",
      "Campus France approval",
    ],
    timeline: "2-3 weeks",
    cost: "€50 for Student Visa + €60 for Campus France",
    interviewRequired: true,
  },
  {
    name: "Dubai",
    visaTypes: ["Student Residence Visa", "Short-term Student Visa"],
    requirements: [
      "Acceptance letter from UAE institution",
      "Passport copy",
      "Passport photos",
      "Bank statements",
      "Health insurance",
      "Medical fitness test",
    ],
    timeline: "2-3 weeks",
    cost: "AED 3,000 for Student Visa",
    interviewRequired: false,
  },
  {
    name: "Australia",
    visaTypes: ["Student Visa (Subclass 500)", "Student Guardian Visa"],
    requirements: [
      "Confirmation of Enrolment (CoE)",
      "Genuine Temporary Entrant (GTE) statement",
      "Financial evidence",
      "English proficiency results",
      "Health insurance (OSHC)",
      "Health check",
      "Character requirements",
    ],
    timeline: "4-6 weeks",
    cost: "AUD 630 for Student Visa",
    interviewRequired: false,
  },
  {
    name: "Canada",
    visaTypes: ["Study Permit", "Temporary Resident Visa"],
    requirements: [
      "Letter of Acceptance from DLI",
      "Proof of financial support",
      "Valid passport",
      "Quebec Acceptance Certificate (if applicable)",
      "Statement of purpose",
      "Biometrics",
      "Medical exam (if required)",
    ],
    timeline: "4-8 weeks",
    cost: "CAD 150 for Study Permit + CAD 85 for Biometrics",
    interviewRequired: false,
  },
  {
    name: "Germany",
    visaTypes: ["Student Visa", "Language Course Visa"],
    requirements: [
      "University admission letter",
      "Proof of financial means (blocked account)",
      "Health insurance",
      "German language proficiency",
      "Valid passport",
      "Biometric photos",
    ],
    timeline: "4-6 weeks",
    cost: "€75 for Student Visa",
    interviewRequired: true,
  },
  {
    name: "New Zealand",
    visaTypes: ["Student Visa", "Pathway Student Visa"],
    requirements: [
      "Offer of place from an approved institution",
      "Proof of sufficient funds",
      "Return air ticket or proof of funds to buy one",
      "Health insurance",
      "Police clearance certificate",
      "Medical certificate",
      "English proficiency proof",
    ],
    timeline: "20-25 working days",
    cost: "NZD 330 for Student Visa",
    interviewRequired: false,
  },
  {
    name: "India",
    visaTypes: ["Student Visa (S-1)", "Research Visa (S-4)"],
    requirements: [
      "Admission letter from Indian institution",
      "Valid passport with 6 months validity",
      "Financial proof of sufficient funds",
      "Health insurance coverage",
      "Police clearance certificate",
      "HIV test results (for courses > 1 year)",
      "Proof of residence in home country",
      "Academic transcripts and certificates"
    ],
    timeline: "3-4 weeks",
    cost: "USD 100 for Student Visa",
    interviewRequired: false,
  }
];

const faqs = [
  {
    question: "When should I apply for my student visa?",
    answer:
      "You should begin your visa application process as soon as you receive your acceptance letter and necessary documentation from your university. Generally, you can apply up to 6 months before your course start date.",
  },
  {
    question: "What financial documents do I need?",
    answer:
      "Typically, you'll need bank statements showing sufficient funds to cover your tuition and living expenses. The exact amount varies by country and length of study. Documents should be recent (usually within the last 3 months).",
  },
  {
    question: "Can I work while studying abroad?",
    answer:
      "Work permissions vary by country and visa type. Many student visas allow part-time work during term time and full-time during breaks, but there are usually restrictions on hours and types of work.",
  },
  // Add more FAQs as needed
];

export default function VisaGuidePage() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0].name);
  const currentCountry = countries.find(
    (country) => country.name === selectedCountry
  );

  return (
    <div className="w-[98%] mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Student Visa Guide
        </h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about student visa applications for your study
          abroad journey
        </p>
      </div>

      {/* Country Selection */}
      <div className="max-w-xs mx-auto mb-12">
        <span className=" text-lg mb-1 text-primary flex items-center justify-center">choose desired country</span>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger>
            <SelectValue className="p-5 border" placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.name} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        {/* Left Column - Visa Information */}
        <div className="space-y-8">
          <Card className="p-6">
            <Tabs defaultValue="requirements" className="space-y-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TabsTrigger className="p-3 md:p-2" value="requirements">Requirements</TabsTrigger>
                <TabsTrigger className="p-3 md:p-2" value="process">Process</TabsTrigger>
                <TabsTrigger className="p-3 md:p-2" value="timeline">Timeline</TabsTrigger>
                <TabsTrigger className="p-3 md:p-2" value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="requirements" className="space-y-4">
                <div className="grid gap-4">
                  {currentCountry.requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-muted rounded-lg"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="process" className="space-y-4">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <FileCheck className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">1. Gather Required Documents</h3>
                      <p className="text-sm text-muted-foreground">
                        Collect all necessary documentation including acceptance letter, financial proof, and passport.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <MessageCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">2. Complete Application Form</h3>
                      <p className="text-sm text-muted-foreground">
                        Fill out the visa application form accurately and completely.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">3. Pay Fees</h3>
                      <p className="text-sm text-muted-foreground">
                        Submit all required visa and processing fees.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">4. Schedule Appointment</h3>
                      <p className="text-sm text-muted-foreground">
                        Book your visa appointment at the embassy or visa center.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Clock className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Processing Time</h3>
                      <p className="text-2xl font-bold">
                        {currentCountry.timeline}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <span>Application Review</span>
                      <span className="font-medium">1-2 weeks</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <span>Document Processing</span>
                      <span className="font-medium">1 week</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <span>Visa Issuance</span>
                      <span className="font-medium">1-2 weeks</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="grid gap-4">
                  {[
                    "Valid Passport",
                    "Visa Application Form",
                    "Passport-size Photos",
                    "Acceptance Letter",
                    "Financial Documents",
                    "Health Insurance",
                    "English Test Results",
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    >
                      <span>{doc}</span>
                      <FileCheck className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Right Column - Important Information */}
        <div className="space-y-8">
          {/* Key Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Key Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Visa Fee</p>
                  <p className="text-sm text-muted-foreground">
                    {currentCountry.cost}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Processing Time</p>
                  <p className="text-sm text-muted-foreground">
                    {currentCountry.timeline}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <AlertCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Interview Required</p>
                  <p className="text-sm text-muted-foreground">
                    {currentCountry.interviewRequired ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* FAQs */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* CTA */}
          <Card className="p-6 bg-primary text-primary-foreground">
            <HelpCircle className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-sm mb-4">
              Get expert guidance for your visa application process
            </p>
            <Button
              variant="secondary"
              className="w-full"
              asChild
            >
              <a href="/onBoarding/consultationForm">Book a Consultation</a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
} 