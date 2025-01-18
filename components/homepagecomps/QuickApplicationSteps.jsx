"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ClipboardCheck,
  FileText,
  MessageCircle,
  GraduationCap,
  Plane,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Free Consultation",
    description: "Book a free consultation with our expert counselors",
    duration: "30 mins",
    link: "/onBoarding/consultationForm",
    buttonText: "Book Consultation",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100"
  },
  {
    icon: FileText,
    title: "Document Preparation", 
    description: "Get guidance on preparing your application documents",
    duration: "1-2 weeks",
    link: "/application-guide",
    buttonText: "View Requirements",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100"
  },
  {
    icon: ClipboardCheck,
    title: "University Application",
    description: "Apply to your chosen universities with our support",
    duration: "2-4 weeks",
    link: "/onBoarding/applicationForm",
    buttonText: "Start Application",
    iconColor: "text-green-500",
    iconBg: "bg-green-100"
  },
  {
    icon: GraduationCap,
    title: "Admission & Acceptance",
    description: "Receive and accept your university offer",
    duration: "4-8 weeks",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100"
  },
  {
    icon: Plane,
    title: "Visa & Travel",
    description: "Get visa guidance and pre-departure support",
    duration: "6-8 weeks",
    link: "/visa-guide",
    buttonText: "Visa Guide",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-100"
  },
];

export default function QuickApplicationSteps() {
  return (
    <section className="py-16 md:py-24">
      <div className="w-[95%] md:w-[70%] mx-auto px-2">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Your Journey to Study Abroad
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple steps to start your international education journey with StudyJetGlobal
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-muted" />

          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${step.iconBg} ${step.iconColor} top-6`} />

              {/* Content */}
              <div className="ml-12 md:ml-0 md:w-1/2 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${step.iconBg}`}>
                    <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Duration: {step.duration}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  {step.description}
                </p>
                {step.link && (
                  <Button variant="outline" asChild>
                    <Link href={step.link}>
                      {step.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Ready to Begin Your Journey?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/onBoarding/applicationForm">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/onBoarding/consultationForm">
                Book Free Consultation
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}