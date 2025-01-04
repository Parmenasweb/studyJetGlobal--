"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    university: "University of Toronto",
    program: "Masters in Data Science",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    quote: "The guidance I received made my application process smooth and successful. I&apos;m now pursuing my dream course in Canada!",
    country: "Canada",
  },
  {
    name: "Michael Chen",
    university: "University of Melbourne",
    program: "Bachelor of Engineering",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    quote: "From visa assistance to university selection, every step was well-supported. Highly recommend their services!",
    country: "Australia",
  },
  {
    name: "Priya Patel",
    university: "University College London",
    program: "MSc in Business Analytics",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    quote: "Their scholarship guidance helped me secure funding for my studies. I&apos;m grateful for their expert support.",
    country: "UK",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our students who have successfully achieved their study abroad dreams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                      <p className="text-muted-foreground text-sm">{testimonial.program}</p>
                      <p className="text-primary font-medium">{testimonial.university}</p>
                      <Badge variant="secondary" className="mt-2">
                        {testimonial.country}
                      </Badge>
                    </div>
                    <Quote className="h-8 w-8 text-primary/20" />
                    <p className="text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
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