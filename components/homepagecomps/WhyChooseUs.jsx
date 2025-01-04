"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Globe2,
  Users,
  Award,
  BookOpen,
  Headphones,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description: "Personalized counseling from experienced education consultants",
  },
  {
    icon: Globe2,
    title: "Global Network",
    description: "Partnerships with top universities across multiple countries",
  },
  {
    icon: Users,
    title: "Student Community",
    description: "Join a network of international students and alumni",
  },
  {
    icon: Award,
    title: "Scholarship Support",
    description: "Access to exclusive scholarship opportunities and application assistance",
  },
  {
    icon: BookOpen,
    title: "Program Variety",
    description: "Wide range of courses and specializations to choose from",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance throughout your application journey",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive support to make your study abroad journey smooth and successful
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 