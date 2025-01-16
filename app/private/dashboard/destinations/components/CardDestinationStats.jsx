"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  Building2,
  School,
  Award,
  Users,
  Briefcase,
  Globe,
  TrendingUp,
  DollarSign,
  BookOpen,
  Plane,
  CheckCircle,
} from "lucide-react";

export default function CardDestinationStats({ destinations }) {
  // Calculate total statistics
  const totalStats = destinations.reduce(
    (acc, dest) => {
      // Universities and Programs
      const universities = dest.universities?.length || 0;
      const activeUniversities = dest.universities?.filter(
        (uni) => uni.status === "active"
      ).length || 0;
      const programs = dest.universities?.reduce(
        (sum, uni) => sum + (uni.programs?.length || 0),
        0
      ) || 0;
      const scholarships = dest.universities?.reduce(
        (sum, uni) => sum + (uni.scholarships?.length || 0),
        0
      ) || 0;

      // Financial Stats
      const avgTuition = dest.studyInfo?.averageTuitionFee || 0;
      const avgLivingCost = dest.quickFacts?.averageCostOfLiving || 0;

      acc.universities += universities;
      acc.activeUniversities += activeUniversities;
      acc.programs += programs;
      acc.scholarships += scholarships;
      acc.totalTuition += avgTuition;
      acc.totalLivingCost += avgLivingCost;

      return acc;
    },
    { 
      universities: 0, 
      activeUniversities: 0, 
      programs: 0, 
      scholarships: 0,
      totalTuition: 0,
      totalLivingCost: 0
    }
  );

  // Calculate averages for rates
  const averageRates = destinations.reduce(
    (acc, dest) => {
      if (dest.statistics) {
        acc.satisfaction += dest.statistics.studentSatisfactionRate || 0;
        acc.employment += dest.statistics.employmentRate || 0;
        acc.visa += dest.statistics.visaSuccessRate || 0;
        acc.international += dest.statistics.internationalStudentRatio || 0;
      }
      return acc;
    },
    { satisfaction: 0, employment: 0, visa: 0, international: 0 }
  );

  const destCount = destinations.length;
  const avgTuition = Math.round(totalStats.totalTuition / destCount);
  const avgLivingCost = Math.round(totalStats.totalLivingCost / destCount);
  
  averageRates.satisfaction = Math.round(averageRates.satisfaction / destCount);
  averageRates.employment = Math.round(averageRates.employment / destCount);
  averageRates.visa = Math.round(averageRates.visa / destCount);
  averageRates.international = Math.round(averageRates.international / destCount);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-8">
      {/* Destination and University Stats */}
      <Card className="p-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Destinations</CardTitle>
          <Globe className="h-6 w-6 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{destCount}</div>
          <p className="text-xs text-muted-foreground">
            Active study destinations
          </p>
        </CardContent>
      </Card>

      <Card className="p-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Universities</CardTitle>
          <Building2 className="h-6 w-6 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{totalStats.universities}</div>
          <div className="flex items-center space-x-2">
            <Progress
              value={
                (totalStats.activeUniversities / totalStats.universities) * 100
              }
              className="h-2"
            />
            <span className="text-xs text-muted-foreground">
              {totalStats.activeUniversities} active
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="p-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Programs</CardTitle>
          <BookOpen className="h-6 w-6 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{totalStats.programs}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round(totalStats.programs / totalStats.universities)} avg. per university
          </p>
        </CardContent>
      </Card>

      <Card className="p-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Scholarships</CardTitle>
          <Award className="h-6 w-6 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{totalStats.scholarships}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round(totalStats.scholarships / totalStats.universities)} avg. per university
          </p>
        </CardContent>
      </Card>

      {/* Cost Statistics */}
      <Card className="p-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Tuition Fee</CardTitle>
          <DollarSign className="h-6 w-6 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            ${avgTuition.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Per year</p>
        </CardContent>
      </Card>

      <Card className="p-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Living Cost</CardTitle>
          <Briefcase className="h-6 w-6 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            ${avgLivingCost.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Per year</p>
        </CardContent>
      </Card>

      {/* Success Rates */}
      <Card className="p-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visa Success Rate</CardTitle>
          <Plane className="h-6 w-6 text-sky-500" />
        </CardHeader>
        <CardContent>
            <div className="text-xl font-bold">{averageRates.visa}%</div>
          <Progress value={averageRates.visa} className="h-2" />
        </CardContent>
      </Card>

      <Card className="p-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Employment Rate</CardTitle>
          <CheckCircle className="h-6 w-6 text-teal-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{averageRates.employment}%</div>
          <Progress value={averageRates.employment} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
} 