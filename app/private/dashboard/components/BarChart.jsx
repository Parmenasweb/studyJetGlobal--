"use client";
import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar
} from "recharts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const data = [
    {
      name: "Jan",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Jul",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Aug",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Sep",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Oct",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Nov",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Dec",
      total: Math.floor(Math.random() * 5000) + 1000
    }
  ];

  export default function BarChart({}) {
    return (
      <ResponsiveContainer width={"100%"} height={300}>
        <BarGraph data={data}>
          <XAxis
            dataKey={"name"}
            tickLine={false}
            axisLine={false}
            stroke="#888888"
            fontSize={12}
            className="dark:text-gray-400"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="#888888"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
            className="dark:text-gray-400"
          />
          <Bar 
            dataKey={"total"} 
            radius={[4, 4, 0, 0]}
            fill="hsl(var(--primary))"
            className="dark:fill-current dark:text-primary"
          >
            {data.map((entry, index) => (
              <TooltipProvider key={index} delayDuration={100} skipDelayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>

                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs uppercase text-muted-foreground">
                        {entry.name}
                      </span>
                      <span className="font-bold">
                        ${entry.total}
                      </span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </Bar>
        </BarGraph>
      </ResponsiveContainer>
    );
  }