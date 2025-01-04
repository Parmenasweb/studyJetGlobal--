"use client";

import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { DestinationCard } from "../dynamicComps/destinationCards";
import { useQuery } from "@tanstack/react-query";
import { unstable_noStore as noStore } from "next/cache";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Globe2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

// Skeleton component for loading state
function ProgramSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 items-center justify-around w-[90%] mx-auto p-8">
      {[1, 2, 3].map((index) => (
        <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="h-48 bg-slate-200 rounded-lg animate-pulse mb-4" />
            <div className="space-y-3">
              <div className="h-6 bg-slate-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="h-10 bg-slate-200 rounded w-1/3 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <Card className="w-[90%] mx-auto p-8 text-center">
      <CardContent className="flex flex-col items-center space-y-4">
        <Globe2 className="h-12 w-12 text-muted-foreground" />
        <CardTitle>No Destinations Available</CardTitle>
        <CardDescription>
          We&apos;re currently updating our destination list. Please check back later.
        </CardDescription>
      </CardContent>
    </Card>
  );
}

// Error component
function ErrorState({ error, refetch }) {
  return (
    <div className="w-[90%] mx-auto p-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="mt-2">
          {error?.message || "Failed to load destinations. Please try again."}
        </AlertDescription>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => refetch()}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </Alert>
    </div>
  );
}

// Main component
export default function Programs() {
  noStore();

  const {
    data: destinations,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/destinations");
        
        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching destinations:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
  });

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center mb-6">
          Explore Your Study Destinations
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Discover world-class educational opportunities in our partner countries.
          Each destination offers unique academic and cultural experiences.
        </p>

        <Suspense fallback={<ProgramSkeleton />}>
          {isLoading ? (
            <ProgramSkeleton />
          ) : isError ? (
            <ErrorState error={error} refetch={refetch} />
          ) : !destinations?.length ? (
            <EmptyState />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch justify-around"
            >
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <DestinationCard
                    destinationName={destination.name}
                    flagUrl={destination.flagUrl}
                    imageUrl={destination.imageUrl}
                    studyCost={destination.stats.averageTuition}
                    accommodationFee={destination.stats.costOfLiving}
                    description={destination.shortDescription}
                    countryId={destination._id}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Suspense>
      </motion.div>
    </section>
  );
}
