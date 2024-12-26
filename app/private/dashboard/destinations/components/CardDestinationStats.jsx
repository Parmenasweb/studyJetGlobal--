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
} from "lucide-react";

export default function CardDestinationStats({ destinations }) {
  // Calculate total statistics
  const totalStats = destinations.reduce(
    (acc, dest) => {
      acc.universities += dest.universities?.length || 0;
      acc.activeUniversities += dest.universities?.filter(
        (uni) => uni.status === "active"
      ).length || 0;
      acc.programs += dest.universities?.reduce(
        (sum, uni) => sum + (uni.programs?.length || 0),
        0
      );
      acc.scholarships += dest.universities?.reduce(
        (sum, uni) => sum + (uni.scholarships?.length || 0),
        0
      );
      return acc;
    },
    { universities: 0, activeUniversities: 0, programs: 0, scholarships: 0 }
  );

  // Calculate averages for rates
  const averageRates = destinations.reduce(
    (acc, dest) => {
      if (dest.statistics) {
        acc.satisfaction += dest.statistics.studentSatisfactionRate || 0;
        acc.employment += dest.statistics.employmentRate || 0;
        acc.international += dest.statistics.internationalStudentRatio || 0;
      }
      return acc;
    },
    { satisfaction: 0, employment: 0, international: 0 }
  );

  const destCount = destinations.length;
  averageRates.satisfaction = Math.round(averageRates.satisfaction / destCount);
  averageRates.employment = Math.round(averageRates.employment / destCount);
  averageRates.international = Math.round(averageRates.international / destCount);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Statistics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Destinations</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{destCount}</div>
          <p className="text-xs text-muted-foreground">
            Active study destinations
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Universities</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStats.universities}</div>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
          <School className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStats.programs}</div>
          <p className="text-xs text-muted-foreground">
            Across all universities
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Scholarships</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStats.scholarships}</div>
          <p className="text-xs text-muted-foreground">
            Available opportunities
          </p>
        </CardContent>
      </Card>

      {/* Rate Statistics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Student Satisfaction
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRates.satisfaction}%</div>
          <Progress value={averageRates.satisfaction} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Employment Rate</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRates.employment}%</div>
          <Progress value={averageRates.employment} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            International Students
          </CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRates.international}%</div>
          <Progress value={averageRates.international} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12.5%</div>
          <Progress value={12.5} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
} 