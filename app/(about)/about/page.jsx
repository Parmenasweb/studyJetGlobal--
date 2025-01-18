"use client"

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap,
  Globe2,
  Users,
  Target,
  Award,
  Compass,
  BookOpen,
  Building2,
  Network,
  BarChart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Rocket,
  Flag,
  Users2,
  Lightbulb,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/homepagecomps/Footer";


const stats = [
  {
    value: "200+",
    label: "Students Placed",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    value: "50+",
    label: "Partner Universities",
    icon: Building2,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    value: "15+",
    label: "Countries",
    icon: Globe2,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    value: "95%",
    label: "Success Rate",
    icon: BarChart,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const values = [
  {
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service, ensuring the highest quality guidance for our students.",
    icon: Award,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    title: "Innovation",
    description: "Embracing new technologies and methods to provide cutting-edge solutions for international education.",
    icon: Compass,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Integrity",
    description: "Operating with complete transparency and honesty in all our interactions with students and partners.",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Global Network",
    description: "Building and maintaining strong relationships with universities and institutions worldwide.",
    icon: Network,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

const roadmap = [
  {
    year: "2022",
    title: "Foundation",
    description: "Established with a vision to transform international education accessibility",
    icon: Flag,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    year: "2023",
    title: "Growth & Expansion",
    description: "Partnered with top universities and expanded our global network",
    icon: Network,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    year: "2024",
    title: "Innovation",
    description: "Pioneer new approaches to international education consulting",
    icon: Lightbulb,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    year: "2025",
    title: "Future Vision",
    description: "Expanding to new markets and enhancing student success programs",
    icon: Rocket,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
];

const goals = [
  {
    title: "Student Success",
    description: "Ensuring every student achieves their academic and career goals through personalized guidance",
    icon: GraduationCap,
    stats: "95% placement rate",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    title: "Global Impact",
    description: "Creating a network of global leaders who contribute to international development",
    icon: Globe,
    stats: "Present in 15+ countries",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Innovation in Education",
    description: "Pioneering new approaches to international education consulting",
    icon: Lightbulb,
    stats: "AI-powered solutions",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Community Building",
    description: "Fostering a global community of students and alumni",
    icon: Users2,
    stats: "2000+ community members",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh]  w-full overflow-hidden">
        {/* Dynamic Background Layers */}
        <div className="absolute inset-0">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/20 dark:from-background dark:via-background/90 dark:to-primary/10" />
          
          {/* Animated Overlay Gradients */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tl from-blue-900/20 via-purple-900/20 to-transparent"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-900/20 to-cyan-900/20"
            animate={{
              opacity: [0.4, 0.2, 0.4],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: 4
            }}
          />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.03]" />
          </div>

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        </div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="relative h-full flex items-center justify-center text-center px-4"
          style={{ y, opacity }}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Sparkle Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center"
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              About StudyJetGlobal
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Empowering students to achieve their global education dreams since 2022
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 mt-8"
            >
              {[
                { label: "Countries", value: "15+" },
                { label: "Universities", value: "100+" },
                { label: "Success Rate", value: "95%" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-primary/50 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="w-[95%] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-card">
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold mb-2 text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 md:py-20 bg-background">
        <div className="w-[95%] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Our Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide our mission to transform international education
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 bg-card">
                  <div className={`w-12 h-12 ${value.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <value.icon className={`h-6 w-6 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-10 md:py-15 bg-muted">
        <div className="w-[95%] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Our Journey</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Milestones that mark our commitment to transforming international education
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border" />

            {/* Roadmap Items */}
            <div className="space-y-16">
              {roadmap.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} relative`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <Card className="p-6 bg-card hover:bg-accent transition-all duration-300">
                      <div className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center mb-4 ${index % 2 === 0 ? 'ml-auto' : ''}`}>
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{item.year}</h3>
                      <h4 className="text-lg font-semibold text-foreground/80 mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </Card>
                  </div>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="w-[95%] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Strategic Goals</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our commitment to excellence in international education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full bg-card hover:bg-accent transition-all duration-300">
                  <div className={`w-12 h-12 rounded-lg ${goal.bg} flex items-center justify-center mb-4`}>
                    <goal.icon className={`h-6 w-6 ${goal.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{goal.title}</h3>
                  <p className="text-muted-foreground mb-4">{goal.description}</p>
                  <div className="text-sm font-semibold text-primary">{goal.stats}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="w-[95%] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Take the first step towards your international education goals with StudyJetGlobal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/onBoarding/consultationForm">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/onBoarding/applicationForm">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}