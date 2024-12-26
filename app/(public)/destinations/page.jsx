"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, Users, GraduationCap } from "lucide-react";

const destinations = [
  {
    country: "United States",
    image: "/images/destinations/usa.jpg",
    description: "Home to world-renowned universities and diverse opportunities",
    stats: {
      universities: "4,000+",
      students: "1M+",
      ranking: "#1",
    },
    popular: ["Harvard", "MIT", "Stanford"],
  },
  {
    country: "United Kingdom",
    image: "/images/destinations/uk.jpg",
    description: "Rich academic heritage with prestigious institutions",
    stats: {
      universities: "150+",
      students: "500K+",
      ranking: "#2",
    },
    popular: ["Oxford", "Cambridge", "LSE"],
  },
  {
    country: "Canada",
    image: "/images/destinations/canada.jpg",
    description: "High quality of life and excellent education system",
    stats: {
      universities: "100+",
      students: "400K+",
      ranking: "#3",
    },
    popular: ["Toronto", "UBC", "McGill"],
  },
  {
    country: "Australia",
    image: "/images/destinations/australia.jpg",
    description: "World-class education in a beautiful environment",
    stats: {
      universities: "43",
      students: "300K+",
      ranking: "#4",
    },
    popular: ["Melbourne", "Sydney", "ANU"],
  },
];

export default function DestinationsPage() {
  return (
    <div className="w-[98%] mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Study Abroad Destinations
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore top study destinations and find your perfect fit for higher education
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {[
          { icon: Globe, label: "Countries", value: "50+" },
          { icon: GraduationCap, label: "Universities", value: "5,000+" },
          { icon: Users, label: "Students", value: "2M+" },
          { icon: MapPin, label: "Cities", value: "500+" },
        ].map((stat, index) => (
          <Card key={index} className="p-6 text-center">
            <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {destinations.map((destination, index) => (
          <motion.div
            key={destination.country}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                {/* Add Image component when images are available */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">{destination.country}</h3>
                  <p className="text-sm text-white/80">{destination.description}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(destination.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-lg font-bold">{value}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {key}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Popular Universities:</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.popular.map((uni) => (
                      <div
                        key={uni}
                        className="text-xs px-2 py-1 bg-muted rounded-full"
                      >
                        {uni}
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full mt-6">Learn More</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-muted-foreground mb-6">
            Get personalized guidance on choosing the perfect study destination for
            your academic goals.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="/application-guide">View Application Guide</a>
            </Button>
            <Button asChild>
              <a href="/consultation">Book a Consultation</a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 