"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Loader2 } from "lucide-react";

export function Overview({ data = [], isLoading = false, error = null }) {
  if (isLoading) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {error.message || "Failed to load chart data"}
        </p>
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <p className="text-sm text-muted-foreground">No data available</p>
      </div>
    );
  }

  // Ensure all data points have revenue and expenses values
  const validData = data.map(item => ({
    name: item.name || "",
    revenue: typeof item.revenue === 'number' ? item.revenue : 0,
    expenses: typeof item.expenses === 'number' ? item.expenses : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={validData}>
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity={0.25} />
            <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity={0.25} />
            <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Revenue
                      </span>
                      <span className="font-bold text-emerald-500">
                        {payload[0].value.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Expenses
                      </span>
                      <span className="font-bold text-red-500">
                        {payload[1].value.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="rgb(16, 185, 129)"
          strokeWidth={2}
          fill="url(#total)"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="rgb(239, 68, 68)"
          strokeWidth={2}
          fill="url(#expenses)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
} 