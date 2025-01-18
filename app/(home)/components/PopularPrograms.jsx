"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Clock, Briefcase } from "lucide-react";
import Link from "next/link";

const popularPrograms = [
  {
    id: "computer-science",
    name: "Computer Science & IT",
    duration: "3-4 years",
    careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cloud Architect"]
  },
  {
    id: "business",
    name: "Business & Management",
    duration: "3-4 years",
    careers: ["Business Analyst", "Management Consultant", "Entrepreneur", "Project Manager"]
  },
  {
    id: "engineering",
    name: "Engineering",
    duration: "4 years",
    careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Systems Engineer"]
  },
  {
    id: "medicine",
    name: "Medicine & Healthcare",
    duration: "5-6 years",
    careers: ["Doctor", "Healthcare Administrator", "Medical Researcher", "Clinical Specialist"]
  },
  {
    id: "data-science",
    name: "Data Science & Analytics",
    duration: "3-4 years",
    careers: ["Data Analyst", "Business Intelligence Analyst", "Data Engineer", "Analytics Consultant"]
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    duration: "3-4 years",
    careers: ["Digital Marketing Manager", "SEO Specialist", "Social Media Strategist", "Content Marketing Manager"]
  }
];

function ProgramCard({ program }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">{program.name}</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-sm font-medium">{program.duration}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground">Career Opportunities</p>
              </div>
              <ul className="ml-10 space-y-1">
                {program.careers.map((career, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {career}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/onBoarding/applicationForm"
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function PopularPrograms() {
  return (
    <section className="py-12 md:py-20 bg-muted/50">
      <div className="w-[95%] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
           studyjet&apos;s Popular Study Programs
          </h2>
          <p className="text-muted-foreground">
            Discover our most sought-after programs with excellent career prospects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
} 