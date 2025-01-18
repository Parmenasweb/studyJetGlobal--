"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nathaniel Tengbeh",
    university: "San Francisco State University",
    program: "Masters in Computer Science",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nathaniel",
    quote: "StudyJetGlobal helped me secure admission and a partial scholarship at UBC. Their counselors provided step-by-step guidance throughout.",
    country: "Canada",
  },
  {
    name: "Joshua Bawo",
    university: "Monash University",
    program: "Bachelor of Nursing",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    quote: "The visa application process was seamless with their expert assistance. Now I'm living my dream of studying healthcare in Australia!",
    country: "Australia",
  },
  {
    name: "Fatimah Bakare",
    university: "University of Manchester",
    program: "MSc in Finance",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatimah",
    quote: "From IELTS preparation to university shortlisting, their comprehensive support made my journey stress-free.",
    country: "UK",
  },
  {
    name: "Michael Nweke",
    university: "University of Auckland",
    program: "PhD in Environmental Science",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    quote: "Their scholarship matching service helped me find and secure full funding for my doctoral studies.",
    country: "New Zealand",
  },
  {
    name: "Prince Monnaessi",
    university: "Trinity College Dublin",
    program: "MA in Digital Marketing",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prince",
    quote: "The pre-departure orientation and accommodation support made my transition to Ireland incredibly smooth.",
    country: "Ireland",
  },
  {
    name: "Pollard Kante  ",
    university: "Technical University of Munich",
    program: "MSc in Mechanical Engineering",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pollard",
    quote: "Their German university application expertise and language preparation guidance was invaluable.",
    country: "Germany",
  }
];

export default function SuccessStories() {
  return (
    <section className="py-12">
      <div className="w-[95%] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3">Success Stories</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Hear from our students who have successfully achieved their study abroad dreams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                      <p className="text-muted-foreground text-xs">{testimonial.program}</p>
                      <p className="text-primary text-sm font-medium">{testimonial.university}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {testimonial.country}
                      </Badge>
                    </div>
                    <Quote className="h-6 w-6 text-primary/20" />
                    <p className="text-muted-foreground text-sm italic">&quot;{testimonial.quote}&quot;</p>
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