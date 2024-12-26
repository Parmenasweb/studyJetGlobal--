"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Users, 
  GraduationCap, 
  Building2, 
  Globe, 
  DollarSign, 
  BarChart, 
  MapPin,
  Flag,
  Languages,
  Coins,
  Sun,
  School
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CardDestinationOverview({ destination }) {
  const router = useRouter();

  const stats = [
    {
      label: "Student Satisfaction",
      value: `${destination?.statistics?.studentSatisfactionRate}%`,
      icon: Users,
    },
    {
      label: "Employment Rate",
      value: `${destination?.statistics?.employmentRate}%`,
      icon: BarChart,
    },
    {
      label: "Int'l Students",
      value: `${destination?.statistics?.internationalStudentRatio}%`,
      icon: Globe,
    },
  ];

  const quickFacts = [
    {
      label: "Population",
      value: destination?.quickFacts?.population,
      icon: Users,
    },
    {
      label: "Language",
      value: destination?.quickFacts?.language,
      icon: Languages,
    },
    {
      label: "Currency",
      value: destination?.quickFacts?.currency,
      icon: Coins,
    },
    {
      label: "Climate",
      value: destination?.quickFacts?.climateInfo,
      icon: Sun,
    },
  ];

  const studyInfo = [
    {
      label: "Avg. Tuition",
      value: `$${destination?.studyInfo?.averageTuitionFee?.toLocaleString()}/year`,
      icon: DollarSign,
    },
    {
      label: "Academic Year",
      value: destination?.studyInfo?.academicYear,
      icon: School,
    },
    {
      label: "Living Cost",
      value: `$${destination?.quickFacts?.averageCostOfLiving?.toLocaleString()}/year`,
      icon: Building2,
    },
  ];

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          {destination?.media?.mainImage ? (
            <Image
              src={destination?.media?.mainImage}
              alt={destination?.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <MapPin className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white">
                {destination?.media?.flagImage ? (
                  <Image
                    src={destination?.media?.flagImage}
                    alt={`${destination?.name} flag`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Flag className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                    {destination?.name}
                </h3>
                <p className="text-sm text-white/80">{destination?.capital}</p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="grid gap-4 p-4">
        <div className="grid grid-cols-3 gap-2">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg bg-muted p-2 text-center"
            >
              <stat.icon className="mb-1 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Quick Facts</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickFacts.map((fact, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md bg-muted/50 p-2"
              >
                <fact.icon className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{fact.label}</p>
                  <p className="text-sm font-medium truncate">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Study Information</h4>
          <div className="grid grid-cols-2 gap-2">
            {studyInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md bg-muted/50 p-2"
              >
                <info.icon className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className="text-sm font-medium truncate">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Popular Programs</h4>
          <div className="flex flex-wrap gap-1">
            {destination?.studyInfo?.popularPrograms?.slice(0, 3).map((program, index) => (
              <Badge key={index} variant="secondary">
                {program}
              </Badge>
            ))}
            {destination?.studyInfo?.popularPrograms?.length > 3 && (
              <Badge variant="outline">
                +{destination?.studyInfo?.popularPrograms?.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push(`/private/dashboard/destinations/${destination._id}`)}
        >
          View Details
        </Button>
        <Button
          variant="default"
          className="w-full"
          onClick={() => router.push(`/private/dashboard/destinations/${destination._id}/edit`)}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
} 