"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, Globe2, ArrowRight, MousePointerClick, Plane, Rocket, BookOpen, Target } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Add the ShuffleText component before the main HeroSection component
function ShuffleText() {
  const words = [
    { text: "Explore", icon: Globe2 },
    { text: "Learn", icon: BookOpen },
    { text: "Thrive", icon: Target }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = words[currentIndex].icon;

  return (
    <div className="h-[80px] relative flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={words[currentIndex].text}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{
            y: { type: "spring", stiffness: 100, damping: 20 },
            opacity: { duration: 0.2 }
          }}
          className="absolute flex items-center gap-4"
        >
          <CurrentIcon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-700 dark:text-blue-400" />
          <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 dark:from-blue-400 dark:via-blue-500 dark:to-amber-400 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-bold">
            {words[currentIndex].text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Separate "StudyJetGlobal" from other words
  const words = ["Your", "Journey", "With", "Global", "Education", "Starts", "With"];
  const brandName = "StudyJetGlobal...".split('');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.06 * i,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 80,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 80,
      },
    },
  };

  // Letter animation variants for StudyJetGlobal
  const letterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 1.5,
      },
    },
  };

  const letterChild = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 160,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 160,
      },
    },
  };

  // Floating elements with added jet icons
  const floatingElements = [
    { icon: GraduationCap, color: "text-blue-500", delay: 0 },
    { icon: Plane, color: "text-primary", delay: 0.1, rotate: 45 },
    { icon: Globe2, color: "text-green-500", delay: 0.2 },
    { icon: Plane, color: "text-primary", delay: 0.3, rotate: -45 },
    { icon: GraduationCap, color: "text-purple-500", delay: 0.4 },
    { icon: Plane, color: "text-primary", delay: 0.5, rotate: 90 },
    { icon: Globe2, color: "text-orange-500", delay: 0.6 },
    { icon: Plane, color: "text-primary", delay: 0.7, rotate: -90 },
  ];

  return (
    <section className="relative min-h-[95vh] w-full mb-10 flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
          alt="Background pattern"
          fill
          className="object-cover opacity-[0.45] dark:opacity-[0.4]"
          priority
        />
      </div>

      {/* Animated Background with Grid */}
      <div className="absolute inset-0 z-[2]">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-[40%] left-[20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute -top-[40%] right-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-[40%] left-[30%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Floating Icons - update z-index */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color} z-[3]`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.5, 1, 0.5], 
            y: [0, -20, 0],
            x: index % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
            rotate: element.rotate || 0
          }}
          transition={{
            duration: 5,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            top: `${15 + (index * 12)}%`,
            left: `${15 + (index * 15)}%`,
          }}
        >
          <element.icon className="w-8 h-8" />
        </motion.div>
      ))}

      {/* Main Content - update z-index */}
      <motion.div 
        className="relative z-[4] text-center px-4 max-w-5xl mx-auto"
        style={{ y, opacity }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 flex flex-wrap justify-center gap-x-4"
        >
          {/* Regular words */}
          <motion.div
            className="flex flex-wrap justify-center gap-x-4"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                variants={child}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* StudyJetGlobal with letter animation */}
          <motion.div
            className="bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 dark:from-blue-400 dark:via-blue-500 dark:to-amber-400 bg-clip-text text-transparent"
            variants={letterContainer}
            initial="hidden"
            animate="visible"
          >
            {brandName.map((letter, idx) => (
              <motion.span
                key={idx}
                variants={letterChild}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.h1>

        {/* Add ShuffleText component */}
        <div className="mb-8">
          <ShuffleText />
        </div>

        <motion.p 
          className="text-lg font-semibold md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          Join hundreds of students who have successfully started their international
          education journey with us. Expert guidance, personalized support, and
          a world of opportunities awaits you.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <Button size="lg" className="bg-primary text-primary-foreground" asChild>
            <Link href="/onBoarding/applicationForm">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
                <Link href="/onBoarding/consultationForm">
                  Book Free Consultation
                </Link>
              </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <MousePointerClick className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-2">Scroll to explore</p>
        </motion.div>
      </motion.div>
    </section>
  );
} 