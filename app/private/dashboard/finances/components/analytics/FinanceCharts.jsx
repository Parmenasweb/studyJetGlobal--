"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinanceStore } from "../../store/finance-store";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Pie,
  PieChart,
  Cell,
} from "recharts";

export function FinanceCharts() {
  const { finance } = useFinanceStore();

  // Handle null/undefined finance data
  if (!finance) {
    return (
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>No finance data available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please check your finance data configuration.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Revenue and Expenses Data
  const monthlyData = {
    labels: Object.keys(finance.monthlyRevenue || {}),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(finance.monthlyRevenue || {}),
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: Object.values(finance.monthlyExpenses || {}),
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 1,
      },
    ],
  };

  // Category Distribution
  const categoryData = {
    labels: Object.keys(finance.revenueByCategory || {}),
    datasets: [
      {
        label: "Revenue by Category",
        data: Object.values(finance.revenueByCategory || {}),
        backgroundColor: [
          "rgba(34, 197, 94, 0.5)",
          "rgba(59, 130, 246, 0.5)",
          "rgba(168, 85, 247, 0.5)",
          "rgba(249, 115, 22, 0.5)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
          "rgb(249, 115, 22)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Forecast Data
  const forecastData = {
    labels: [
      ...Object.keys(finance.monthlyRevenue || {}),
      ...Object.keys(finance.revenueForecast || {}),
    ],
    datasets: [
      {
        label: "Actual Revenue",
        data: [
          ...Object.values(finance.monthlyRevenue || {}),
          ...Array(Object.keys(finance.revenueForecast || {}).length).fill(null),
        ],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Forecast Revenue",
        data: [
          ...Array(Object.keys(finance.monthlyRevenue || {}).length).fill(null),
          ...Object.values(finance.revenueForecast || {}),
        ],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderDash: [5, 5],
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="grid gap-4">
      {/* Monthly Revenue and Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue & Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Revenue" fill="rgba(34, 197, 94, 0.5)" />
              <Bar dataKey="Expenses" fill="rgba(239, 68, 68, 0.5)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.datasets[0].data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={categoryData.datasets[0].backgroundColor[index]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Actual"
                stroke="rgb(34, 197, 94)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Forecast"
                stroke="rgb(59, 130, 246)"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
} 