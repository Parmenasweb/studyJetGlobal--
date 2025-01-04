"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Edit, 
  School, 
  GraduationCap, 
  Building2, 
  Award,
  Globe,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Languages,
  Coins,
  Thermometer,
  Clock,
  FileTextIcon
} from "lucide-react";
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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <div className="grid gap-6 md:grid-cols-2">
              <Skeleton className="h-[200px] rounded-xl" />
              <Skeleton className="h-[200px] rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
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
    <div className="min-h-screen bg-background">
      {/* Hero Section with Main Image */}
      <div className="relative h-[400px] lg:h-[500px]">
        {destination.media?.mainImage?.url ? (
          <Image
            src={destination.media.mainImage.url}
            alt={destination.media.mainImage.alt || destination.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
        <div className="container mx-auto relative h-full px-4 sm:px-6 lg:px-8">
          <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8">
            <Button
              variant="outline"
              size="sm"
              className="mb-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {destination.name}
                </h1>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="h-4 w-4" />
                  <p>{destination.capital}, {destination.countryCode}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                  onClick={() => router.push(`/private/dashboard/destinations/${destination._id}/universities`)}
                >
                  <School className="h-4 w-4" /> Universities
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                  onClick={() => router.push(`/private/dashboard/destinations/${destination._id}/edit`)}
                >
                  <Edit className="h-4 w-4" /> Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Card */}
            <Card>
              <CardHeader>
                <CardTitle>About {destination.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {destination.description}
                </p>
              </CardContent>
            </Card>

            {/* Quick Facts Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <QuickFactItem
                    icon={<Users className="h-4 w-4" />}
                    label="Population"
                    value={destination.quickFacts?.population}
                  />
                  <QuickFactItem
                    icon={<Languages className="h-4 w-4" />}
                    label="Language"
                    value={destination.quickFacts?.language}
                  />
                  <QuickFactItem
                    icon={<Coins className="h-4 w-4" />}
                    label="Currency"
                    value={destination.quickFacts?.currency}
                  />
                  <QuickFactItem
                    icon={<DollarSign className="h-4 w-4" />}
                    label="Cost of Living"
                    value={`$${destination.quickFacts?.averageCostOfLiving?.toLocaleString()} USD/year`}
                  />
                  <QuickFactItem
                    icon={<Thermometer className="h-4 w-4" />}
                    label="Climate"
                    value={destination.quickFacts?.climateInfo}
                    colSpan={true}
                  />
                  <QuickFactItem
                    icon={<Clock className="h-4 w-4" />}
                    label="Time Zone"
                    value={destination.quickFacts?.timeZone}
                  />
                  <QuickFactItem
                    icon={<FileTextIcon className="h-4 w-4" />}
                    label="Visa Processing"
                    value={destination.quickFacts?.visaProcessingTime}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Study Information */}
            <Card>
              <CardHeader>
                <CardTitle>Study Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <QuickFactItem
                      icon={<DollarSign className="h-4 w-4" />}
                      label="Average Tuition"
                      value={`$${destination.studyInfo?.averageTuitionFee?.toLocaleString()} USD/year`}
                    />
                    <QuickFactItem
                      icon={<Calendar className="h-4 w-4" />}
                      label="Academic Year"
                      value={destination.studyInfo?.academicYear}
                    />
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Major Cities</h3>
                    <div className="flex flex-wrap gap-2">
                      {destination.studyInfo?.majorCities?.map((city) => (
                        <Badge key={city} variant="secondary">
                          {city}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Popular Programs</h3>
                    <div className="flex flex-wrap gap-2">
                      {destination.studyInfo?.popularPrograms?.map((program) => (
                        <Badge key={program} variant="secondary">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <h3 className="font-medium mb-3">Work Permit Information</h3>
                      <p className="text-muted-foreground">
                        {destination.studyInfo?.workPermitInfo}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3">PR Eligibility</h3>
                      <p className="text-muted-foreground">
                        {destination.studyInfo?.prEligibility}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Status Card */}
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
                  className="w-full justify-center py-2 text-sm"
                >
                  {destination.status.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>

            {/* Statistics Card */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StatItem
                  label="Student Satisfaction"
                  value={destination.statistics?.studentSatisfactionRate}
                  suffix="%"
                />
                <StatItem
                  label="Employment Rate"
                  value={destination.statistics?.employmentRate}
                  suffix="%"
                />
                <StatItem
                  label="International Students"
                  value={destination.statistics?.internationalStudentRatio}
                  suffix="%"
                />
                <StatItem
                  label="Visa Success Rate"
                  value={destination.statistics?.visaSuccessRate}
                  suffix="%"
                />
              </CardContent>
            </Card>

            {/* Media Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Flag Image */}
                {destination.media?.flagImage?.url && (
                  <div className="relative h-40 w-full overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={destination.media.flagImage.url}
                      alt={destination.media.flagImage.alt || `${destination.name} flag`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Gallery Grid */}
                {destination.media?.galleryImages?.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {destination.media.galleryImages.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
                      >
                        <Image
                          src={image.url}
                          alt={image.alt || `${destination.name} gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        {image.caption && (
                          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="p-2 text-xs text-white">
                              {image.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Video */}
                {destination.media?.videoUrl && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={destination.media.videoUrl}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function QuickFactItem({ icon, label, value, colSpan }) {
  if (!value) return null;
  return (
    <div className={colSpan ? "sm:col-span-2" : ""}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h4 className="font-medium">{label}</h4>
      </div>
      <p className="text-muted-foreground">{value}</p>
    </div>
  );
}

function StatItem({ label, value, suffix = "" }) {
  if (!value && value !== 0) return null;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-medium">
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
} 