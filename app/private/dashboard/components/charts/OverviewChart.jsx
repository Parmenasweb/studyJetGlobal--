"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card } from "@/components/ui/card";

export function OverviewChart({ data }) {
  return (
    <Card className="col-span-4">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Revenue Overview</h3>
            <p className="text-sm text-muted-foreground">
              Monthly revenue breakdown
            </p>
          </div>
        </div>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
              />
              <XAxis
                dataKey="name"
                className="text-sm text-muted-foreground"
              />
              <YAxis
                className="text-sm text-muted-foreground"
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                    style: "currency",
                    currency: "USD",
                  }).format(value)
                }
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {label}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(payload[0].value)}
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
                dataKey="total"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
} 