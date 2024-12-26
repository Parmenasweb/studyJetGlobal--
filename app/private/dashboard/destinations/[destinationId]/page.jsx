"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, School, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDestination } from "@/actions/destination";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DestinationDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDestination();
  }, [params.destinationId]);

  async function fetchDestination() {
    try {
      setIsLoading(true);
      const data = await getDestination(params.destinationId);
      setDestination(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch destination. Please try again.",
        variant: "destructive",
      });
      router.push("/private/dashboard/destinations");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="gap-2" disabled>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[600px]" />
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Destination Not Found</h1>
          <p className="text-muted-foreground">
            The destination you are looking for does not exist.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {destination.name}
            </h2>
            <p className="text-muted-foreground">
              {destination.capital}, {destination.countryCode}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push(`/private/dashboard/destinations/${destination._id}/universities`)}
          >
            <School className="h-4 w-4" /> Universities
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push(`/private/dashboard/destinations/${destination._id}/scholarships`)}
          >
            <GraduationCap className="h-4 w-4" /> Scholarships
          </Button>
          <Button
            className="gap-2"
            onClick={() => router.push(`/private/dashboard/destinations/${destination._id}/edit`)}
          >
            <Edit className="h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Status and Media */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={
                  destination.status === "active"
                    ? "success"
                    : destination.status === "draft"
                    ? "secondary"
                    : "destructive"
                }
              >
                {destination.status}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {destination.media?.mainImage && (
                <div className="relative h-40 w-full overflow-hidden rounded-lg">
                  <Image
                    src={destination.media.mainImage}
                    alt={`${destination.name} banner`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {destination.media?.flagImage && (
                <div className="relative h-20 w-40 overflow-hidden rounded-lg">
                  <Image
                    src={destination.media.flagImage}
                    alt={`${destination.name} flag`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{destination.description}</p>
          </CardContent>
        </Card>

        {/* Quick Facts and Study Info */}
        <Tabs defaultValue="quick-facts">
          <TabsList>
            <TabsTrigger value="quick-facts">Quick Facts</TabsTrigger>
            <TabsTrigger value="study-info">Study Information</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="quick-facts">
            <Card>
              <CardContent className="pt-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="font-medium">Population</dt>
                    <dd className="text-muted-foreground">
                      {destination.quickFacts?.population}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Language</dt>
                    <dd className="text-muted-foreground">
                      {destination.quickFacts?.language}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Currency</dt>
                    <dd className="text-muted-foreground">
                      {destination.quickFacts?.currency}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Average Cost of Living</dt>
                    <dd className="text-muted-foreground">
                      ${destination.quickFacts?.averageCostOfLiving?.toLocaleString()} USD/year
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="font-medium">Climate Information</dt>
                    <dd className="text-muted-foreground">
                      {destination.quickFacts?.climateInfo}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="study-info">
            <Card>
              <CardContent className="pt-6">
                <dl className="grid gap-6">
                  <div>
                    <dt className="font-medium">Average Tuition Fee</dt>
                    <dd className="text-muted-foreground">
                      ${destination.studyInfo?.averageTuitionFee?.toLocaleString()} USD/year
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Academic Year</dt>
                    <dd className="text-muted-foreground">
                      {destination.studyInfo?.academicYear}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Major Cities</dt>
                    <dd className="flex flex-wrap gap-2 mt-2">
                      {destination.studyInfo?.majorCities?.map((city) => (
                        <Badge key={city} variant="secondary">
                          {city}
                        </Badge>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Popular Programs</dt>
                    <dd className="flex flex-wrap gap-2 mt-2">
                      {destination.studyInfo?.popularPrograms?.map((program) => (
                        <Badge key={program} variant="secondary">
                          {program}
                        </Badge>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Admission Requirements</dt>
                    <dd className="mt-2">
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        {destination.studyInfo?.admissionRequirements?.map((req) => (
                          <li key={req}>{req}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Visa Requirements</dt>
                    <dd className="mt-2">
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        {destination.studyInfo?.visaRequirements?.map((req) => (
                          <li key={req}>{req}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <Card>
              <CardContent className="pt-6">
                <dl className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <dt className="font-medium">Student Satisfaction Rate</dt>
                    <dd className="text-2xl font-bold">
                      {destination.statistics?.studentSatisfactionRate}%
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Employment Rate</dt>
                    <dd className="text-2xl font-bold">
                      {destination.statistics?.employmentRate}%
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">International Student Ratio</dt>
                    <dd className="text-2xl font-bold">
                      {destination.statistics?.internationalStudentRatio}%
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Gallery */}
        {destination.media?.galleryImages?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {destination.media.galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-40 w-full overflow-hidden rounded-lg"
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 