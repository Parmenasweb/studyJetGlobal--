"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  GraduationCap,
  FileText,
  Globe,
  MessageCircle,
  Users,
  BookOpen,
  PenTool,
  Building,
  Plane,
  Home,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "university-admission",
    title: "University Admission",
    description: "Expert guidance through the entire university application process",
    features: [
      "University selection and course guidance",
      "Application document preparation",
      "Personal statement review",
      "Interview preparation",
      "Admission strategy planning",
    ],
    process: [
      "Initial consultation",
      "University shortlisting",
      "Application preparation",
      "Document submission",
      "Follow-up support",
    ],
    icon: GraduationCap,
  },
  {
    id: "visa-assistance",
    title: "Visa Assistance",
    description: "Comprehensive support for student visa applications",
    features: [
      "Visa requirement analysis",
      "Document preparation assistance",
      "Application review",
      "Interview preparation",
      "Visa tracking support",
    ],
    process: [
      "Document checklist",
      "Application filling",
      "Document verification",
      "Interview coaching",
      "Visa submission",
    ],
    icon: MessageCircle,
  },
  {
    id: "test-preparation",
    title: "Test Preparation",
    description: "Specialized coaching for international exams",
    features: [
      "IELTS preparation",
      "TOEFL coaching",
      "GRE/GMAT training",
      "SAT/ACT preparation",
      "Practice tests and feedback",
    ],
    process: [
      "Skill assessment",
      "Customized study plan",
      "Regular practice sessions",
      "Mock tests",
      "Performance tracking",
    ],
    icon: BookOpen,
  },
  {
    id: "career-counseling",
    title: "Career Counseling",
    description: "Professional guidance for career planning",
    features: [
      "Career assessment",
      "Course selection guidance",
      "Industry insights",
      "Career path planning",
      "Job market analysis",
    ],
    process: [
      "Interest assessment",
      "Skills evaluation",
      "Career mapping",
      "Goal setting",
      "Action planning",
    ],
    icon: PenTool,
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Harvard University Student",
    content:
      "The university admission guidance was exceptional. They helped me get into my dream university!",
    image: "/images/testimonials/sarah.jpg",
  },
  {
    name: "Michael Chen",
    role: "Oxford University Student",
    content:
      "Their visa assistance made the complex process simple and stress-free.",
    image: "/images/testimonials/michael.jpg",
  },
  {
    name: "Emma Thompson",
    role: "University of Toronto Student",
    content:
      "The test preparation program significantly improved my IELTS score.",
    image: "/images/testimonials/emma.jpg",
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive support for your international education journey
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
          >
            <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
              <div className="flex-1">
                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground"
                asChild
              >
                <a href={`/services/${service.id}`}>
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed Service Information */}
      <Card className="mb-16">
        <Tabs defaultValue={services[0].id} className="p-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {services.map((service) => (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className="flex items-center gap-2"
              >
                <service.icon className="h-4 w-4" />
                <span className="hidden md:inline">{service.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">What We Offer</h3>
                  <div className="space-y-4">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-muted rounded-lg"
                      >
                        <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Our Process</h3>
                  <div className="space-y-4">
                    {service.process.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-muted rounded-lg"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Why Choose Us */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Expert Counselors",
              description:
                "Our team of experienced counselors provides personalized guidance.",
            },
            {
              icon: Globe,
              title: "Global Network",
              description:
                "Partnerships with top universities worldwide for better opportunities.",
            },
            {
              icon: BadgeCheck,
              title: "Proven Success",
              description:
                "High success rate in university admissions and visa approvals.",
            },
          ].map((feature, index) => (
            <Card key={index} className="p-6">
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-muted" />
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{testimonial.content}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="max-w-2xl mx-auto p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
        <p className="text-muted-foreground mb-6">
          Book a free consultation with our expert counselors
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <a href="/services">Browse Services</a>
          </Button>
          <Button asChild>
            <a href="/consultation">Book Consultation</a>
          </Button>
        </div>
      </Card>
    </div>
  );
} 