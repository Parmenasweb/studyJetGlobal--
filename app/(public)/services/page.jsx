"use client"

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
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
  Clock,
  Target,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

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
    color: "text-blue-500",
    bg: "bg-blue-500/10",
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
    color: "text-green-500",
    bg: "bg-green-500/10",
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
    color: "text-purple-500",
    bg: "bg-purple-500/10",
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
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "MSc Computer Science, Stanford University",
    content: 
      "StudyJet Global's comprehensive guidance helped me navigate the complex US admission process. Their test prep services boosted my GRE score by 15 points, and their visa assistance was invaluable. Now I'm pursuing my dream program at Stanford!",
    image: "/images/testimonials/sarah.jpg",
  },
  {
    name: "Raj Patel", 
    role: "BEng Mechanical Engineering, University of Melbourne",
    content:
      "From helping me choose the right university in Australia to securing my student visa, StudyJet Global was there every step of the way. Their IELTS coaching helped me achieve a band score of 7.5. Highly recommend their services!",
    image: "/images/testimonials/raj.jpg",
  },
  {
    name: "Maria Garcia",
    role: "MSc Business Analytics, London Business School",
    content:
      "Thanks to StudyJet Global's expert counseling, I got accepted into LBS with a partial scholarship. Their career guidance and application strategy were game-changers. The visa process was smooth, and their pre-departure support was excellent.",
    image: "/images/testimonials/maria.jpg",
  },
  {
    name: "David Kim",
    role: "Bachelor of Arts, University of British Columbia",
    content: 
      "StudyJet Global made my dream of studying in Canada a reality. Their personalized approach to test preparation and admission essays helped me stand out. The scholarship guidance saved my family significant expenses.",
    image: "/images/testimonials/david.jpg",
  }
];

export default function ServicesPage() {
  const tabsRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const scrollToService = (serviceId) => {
    const tabs = tabsRef.current;
    if (tabs) {
      tabs.scrollIntoView({ behavior: "smooth" });
      // Set the active tab after scrolling
      const tabsTrigger = document.querySelector(`[data-state="active"]`);
      if (tabsTrigger) {
        tabsTrigger.click();
      }
    }
  };

  return (
    <div className="w-[98%] mx-auto px-4 py-16 md:py-24">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <motion.div 
        className="max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive support for your international education journey
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-lg ${service.bg} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} />
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
                      <BadgeCheck className={`h-4 w-4 ${service.color}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground"
                onClick={() => scrollToService(service.id)}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed Service Information */}
      <div ref={tabsRef}>
        <Card className="mb-16">
          <Tabs defaultValue={services[0].id} className="p-6">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex items-center gap-2"
                >
                  <div className={`p-1 rounded ${service.bg}`}>
                    <service.icon className={`h-4 w-4 ${service.color}`} />
                  </div>
                  <span className="hidden md:inline">{service.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-4">What We Offer</h3>
                    <div className="space-y-4">
                      {service.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-muted rounded-lg"
                        >
                          <BadgeCheck className={`h-5 w-5 ${service.color} mt-0.5`} />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Our Process</h3>
                    <div className="space-y-4">
                      {service.process.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-muted rounded-lg"
                        >
                          <div className={`w-8 h-8 rounded-full ${service.bg} flex items-center justify-center ${service.color} font-bold`}>
                            {index + 1}
                          </div>
                          <span>{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>

      {/* Why Choose Us */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Expert Counselors",
              description: "Our team of experienced counselors provides personalized guidance tailored to your goals.",
              color: "text-cyan-500", 
              bg: "bg-cyan-500/10"
            },
            {
              icon: Globe,
              title: "Global Network",
              description: "Partnerships with 100+ top universities worldwide for better opportunities and scholarships.",
              color: "text-indigo-500",
              bg: "bg-indigo-500/10"
            },
            {
              icon: BadgeCheck,
              title: "Proven Success",
              description: "95% success rate in university admissions and visa approvals across all destinations.",
              color: "text-rose-500",
              bg: "bg-rose-500/10"
            },
            {
              icon: Clock,
              title: "End-to-End Support",
              description: "Comprehensive assistance from university selection to post-arrival settlement.",
              color: "text-amber-500",
              bg: "bg-amber-500/10"
            },
            {
              icon: Target,
              title: "Personalized Strategy",
              description: "Custom study plans and university shortlisting based on your profile and aspirations.",
              color: "text-emerald-500",
              bg: "bg-emerald-500/10"
            },
            {
              icon: DollarSign,
              title: "Financial Guidance",
              description: "Expert advice on scholarships, funding options and cost-effective study programs.",
              color: "text-purple-500",
              bg: "bg-purple-500/10"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
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
            <Link href="/onBoarding/applicationForm">Apply Now!</Link>
          </Button>
          <Button asChild>
            <Link href="/onBoarding/consultationForm">Book Consultation</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
} 