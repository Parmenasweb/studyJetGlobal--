"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Plus, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { DatePickerWithRange } from "@/app/components/ui/date-range-picker";

const columns = [
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const sources = {
        "application-fee": "Application Fee",
        "service-fee": "Service Fee",
        "commission": "Commission",
        "consultation-fee": "Consultation Fee",
        "document-processing": "Document Processing",
        "visa-assistance": "Visa Assistance",
        "other": "Other Income"
      };
      return sources[row.original.source] || row.original.source;
    }
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => row.original.formattedAmount
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString()
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        row.original.status === "completed"
          ? "bg-green-100 text-green-800"
          : row.original.status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800"
      }`}>
        {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
      </span>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        onClick={() => router.push(`/private/dashboard/finance/income/${row.original._id}`)}
      >
        View Details
      </Button>
    )
  }
];

async function getIncomeEntries(dateRange) {
  const params = new URLSearchParams();
  if (dateRange?.from) params.append("startDate", dateRange.from.toISOString());
  if (dateRange?.to) params.append("endDate", dateRange.to.toISOString());
  
  const res = await fetch(`/api/finance/income?${params}`);
  if (!res.ok) throw new Error("Failed to fetch income entries");
  return res.json();
}

export default function IncomePage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const {
    data: incomeEntries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["income", dateRange],
    queryFn: () => getIncomeEntries(dateRange),
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Income Management</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => router.push("/private/dashboard/finance/income/new")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Income Entry
          </Button>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Income</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Entries</CardTitle>
              <CardDescription>
                View and manage all income entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-[200px] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-600">
                    {error.message || "Failed to load income entries"}
                  </p>
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={incomeEntries}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Income</CardTitle>
              <CardDescription>
                View and manage pending income entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={incomeEntries.filter(entry => entry.status === "pending")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Income</CardTitle>
              <CardDescription>
                View completed income entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={incomeEntries.filter(entry => entry.status === "completed")}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 