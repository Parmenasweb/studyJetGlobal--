"use client";

import { destinations } from "@/lib/data/destinations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Globe, 
  MapPin, 
  Users, 
  Clock, 
  Briefcase, 
  Building 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DestinationImage } from "@/app/(public)/destinations/components/DestinationImage";

export default function PopularDestinations() {
  // Only show first 6 popular destinations
  const popularDestinations = destinations.slice(0, 6);

  return (
    <section className="py-12 px-4 md:px-12 md:py-20">
      <div className="w-full mx-auto px-4">
        {/* Animated Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            studyjet&apos;s Popular Study Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore top educational destinations worldwide, offering world-class universities 
            and diverse cultural experiences for international students
          </p>
        </motion.div>

        {/* Destinations Grid with Staggered Animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {popularDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative w-full aspect-[4/3]">
                  {destination.media?.mainImage?.url ? (
                    <DestinationImage
                      src={destination.media.mainImage.url}
                      alt={destination.name}
                      fill
                      className="group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-primary/10" />
                  )}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-red-400" />
                      <span>{destination.capital}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">{destination.region}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Key Statistics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-indigo-500" />
                      <span className="text-sm">
                        {destination.overview?.totalUniversities || 'N/A'} Universities
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {destination.overview?.internationalStudents || 'N/A'} Students
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">
                        {destination.overview?.postStudyWork || 'N/A'} Post-Study Work
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">
                        {destination.overview?.workWhileStudying || 'N/A'} Work Rights
                      </span>
                    </div>
                  </div>

                  {/* Popular Programs */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Popular Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.popularPrograms?.slice(0, 3).map((program) => (
                        <Badge 
                          key={program.name}
                          variant="secondary"
                          className="transition-colors hover:bg-secondary/80"
                        >
                          {program.name}
                        </Badge>
                      )) || (
                        <span className="text-sm text-muted-foreground">Programs information coming soon</span>
                      )}
                    </div>
                  </div>

                  {/* Quick Facts */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg. Tuition</span>
                      <span className="font-medium">{destination.overview?.averageTuitionRange || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Acceptance Rate</span>
                      <span className="font-medium">{destination.overview?.averageAcceptanceRate || 'N/A'}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link 
                    href={`/destinations/${destination.id}`}
                    className="block w-full"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Destinations CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-2xl mx-auto p-6 bg-primary/5 dark:bg-primary/10">
            <h3 className="text-xl font-semibold mb-3">
              Discover More Study Destinations
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore all our study destinations and find the perfect location for your educational journey
            </p>
            <Link href="/destinations">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                View All Destinations
                <Globe className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}