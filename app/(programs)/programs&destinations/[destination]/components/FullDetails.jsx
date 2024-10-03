"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

export default function FullDetailsTabs({ tabContent, name }) {
  const [activeTab, setActiveTab] = useState("application");
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = contentRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  //   const tabContent = {
  //     "why-usa": {
  //       title: "Reasons for Considering the United States",
  //       content: [
  //         {
  //           subtitle: "1. World-Class Education:",
  //           text: "The United States is home to some of the world's top universities and academic institutions, offering a wide range of programs and degrees in different fields.",
  //         },
  //         {
  //           subtitle: "2. Diverse Cultural Environment:",
  //           text: "The US is a culturally diverse country with a melting pot of people from all over the world. This provides international students with a unique opportunity to broaden their perspectives and interact with people from different cultures.",
  //         },
  //         {
  //           subtitle: "3. Cutting-Edge Technology and Research:",
  //           text: "The US is at the forefront of many fields, including technology, science, and engineering. International students who study in the US have access to cutting-edge technology and state-of-the-art research facilities.",
  //         },
  //       ],
  //     },
  //     "student-guide": {
  //       title: "Student Guide for International Students",
  //       content: [
  //         {
  //           subtitle: "1. Accommodation:",
  //           text: "Learn about on-campus housing options and off-campus apartments. Consider factors like proximity to campus, safety, and cost.",
  //         },
  //         {
  //           subtitle: "2. Healthcare:",
  //           text: "Understand the US healthcare system and ensure you have appropriate health insurance coverage during your stay.",
  //         },
  //         {
  //           subtitle: "3. Transportation:",
  //           text: "Familiarize yourself with local public transportation options and consider whether you'll need a car depending on your location.",
  //         },
  //       ],
  //     },
  //     application: {
  //       title: "Application Process for International Students",
  //       content: [
  //         {
  //           subtitle: "1. Choose Your Programs:",
  //           text: "Research and select the universities and programs that best fit your academic goals and interests.",
  //         },
  //         {
  //           subtitle: "2. Prepare Required Documents:",
  //           text: "Gather transcripts, test scores (like TOEFL or IELTS), letters of recommendation, and write a compelling personal statement.",
  //         },
  //         {
  //           subtitle: "3. Submit Applications:",
  //           text: "Pay attention to application deadlines and submit all required materials through the appropriate channels for each university.",
  //         },
  //       ],
  //     },
  //   };

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col w-full">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
        Study in {name} for International Students
      </h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <TabsList className="md:w-1/4 bg-purple-100 rounded-lg p-2 flex flex-row md:flex-col">
            {Object.keys(tabContent).map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-3 px-4 text-left transition-all duration-500 ease-in-out ${
                  activeTab === tab
                    ? "bg-purple-500 text-white rounded-md shadow-md"
                    : "hover:bg-purple-200"
                }`}
              >
                {tab
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </TabsTrigger>
            ))}
          </TabsList>
          <div
            className="md:w-[80%] w-full bg-teal-50 rounded-lg p-6"
            ref={contentRef}
          >
            <AnimatePresence mode="wait">
              {Object.entries(tabContent).map(([key, { title, content }]) => (
                <TabsContent key={key} value={key} className="p-0 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      y: isVisible ? 0 : 20,
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <h2 className="text-2xl font-semibold mb-5 text-teal-700">
                      {title}
                    </h2>
                    {content.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-4"
                      >
                        <h3 className="text-lg font-medium text-purple-600">
                          {item.subtitle}
                        </h3>
                        <p className="text-gray-700">{item.text}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
