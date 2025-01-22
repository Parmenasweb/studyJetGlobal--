"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";

export function FinanceChart({ data = [] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Memoize the colors to prevent unnecessary re-renders
  const colors = useMemo(
    () => ({
      income: {
        stroke: "rgb(34, 197, 94)",
        fill: "rgba(34, 197, 94, 0.2)",
      },
      expenses: {
        stroke: "rgb(239, 68, 68)",
        fill: "rgba(239, 68, 68, 0.2)",
      },
      profit: {
        stroke: "rgb(59, 130, 246)",
        fill: "rgba(59, 130, 246, 0.2)",
      },
      grid: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      text: isDark ? "rgb(156, 163, 175)" : "rgb(107, 114, 128)",
    }),
    [isDark]
  );

  // Format currency for tooltip and axis
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    return (
      <Card className="p-3 shadow-lg border bg-background">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-4"
          >
            <span
              className="text-sm capitalize"
              style={{ color: item.color }}
            >
              {item.name}:
            </span>
            <span className="font-medium text-sm">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </Card>
    );
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[350px] text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.income.stroke}
                stopOpacity={0.2}
              />
              <stop
                offset="95%"
                stopColor={colors.income.stroke}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.expenses.stroke}
                stopOpacity={0.2}
              />
              <stop
                offset="95%"
                stopColor={colors.expenses.stroke}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.profit.stroke}
                stopOpacity={0.2}
              />
              <stop
                offset="95%"
                stopColor={colors.profit.stroke}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke={colors.text}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={colors.text}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrency}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke={colors.income.stroke}
            fill="url(#income)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke={colors.expenses.stroke}
            fill="url(#expenses)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="profit"
            name="Profit"
            stroke={colors.profit.stroke}
            fill="url(#profit)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 