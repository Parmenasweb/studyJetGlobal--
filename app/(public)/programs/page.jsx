"use client";

import { useState } from "react";
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
  GraduationCap,
  Search,
  BookOpen,
  Clock,
  DollarSign,
  Filter,
} from "lucide-react";

const programs = [
  {
    title: "Computer Science",
    level: "Bachelor's",
    duration: "4 years",
    tuition: "$20,000/year",
    description:
      "Study the fundamentals of computing, programming, and software development.",
    subjects: ["Programming", "Algorithms", "Data Structures", "AI"],
    careers: ["Software Engineer", "Data Scientist", "Systems Analyst"],
  },
  {
    title: "Business Administration",
    level: "Master's",
    duration: "2 years",
    tuition: "$25,000/year",
    description:
      "Develop leadership skills and business acumen for management roles.",
    subjects: ["Management", "Finance", "Marketing", "Strategy"],
    careers: ["Business Manager", "Consultant", "Entrepreneur"],
  },
  {
    title: "Medicine",
    level: "Doctorate",
    duration: "6 years",
    tuition: "$35,000/year",
    description: "Train to become a medical professional and save lives.",
    subjects: ["Anatomy", "Physiology", "Pharmacology", "Clinical Practice"],
    careers: ["Doctor", "Surgeon", "Medical Researcher"],
  },
  {
    title: "Environmental Science",
    level: "Bachelor's",
    duration: "3 years",
    tuition: "$18,000/year",
    description: "Study the environment and its impact on our world.",
    subjects: ["Ecology", "Chemistry", "Biology", "Conservation"],
    careers: ["Environmental Consultant", "Researcher", "Conservation Officer"],
  },
];

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = program.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "all" || program.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="w-[98%] mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Academic Programs
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover our comprehensive range of academic programs designed to help you
          achieve your career goals
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,200px] gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Program Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Bachelor's">Bachelor&apos;s</SelectItem>
              <SelectItem value="Master's">Master&apos;s</SelectItem>
              <SelectItem value="Doctorate">Doctorate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPrograms.map((program, index) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {program.description}
                  </p>
                </div>
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{program.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{program.tuition}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject) => (
                      <div
                        key={subject}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Career Opportunities</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.careers.map((career) => (
                      <div
                        key={career}
                        className="text-xs px-2 py-1 bg-muted rounded-full"
                      >
                        {career}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6">Learn More</Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Find Your Perfect Program</h3>
          <p className="text-muted-foreground mb-6">
            Get expert guidance on choosing the right program for your career goals
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="/application-guide">View Requirements</a>
            </Button>
            <Button asChild>
              <a href="/consultation">Get Program Advice</a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 