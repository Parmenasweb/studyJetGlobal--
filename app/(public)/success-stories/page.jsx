"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  Building,
  MapPin,
  Quote,
  Trophy,
  Briefcase,
  Star,
  Users,
  Globe,
  BadgeCheck,
  Rocket,
  Target,
} from "lucide-react";
import Link from "next/link";

const successStories = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "/images/testimonials/sarah.jpg",
    university: "Harvard University",
    program: "Master's in Computer Science",
    country: "United States",
    year: "2023",
    currentRole: "Software Engineer at Google",
    quote:
      "StudyJet Global made my dream of studying at Harvard a reality. Their guidance throughout the application process was invaluable.",
    achievements: [
      "Full scholarship recipient",
      "Published research paper",
      "Internship at Microsoft",
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "/images/testimonials/michael.jpg",
    university: "University of Oxford",
    program: "PhD in Biochemistry",
    country: "United Kingdom",
    year: "2022",
    currentRole: "Research Scientist at AstraZeneca",
    quote:
      "The personalized mentoring and support I received helped me secure a position at one of the world's top universities.",
    achievements: [
      "Research grant winner",
      "Published in Nature",
      "Conference speaker",
    ],
  },
  {
    id: 3,
    name: "Emma Thompson",
    image: "/images/testimonials/emma.jpg",
    university: "University of Toronto",
    program: "MBA",
    country: "Canada",
    year: "2023",
    currentRole: "Management Consultant at McKinsey",
    quote:
      "The comprehensive support from application to visa processing made my journey smooth and successful.",
    achievements: [
      "Class valedictorian",
      "Case competition winner",
      "Summer associate at Goldman Sachs",
    ],
  },
];

const stats = [
  { 
    label: "Success Rate", 
    value: "95%",
    icon: BadgeCheck,
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  { 
    label: "Scholarship Recipients", 
    value: "500+",
    icon: Trophy,
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  { 
    label: "University Partnerships", 
    value: "100+",
    icon: Building,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  { 
    label: "Countries", 
    value: "20+",
    icon: Globe,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="w-[98%] mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-primary/10">
          <Star className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm font-medium">Success Stories</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          studyjetglobal Student&apos;s Success Stories
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover how we&apos;ve helped students achieve their academic dreams and launch successful careers worldwide
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Success Stories */}
      <div className="space-y-12">
        {successStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="grid md:grid-cols-[200px,1fr] gap-8">
                <div className="space-y-4 text-center">
                  <Avatar className="h-32 w-32 mx-auto ring-4 ring-primary/10">
                    <AvatarImage src={story.image} alt={story.name} />
                    <AvatarFallback className="bg-primary/5">
                      {story.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Class of {story.year}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full">
                        <GraduationCap className="h-4 w-4" />
                        <span>{story.program}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full">
                        <Building className="h-4 w-4" />
                        <span>{story.university}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-full">
                        <MapPin className="h-4 w-4" />
                        <span>{story.country}</span>
                      </div>
                    </div>

                    <blockquote className="relative p-6 bg-muted rounded-xl">
                      <Quote className="h-10 w-10 text-primary/20 absolute -top-2 -left-2" />
                      <p className="relative z-10 italic text-muted-foreground">{story.quote}</p>
                    </blockquote>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-amber-500" />
                          Key Achievements
                        </h4>
                        <ul className="grid gap-2">
                          {story.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <BadgeCheck className="h-4 w-4 text-green-500" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-blue-500" />
                          Current Position
                        </h4>
                        <p className="text-sm text-primary">{story.currentRole}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16">
        <Card className="max-w-2xl mx-auto p-8 text-center bg-primary text-primary-foreground">
          <Rocket className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Start Your Success Story</h3>
          <p className="text-primary-foreground/80 mb-6">
            Join our community of successful students and begin your journey to academic excellence
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" className="hover:bg-background/90" asChild>
              <Link href="/application-guide">View Application Guide</Link>
            </Button>
            <Button variant="outline" className="bg-transparent hover:bg-primary-foreground/10" asChild>
              <Link href="/onBoarding/consultationForm">Book a Consultation</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 