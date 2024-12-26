"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinanceStore } from "../../store/finance-store";
import { formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Wallet,
  PieChart,
} from "lucide-react";

export function FinanceMetrics() {
  const { finance } = useFinanceStore();

  const metrics = [
    {
      title: "Total Revenue",
      value: formatCurrency(finance?.totalRevenue),
      change: "+20.1%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(finance?.totalExpenses),
      change: "+12.5%",
      icon: TrendingDown,
      trend: "down",
    },
    {
      title: "Net Profit",
      value: formatCurrency(finance?.netProfit),
      change: "+32.5%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Revenue per Student",
      value: formatCurrency(finance?.revenuePerStudent),
      change: "+5.2%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Operational Costs",
      value: formatCurrency(finance?.operationalCosts),
      change: "-2.5%",
      icon: Wallet,
      trend: "down",
    },
    {
      title: "Profit Margin",
      value: `${finance?.profitMargin.toFixed(1)}%`,
      change: "+3.2%",
      icon: PieChart,
      trend: "up",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  metric.trend === "up"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {metric.change}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 