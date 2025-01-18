"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileText,
  GraduationCap,
  CheckCircle2,
  Clock,
  FileCheck,
  Globe,
  MessageCircle,
  DollarSign,
  PlaneLanding,
} from "lucide-react";

const applicationSteps = [
  {
    id: "research",
    title: "Research & Planning",
    description: "Begin your journey with thorough research",
    icon: Globe,
    content: [
      {
        title: "Choose Your Destination",
        description: "Research different countries and their education systems",
        tips: [
          "Consider factors like cost of living, culture, and language",
          "Research top universities and their rankings",
          "Look into visa requirements and restrictions",
        ],
      },
      {
        title: "Select Your Program",
        description: "Find the right course that matches your goals",
        tips: [
          "Check program requirements and prerequisites",
          "Research career prospects after graduation",
          "Compare similar programs at different institutions",
        ],
      },
    ],
  },
  {
    id: "documents",
    title: "Document Preparation",
    description: "Gather and prepare all required documents",
    icon: FileText,
    content: [
      {
        title: "Academic Documents",
        description: "Prepare your educational records",
        tips: [
          "Transcripts from previous institutions",
          "Degree certificates and diplomas",
          "Standardized test scores (if required)",
        ],
      },
      {
        title: "Personal Documents",
        description: "Organize your personal documentation",
        tips: [
          "Valid passport with sufficient validity",
          "Passport-size photographs",
          "CV/Resume and personal statement",
        ],
      },
    ],
  },
  {
    id: "tests",
    title: "Language & Entrance Tests",
    description: "Prepare for and take required tests",
    icon: GraduationCap,
    content: [
      {
        title: "Language Proficiency",
        description: "Prepare for language tests",
        tips: [
          "IELTS or TOEFL preparation",
          "Practice with mock tests",
          "Consider taking preparation courses",
        ],
      },
      {
        title: "Additional Tests",
        description: "Other tests you might need",
        tips: [
          "GRE/GMAT for graduate programs",
          "Subject-specific tests",
          "University entrance exams",
        ],
      },
    ],
  },
  {
    id: "application",
    title: "Application Process",
    description: "Submit your applications",
    icon: FileCheck,
    content: [
      {
        title: "Application Forms",
        description: "Complete university applications",
        tips: [
          "Fill out all sections accurately",
          "Double-check submission requirements",
          "Pay application fees",
        ],
      },
      {
        title: "Supporting Documents",
        description: "Submit additional materials",
        tips: [
          "Letters of recommendation",
          "Statement of purpose",
          "Portfolio (if required)",
        ],
      },
    ],
  },
  {
    id: "visa",
    title: "Visa Application",
    description: "Apply for your student visa",
    icon: MessageCircle,
    content: [
      {
        title: "Visa Requirements",
        description: "Prepare visa application materials",
        tips: [
          "Acceptance letter from university",
          "Proof of financial support",
          "Health insurance documentation",
        ],
      },
      {
        title: "Visa Process",
        description: "Complete visa application steps",
        tips: [
          "Schedule visa appointment",
          "Prepare for visa interview",
          "Submit biometrics",
        ],
      },
    ],
  },
  {
    id: "preparation",
    title: "Pre-Departure",
    description: "Prepare for your journey",
    icon: PlaneLanding,
    content: [
      {
        title: "Travel Arrangements",
        description: "Plan your travel",
        tips: [
          "Book flights and accommodation",
          "Arrange airport pickup",
          "Pack essential items",
        ],
      },
      {
        title: "Final Checklist",
        description: "Complete final preparations",
        tips: [
          "Currency exchange and banking",
          "Health check and vaccinations",
          "Register for orientation",
        ],
      },
    ],
  },
];

export default function ApplicationGuidePage() {
  const [selectedStep, setSelectedStep] = useState("research");
  const currentStepIndex = applicationSteps.findIndex(step => step.id === selectedStep);
  const progress = ((currentStepIndex + 1) / applicationSteps.length) * 100;

  return (
    <div className="w-[95%] mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Your Study Abroad Journey Starts Here
        </h1>
        <p className="text-lg text-muted-foreground">
          Follow our comprehensive guide to make your study abroad dreams a reality
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[300px,1fr] lg:gap-12">
        {/* Steps Navigation */}
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg mb-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Application Progress</p>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Step {currentStepIndex + 1} of {applicationSteps.length}
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {applicationSteps.map((step) => (
              <Button
                key={step.id}
                variant={selectedStep === step.id ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setSelectedStep(step.id)}
              >
                <step.icon className="h-4 w-4" />
                <span>{step.title}</span>
              </Button>
            ))}
          </nav>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {applicationSteps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: selectedStep === step.id ? 1 : 0,
                y: selectedStep === step.id ? 0 : 20,
                display: selectedStep === step.id ? "block" : "none",
              }}
              transition={{ duration: 0.2 }}
            >
              {selectedStep === step.id && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {step.title}
                    </h2>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  <div className="space-y-4">
                    {step.content.map((section, index) => (
                      <Card key={index} className="p-6">
                        <h3 className="text-lg font-semibold mb-2">
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {section.description}
                        </p>
                        <ul className="space-y-2">
                          {section.tips.map((tip, tipIndex) => (
                            <li
                              key={tipIndex}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const prevIndex = Math.max(0, currentStepIndex - 1);
                        setSelectedStep(applicationSteps[prevIndex].id);
                      }}
                      disabled={currentStepIndex === 0}
                    >
                      Previous Step
                    </Button>
                    <Button
                      onClick={() => {
                        const nextIndex = Math.min(
                          applicationSteps.length - 1,
                          currentStepIndex + 1
                        );
                        setSelectedStep(applicationSteps[nextIndex].id);
                      }}
                      disabled={currentStepIndex === applicationSteps.length - 1}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto p-6">
          <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
          <p className="text-muted-foreground mb-4">
            Our education consultants are here to guide you through every step of
            your application journey.
          </p>
          <Button size="lg" asChild>
            <a href="/onBoarding/consultationForm">Book a Free Consultation</a>
          </Button>
        </Card>
      </div>
    </div>
  );
} 