"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Globe,
  Building,
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";
import Footer from "@/components/homepagecomps/Footer";
import ContactForm from "./components/contactForm";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "New Delhi, (guwahati)  India",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(+91) 6003145149",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@studyjetglobal.com",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon - Sat: 9:00am - 10:00pm",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61562265136097",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Twitter,
    href: "https://x.com/StudyJetGlobal_?t=Gi5aGQkERmKqKKleahTDew&s=08",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/studyjetglobal_official?igsh=MWpuOGh3cG5tZzI2NA==",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: Linkedin,
    href: "#",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

// Floating icons configuration
const floatingIcons = [
  { Icon: GraduationCap, color: "text-blue-500", delay: 0 },
  { Icon: Users, color: "text-green-500", delay: 1 },
  { Icon: BookOpen, color: "text-amber-500", delay: 2 },
  { Icon: Globe, color: "text-purple-500", delay: 3 },
  { Icon: MessageCircle, color: "text-rose-500", delay: 4 },
  { Icon: Building, color: "text-cyan-500", delay: 5 },
];

export default function Page() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const [iconPositions, setIconPositions] = useState([]);

  useEffect(() => {
    // Calculate random positions for icons after component mounts
    setIconPositions(
      floatingIcons.map(() => ({
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 0),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight * 0.5 : 0),
      }))
    );
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-[50vh] w-full overflow-hidden" 
        aria-label="Contact hero section"
      >
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

          {/* Floating Icons */}
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={iconPositions[index] || { x: 0, y: 0 }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5,
                delay: item.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                opacity: 0.3,
              }}
              aria-hidden="true"
            >
              <item.Icon className={`h-8 w-8 ${item.color}`} />
            </motion.div>
          ))}
        </div>

        {/* Main Content with Parallax */}
        <motion.div 
          className="relative h-full flex items-center justify-center text-center px-4"
          style={{ y, opacity }}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center"
              aria-hidden="true"
            >
              <MessageCircle className="h-8 w-8 text-primary" />
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get in Touch with StudyJetGlobal
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Expert guidance for your international education journey
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            >
              <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Information Section */}
      <section 
        className="py-12 md:py-20 bg-muted/50"
        aria-labelledby="contact-info-heading"
      >
        <div className="w-[95%] mx-auto px-4">
          <h2 id="contact-info-heading" className="sr-only">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6 text-center rounded-lg bg-card hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 ${item.bg} rounded-lg mx-auto mb-4 flex items-center justify-center`} aria-hidden="true">
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{item.label}</h3>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        className="py-12 md:py-20 bg-background"
        aria-labelledby="contact-form-heading"
      >
        <div className="w-[95%] mx-auto px-4">
          <h2 id="contact-form-heading" className="sr-only">Contact Form</h2>
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Office Info */}
              <div className="p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">StudyJetGlobal</p>
                      <p className="text-sm text-muted-foreground">International Education Consultants</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Global Presence</p>
                      <p className="text-sm text-muted-foreground">Serving students worldwide</p>
                    </div>
                </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Connect With Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                <Link
                      key={index}
                      href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                      className={`w-10 h-10 ${social.bg} rounded-lg flex items-center justify-center transition-transform hover:scale-110`}
                      aria-label={`Follow us on ${social.icon.name}`}
                >
                      <social.icon className={`h-5 w-5 ${social.color}`} aria-hidden="true" />
                </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
