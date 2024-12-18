"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, GraduationCap, Building, MapPin } from "lucide-react";

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
  { label: "Success Rate", value: "95%" },
  { label: "Scholarship Recipients", value: "500+" },
  { label: "University Partnerships", value: "100+" },
  { label: "Countries", value: "20+" },
];

export default function SuccessStoriesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Student Success Stories
        </h1>
        <p className="text-lg text-muted-foreground">
          Read about the journeys and achievements of our successful students
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 text-center">
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
            <Card className="p-6 md:p-8">
              <div className="grid md:grid-cols-[200px,1fr] gap-8">
                <div className="space-y-4 text-center">
                  <Avatar className="h-32 w-32 mx-auto">
                    <AvatarImage src={story.image} alt={story.name} />
                    <AvatarFallback>
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
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>{story.program}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>{story.university}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{story.country}</span>
                      </div>
                    </div>

                    <blockquote className="border-l-2 pl-6 italic">
                      <Quote className="h-6 w-6 text-muted-foreground mb-2" />
                      {story.quote}
                    </blockquote>

                    <div>
                      <h4 className="font-medium mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {story.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Current Position:</h4>
                      <p className="text-sm text-primary">{story.currentRole}</p>
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
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Start Your Success Story</h3>
          <p className="text-muted-foreground mb-6">
            Join our community of successful students and begin your journey to
            academic excellence
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="/application-guide">View Application Guide</a>
            </Button>
            <Button asChild>
              <a href="/consultation">Book a Consultation</a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 