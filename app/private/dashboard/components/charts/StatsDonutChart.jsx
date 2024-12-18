"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export function StatsDonutChart({ data, title, subtitle }) {
  return (
    <Card className="col-span-2">
      <div className="p-6">
        <div className="flex flex-col space-y-1">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].name}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
} 