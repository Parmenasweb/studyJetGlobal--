"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
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
import { SourceSelector, EXPENSE_CATEGORIES } from "./components/source-selector";

async function getExpenseEntries(dateRange) {
  const params = new URLSearchParams();
  if (dateRange?.from) params.append("startDate", dateRange.from.toISOString());
  if (dateRange?.to) params.append("endDate", dateRange.to.toISOString());
  
  const res = await fetch(`/api/finance/expense?${params}`);
  if (!res.ok) throw new Error("Failed to fetch expense entries");
  return res.json();
}

const columns = [
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = EXPENSE_CATEGORIES[row.original.category];
      return category?.label || row.original.category;
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
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      const methods = {
        "bank-transfer": "Bank Transfer",
        "cash": "Cash",
        "credit-card": "Credit Card",
        "other": "Other"
      };
      return methods[row.original.paymentMethod] || row.original.paymentMethod;
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        row.original.status === "paid"
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
        onClick={() => router.push(`/private/dashboard/finance/expense/${row.original._id}`)}
      >
        View Details
      </Button>
    )
  }
];

export default function ExpensePage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const {
    data: expenseEntries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expense", dateRange],
    queryFn: () => getExpenseEntries(dateRange),
  });

  const handleSourceSelect = (source) => {
    router.push(`/private/dashboard/finance/expense/new?category=${source}`);
  };

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
          <h2 className="text-3xl font-bold tracking-tight">Expense Management</h2>
        </div>
        <div className="flex items-center space-x-2">
          <SourceSelector onSourceSelect={handleSourceSelect} />
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Expenses</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Entries</CardTitle>
              <CardDescription>
                View and manage all expense entries
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
                    {error.message || "Failed to load expense entries"}
                  </p>
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={expenseEntries}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Expenses</CardTitle>
              <CardDescription>
                View and manage pending expense entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={expenseEntries.filter(entry => entry.status === "pending")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paid Expenses</CardTitle>
              <CardDescription>
                View paid expense entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={expenseEntries.filter(entry => entry.status === "paid")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recurring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recurring Expenses</CardTitle>
              <CardDescription>
                View and manage recurring expense entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={expenseEntries.filter(entry => entry.isRecurring)}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 