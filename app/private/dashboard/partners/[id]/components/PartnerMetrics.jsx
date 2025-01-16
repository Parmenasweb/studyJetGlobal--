"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BarChart3, DollarSign, Calendar } from "lucide-react";
import { format } from "date-fns";

export function PartnerMetrics({ partnerId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const response = await fetch(`/api/partners/${partnerId}/stats`);
        if (!response.ok) {
          throw new Error("Failed to load partner statistics");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [partnerId]);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const metrics = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      description: "Total number of referred students",
    },
    {
      title: "Active Students",
      value: stats.activeStudents,
      icon: Users,
      description: "Currently enrolled students",
    },
    {
      title: "Total Commission",
      value: `$${stats.totalCommission.toFixed(2)}`,
      icon: DollarSign,
      description: "Total commission earned",
    },
    {
      title: "Pending Commission",
      value: `$${stats.pendingCommission.toFixed(2)}`,
      icon: DollarSign,
      description: "Commission pending payment",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {stats.monthlyStats.map((month) => (
              <div key={month.month} className="flex items-center">
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">
                    {format(new Date(month.month), "MMMM yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {month.newStudents} new students
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  ${month.commission.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Student Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {Object.entries(stats.statusDistribution).map(([status, count]) => (
              <div key={status} className="flex items-center">
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none capitalize">
                    {status}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {count} students
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {((count / stats.totalStudents) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}