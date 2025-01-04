"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 bg-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Begin Your International Education Journey?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Take the first step towards your dream education. Our expert counselors are here to guide you through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/onBoarding/applicationForm">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto font-semibold"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/onBoarding/consultationForm">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto font-semibold bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  Book a Consultation
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                What We Offer
              </h3>
              <ul className="space-y-3 text-primary-foreground/90">
                <li className="flex items-center">
                  • Free initial consultation
                </li>
                <li className="flex items-center">
                  • Personalized university selection
                </li>
                <li className="flex items-center">
                  • Application assistance
                </li>
                <li className="flex items-center">
                  • Visa guidance
                </li>
                <li className="flex items-center">
                  • Scholarship support
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 