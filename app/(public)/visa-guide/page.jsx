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
  // Add more countries as needed
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
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger>
            <SelectValue placeholder="Select Country" />
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
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
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
              <a href="/consultation">Book a Consultation</a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
} 