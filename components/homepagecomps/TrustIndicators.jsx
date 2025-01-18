"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  Award,
  Globe,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

// Animated counter hook
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime;
      const startValue = 0;
      
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * (end - startValue) + startValue));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [end, duration, inView]);

  return [count, ref];
}

const stats = [
  {
    icon: Users,
    label: "Students Placed",
    value: 200,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: GraduationCap,
    label: "University Partners",
    value: 100,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    icon: Award,
    label: "Scholarships Secured",
    value: 70,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/20",
  },
  {
    icon: Globe,
    label: "Countries Served",
    value: 12,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/20",
  },
];

const achievements = [
  {
    icon: CheckCircle2,
    title: "95% Visa Success Rate",
    description: "Proven track record of successful visa applications",
  },
  {
    icon: TrendingUp,
    title: "90% Admission Rate",
    description: "High success rate in university admissions",
  },
];

const partnerLogos = [
  // Add your partner university logos here
  // Example:
  // { src: "/logos/university1.png", alt: "University 1" },
];

export default function TrustIndicators() {
  // Initialize counters individually to avoid using hooks in callbacks
  const [studentsCount, studentsRef] = useCounter(stats[0].value);
  const [partnersCount, partnersRef] = useCounter(stats[1].value);
  const [scholarshipsCount, scholarshipsRef] = useCounter(stats[2].value);
  const [countriesCount, countriesRef] = useCounter(stats[3].value);

  // Array of counter values and refs that matches stats array order
  const counters = [
    [studentsCount, studentsRef],
    [partnersCount, partnersRef],
    [scholarshipsCount, scholarshipsRef],
    [countriesCount, countriesRef]
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="w-[95%] mx-auto px-2">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by Students Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Our track record speaks for itself
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const [count, ref] = counters[index];
            
            return (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div ref={ref}>
                  <h3 className="text-3xl font-bold mb-2">{count}+</h3>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="p-3 rounded-xl bg-primary/10">
                <achievement.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 items-center"
        >
          {partnerLogos.map((logo, index) => (
            <div
              key={index}
              className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 