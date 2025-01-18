"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Shield,
  Clock,
  HandHeart,
  GraduationCap,
  Phone,
  Mail,
  MessageCircle,
  AlertCircle,
  MessagesSquare,
  Instagram,
  Twitter,
  Facebook,
  Share2,
  ExternalLink,
  Headphones,
  Users,
  Globe2,
  Award,
  BookOpen,
  X,
} from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const valueProps = [
  {
    icon: Shield,
    title: "Trusted Partner",
    description: "Licensed education consultancy with proven success record",
    highlight: "5000+ successful placements",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your queries",
    highlight: "Immediate response",
    color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
  },
  {
    icon: HandHeart,
    title: "Personalized Expert Guidance",
    description: "Tailored advice for your unique educational journey",
    highlight: "One-on-one mentoring",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
  },
  {
    icon: GraduationCap,
    title: "Expert Counselors",
    description: "Experienced team with deep industry knowledge",
    highlight: "Certified professionals",
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
  },
  {
    icon: Globe2,
    title: "Global Network",
    description: "Partnerships with top universities across multiple countries",
    highlight: "100+ university partners",
    color: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
  },
  {
    icon: Users,
    title: "Student Community",
    description: "Join a network of international students and alumni",
    highlight: "200+ students",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
  },
  {
    icon: Award,
    title: "Scholarship Support",
    description: "Access to exclusive scholarship opportunities and application assistance", 
    highlight: "$75,000 awarded",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400"
  },
  {
    icon: BookOpen,
    title: "Program Variety",
    description: "Wide range of courses and specializations to choose from",
    highlight: "500+ programs",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
  },
];

const emergencyContacts = [
  {
    icon: Phone,
    title: "24/7 Helpline",
    contact: "+916000512274",
    type: "phone",
  },
  {
    icon: Mail,
    title: "Emergency Email",
    contact: "services.studyjetglobal@gmail.com",
    type: "email",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    contact: "Available 24/7",
    type: "chat",
  },
];

const socialLinks = [
  {
    icon: MessagesSquare,
    name: "WhatsApp",
    link: "https://wa.me/916000512274",
    color: "text-green-500 hover:text-green-600",
    tooltip: "Chat on WhatsApp",
  },
  {
    icon: InstagramLogoIcon,
    name: "Instagram",
    link: "https://www.instagram.com/studyjetglobal_official/?igsh=MWpuOGh3cG5tZzI2NA%3D%3D#",
    color: "text-pink-500 hover:text-pink-600",
    tooltip: "Follow us on Instagram",
  },
  {
    icon: Twitter,
    name: "X (Twitter)",
    link: "https://x.com/StudyJetGlobal_?t=Gi5aGQkERmKqKKleahTDew&s=08",
    color: "text-blue-400 hover:text-blue-500",
    tooltip: "Follow us on X",
  },
  {
    icon: Facebook,
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=61572227369508",
    color: "text-blue-600 hover:text-blue-700",
    tooltip: "Follow us on Facebook",
  },
];

export default function ValuePropositionEmergency() {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  // Function to handle social sharing
  const handleShare = async (platform, content) => {
    const shareData = {
      title: "StudyJetGlobal - Your Study Abroad Partner",
      text: content,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        window.open(platform.link, "_blank");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="w-[95%] mx-auto px-2">
        {/* Value Propositions */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Choose StudyJetGlobal?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in international education with comprehensive support at every step
          </p>
        </div>

        <div className="grid grid-cols-1 w-[90%] mx-auto md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
              className="w-full"
            >
              <Card 
                className={`flex flex-col justify-between p-4 transition-all duration-300 ${
                  activeCard === index 
                    ? "shadow-lg scale-105 bg-primary/5" 
                    : "hover:shadow-lg hover:scale-102"
                }`}
              >
                <CardHeader>
                  <div className={`mb-4 p-3 w-fit rounded-xl ${prop.color}`}>
                    <prop.icon className={`w-6 h-6 transition-transform duration-300 ${
                      activeCard === index ? "scale-110" : ""
                    }`} />
                  </div>
                  <CardTitle>{prop.title}</CardTitle>
                  <CardDescription>{prop.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary">
                      {prop.highlight}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleShare(socialLinks[0], prop.description)}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Share this information</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Social Media Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl p-8 mb-16 mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">Connect With Us</h3>
            <p className="text-muted-foreground">
              Stay updated with our latest opportunities and success stories
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((platform, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-4 rounded-full bg-background shadow-sm hover:shadow-md transition-all duration-300 ${platform.color}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <platform.icon className="w-6 h-6" />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{platform.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact Section */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-destructive/10 rounded-2xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-destructive/20">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    24/7 Emergency Support
                  </h3>
                  <p className="text-muted-foreground">
                    Need immediate assistance? We&apos;re here to help.
                  </p>
                </div>
              </div>
              
              <Dialog open={isEmergencyOpen} onOpenChange={setIsEmergencyOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="lg">
                    Emergency Contact
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Emergency Contact Information</DialogTitle>
                    <DialogDescription>
                      Available 24/7 for urgent assistance
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6">
                    {emergencyContacts.map((contact, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="p-2 rounded-lg bg-muted">
                          <contact.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{contact.title}</h4>
                          {contact.type === "phone" ? (
                            <Link
                              href={`tel:${contact.contact}`}
                              className="text-sm text-primary hover:underline"
                            >
                              {contact.contact}
                            </Link>
                          ) : contact.type === "email" ? (
                            <Link
                              href={`mailto:${contact.contact}`}
                              className="text-sm text-primary hover:underline"
                            >
                              {contact.contact}
                            </Link>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              {contact.contact}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}