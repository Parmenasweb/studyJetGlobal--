"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  GraduationCap,
  Search,
  Globe,
  DollarSign,
  Calendar,
  BookOpen,
  School,
  Trophy,
  BadgeCheck,
  ArrowRight,
  Filter,
} from "lucide-react";

const scholarships = [
  {
    id: 1,
    title: "Global Excellence Scholarship",
    university: "Harvard University",
    country: "United States",
    amount: "$50,000",
    deadline: "2024-05-15",
    type: "Merit-based",
    requirements: [
      "Minimum GPA of 3.8",
      "Outstanding academic achievements",
      "Leadership experience",
      "Strong letters of recommendation",
    ],
    eligibility: [
      "International students",
      "Undergraduate programs",
      "First-year applicants",
    ],
    description:
      "Prestigious scholarship for exceptional international students demonstrating academic excellence and leadership potential.",
  },
  {
    id: 2,
    title: "Future Leaders Scholarship",
    university: "University of Oxford",
    country: "United Kingdom",
    amount: "£40,000",
    deadline: "2024-06-30",
    type: "Merit-based",
    requirements: [
      "Strong academic record",
      "Leadership potential",
      "Community involvement",
      "Research proposal",
    ],
    eligibility: [
      "International students",
      "Graduate programs",
      "All fields of study",
    ],
    description:
      "Scholarship program aimed at developing future global leaders through academic excellence and leadership development.",
  },
  {
    id: 3,
    title: "STEM Innovation Grant",
    university: "MIT",
    country: "United States",
    amount: "$45,000",
    deadline: "2024-07-15",
    type: "Field-specific",
    requirements: [
      "Excellence in STEM subjects",
      "Research experience",
      "Innovation portfolio",
      "Technical skills",
    ],
    eligibility: [
      "International students",
      "Graduate programs",
      "STEM fields only",
    ],
    description:
      "Supporting innovative minds in STEM fields to pursue cutting-edge research and development.",
  },
  {
    id: 4,
    title: "Arts & Humanities Fellowship",
    university: "University of Toronto",
    country: "Canada",
    amount: "CAD 35,000",
    deadline: "2024-08-01",
    type: "Field-specific",
    requirements: [
      "Portfolio submission",
      "Academic excellence",
      "Creative achievements",
      "Research proposal",
    ],
    eligibility: [
      "International students",
      "Graduate programs",
      "Arts & Humanities",
    ],
    description:
      "Fellowship program for outstanding students in arts and humanities disciplines.",
  },
];

const filters = {
  countries: ["All Countries", "United States", "United Kingdom", "Canada", "Australia"],
  types: ["All Types", "Merit-based", "Need-based", "Field-specific", "Research"],
  levels: ["All Levels", "Undergraduate", "Graduate", "PhD", "Postdoctoral"],
};

export default function ScholarshipPage() {
  return (
    <div className="w-[98%] mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Scholarship Opportunities
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover global scholarship opportunities to fund your international education
        </p>
      </div>

      {/* Search and Filter Section */}
      <Card className="p-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto,auto] gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search scholarships..." className="pl-10" />
          </div>
          {Object.entries(filters).map(([key, values]) => (
            <Select key={key}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${key}`} />
              </SelectTrigger>
              <SelectContent>
                {values.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </Card>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {scholarships.map((scholarship) => (
          <motion.div
            key={scholarship.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{scholarship.title}</h3>
                  <p className="text-muted-foreground">{scholarship.university}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">
                    {scholarship.amount}
                  </p>
                  <p className="text-sm text-muted-foreground">per year</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{scholarship.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{scholarship.type}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {scholarship.description}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <ul className="space-y-2">
                    {scholarship.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button className="w-full" asChild>
                <a href={`/scholarship/${scholarship.id}`}>
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Application Guide */}
      <Card className="mb-16">
        <Tabs defaultValue="prepare" className="p-6">
          <h2 className="text-2xl font-bold mb-6">Scholarship Application Guide</h2>
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <TabsTrigger value="prepare">Preparation</TabsTrigger>
            <TabsTrigger value="apply">Application</TabsTrigger>
            <TabsTrigger value="tips">Tips & Tricks</TabsTrigger>
          </TabsList>

          <TabsContent value="prepare">
            <div className="space-y-4">
              {[
                {
                  title: "Research Opportunities",
                  description:
                    "Start early and research various scholarship opportunities that match your profile.",
                  icon: Search,
                },
                {
                  title: "Gather Documents",
                  description:
                    "Collect all required documents including transcripts, recommendations, and certificates.",
                  icon: BookOpen,
                },
                {
                  title: "Check Eligibility",
                  description:
                    "Carefully review eligibility criteria and requirements for each scholarship.",
                  icon: BadgeCheck,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                >
                  <step.icon className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="apply">
            <div className="space-y-4">
              {[
                {
                  title: "Complete Application",
                  description:
                    "Fill out the application form accurately and thoroughly.",
                  icon: GraduationCap,
                },
                {
                  title: "Write Essays",
                  description:
                    "Craft compelling essays that highlight your achievements and aspirations.",
                  icon: BookOpen,
                },
                {
                  title: "Submit Application",
                  description:
                    "Submit your application before the deadline and follow up if necessary.",
                  icon: BadgeCheck,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                >
                  <step.icon className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <div className="space-y-4">
              {[
                {
                  title: "Start Early",
                  description:
                    "Begin your scholarship search and application process well in advance.",
                  icon: Calendar,
                },
                {
                  title: "Highlight Achievements",
                  description:
                    "Emphasize your unique achievements, experiences, and goals.",
                  icon: Trophy,
                },
                {
                  title: "Follow Instructions",
                  description:
                    "Pay attention to details and follow all application instructions carefully.",
                  icon: BadgeCheck,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                >
                  <step.icon className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* CTA Section */}
      <Card className="max-w-2xl mx-auto p-8 text-center">
        <School className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h3 className="text-2xl font-bold mb-4">Need Help with Applications?</h3>
        <p className="text-muted-foreground mb-6">
          Get expert guidance on scholarship applications and increase your chances of
          success
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <a href="/resources">View Resources</a>
          </Button>
          <Button asChild>
            <a href="/consultation">Get Expert Help</a>
          </Button>
        </div>
      </Card>
    </div>
  );
} 