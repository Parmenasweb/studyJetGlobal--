"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useFinanceStore } from "../../store/finance-store";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `$${value.toLocaleString()}`,
      },
    },
  },
};

export function FinanceCharts() {
  const { finance } = useFinanceStore();

  // Revenue and Expenses Data
  const monthlyData = {
    labels: Object.keys(finance.monthlyRevenue),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(finance.monthlyRevenue),
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: Object.values(finance.monthlyExpenses),
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 1,
      },
    ],
  };

  // Category Distribution
  const categoryData = {
    labels: Object.keys(finance.revenueByCategory),
    datasets: [
      {
        label: "Revenue by Category",
        data: Object.values(finance.revenueByCategory),
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
      ...Object.keys(finance.monthlyRevenue),
      ...Object.keys(finance.revenueForecast),
    ],
    datasets: [
      {
        label: "Actual Revenue",
        data: [
          ...Object.values(finance.monthlyRevenue),
          ...Array(Object.keys(finance.revenueForecast).length).fill(null),
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
          ...Array(Object.keys(finance.monthlyRevenue).length).fill(null),
          ...Object.values(finance.revenueForecast),
        ],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderDash: [5, 5],
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Actual Expenses",
        data: [
          ...Object.values(finance.monthlyExpenses),
          ...Array(Object.keys(finance.expenseForecast).length).fill(null),
        ],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Forecast Expenses",
        data: [
          ...Array(Object.keys(finance.monthlyExpenses).length).fill(null),
          ...Object.values(finance.expenseForecast),
        ],
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.5)",
        borderDash: [5, 5],
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Expenses</CardTitle>
          <CardDescription>Monthly comparison of revenue and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <Bar options={chartOptions} data={monthlyData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Category</CardTitle>
          <CardDescription>Distribution of revenue across categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Bar options={chartOptions} data={categoryData} />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Financial Forecast</CardTitle>
          <CardDescription>Actual vs forecast for revenue and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <Line
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  ...chartOptions.plugins.legend,
                  position: "bottom",
                },
              },
            }}
            data={forecastData}
          />
        </CardContent>
      </Card>
    </div>
  );
} 