

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { 
  Users, 
  GraduationCap, 
  Clock, 
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Download
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  CardSkeleton, 
  ChartSkeleton 
} from "@/components/skeletons";
import { 
  cardData, 
  revenueData, 
  recentApplications, 
  statistics,
  performanceMetrics,
  destinationStats
} from "./constants/dashboard-data";
import { OverviewChart } from "./components/charts/OverviewChart";
import { StatsDonutChart } from "./components/charts/StatsDonutChart";

// Card icons mapping
const cardIcons = {
  students: <Users className="h-4 w-4" />,
  applications: <GraduationCap className="h-4 w-4" />,
  deadlines: <Clock className="h-4 w-4" />,
  revenue: <DollarSign className="h-4 w-4" />,
};

// Prepare data for donut charts
const applicationData = [
  { name: "Completed", value: statistics.applicationSuccess },
  { name: "In Progress", value: 100 - statistics.applicationSuccess },
];

const deadlineData = [
  { name: "Completed", value: statistics.deadlineCompletion },
  { name: "Pending", value: 100 - statistics.deadlineCompletion },
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 ml-[6%]">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Your business performance overview
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      <Suspense 
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card, i) => (
            <Card key={i} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">{card.title}</p>
                <div className="rounded-full p-2 bg-primary/10">
                  {cardIcons[card.type]}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {card.type === 'revenue' 
                      ? new Intl.NumberFormat('en-US', { 
                          style: 'currency', 
                          currency: 'USD',
                          maximumFractionDigits: 0
                        }).format(card.value)
                      : card.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Suspense fallback={<ChartSkeleton className="col-span-4" />}>
          <OverviewChart data={revenueData} />
        </Suspense>

        <Card className="col-span-3 p-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Recent Applications</h3>
            <p className="text-sm text-muted-foreground">
              Latest student applications and their status
            </p>
          </div>
          <div className="mt-4 space-y-4">
            {recentApplications.map((application, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{application.name}</p>
                  <p className="text-xs text-muted-foreground">{application.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {new Intl.NumberFormat('en-US', { 
                      style: 'currency', 
                      currency: 'USD' 
                    }).format(application.amount)}
                  </p>
                  <p className={`text-xs ${
                    application.status === 'completed' 
                      ? 'text-green-500' 
                      : application.status === 'in_progress'
                      ? 'text-blue-500'
                      : 'text-yellow-500'
                  }`}>
                    {application.status.replace('_', ' ').toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsDonutChart 
          data={applicationData}
          title="Application Success"
          subtitle="Overall application completion rate"
        />

        <StatsDonutChart 
          data={deadlineData}
          title="Deadline Progress"
          subtitle="Overall deadline completion rate"
        />

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Top Destinations</h3>
          <div className="space-y-4">
            {destinationStats.slice(0, 5).map((destination, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{destination.country}</p>
                  <p className="text-xs text-muted-foreground">
                    {destination.count} applications
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{destination.percentage}%</p>
                  <div className="w-20 h-2 bg-muted rounded-full mt-1">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${destination.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
