"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { 
  Plus, 
  ChevronLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart,
  Wallet,
  Users,
  AlertCircle,
  Clock,
  Download,
  ArrowRight
} from "lucide-react";
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
import { ApprovalQueue } from "./components/ApprovalQueue";
import { RecentTransactions } from "./components/recent-transactions";
import { FinanceChart } from "./components/finance-chart";
import { getTransactionColumns } from "./components/columns";
import { startOfMonth, endOfMonth } from "date-fns";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import { Overview } from "./components/overview";


async function getFinanceStats(dateRange) {
  const params = new URLSearchParams();
  if (dateRange?.from) params.append("startDate", dateRange.from.toISOString());
  if (dateRange?.to) params.append("endDate", dateRange.to.toISOString());
  
  const res = await fetch(`/api/finance/stats?${params}`);
  if (!res.ok) throw new Error("Failed to fetch finance stats");
  return res.json();
}

async function getTransactions(dateRange) {
  const params = new URLSearchParams();
  if (dateRange?.from) params.append("startDate", dateRange.from.toISOString());
  if (dateRange?.to) params.append("endDate", dateRange.to.toISOString());
  
  const res = await fetch(`/api/finance/transactions?${params}`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

export default function FinancePage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [dateRange, setDateRange] = useState({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });
  const [stats, setStats] = useState({
    totalRevenue: "$0",
    revenueGrowth: 0,
    netProfit: "$0",
    profitGrowth: 0,
    pendingPayouts: "$0",
    pendingPayoutsCount: 0,
    totalExpenses: "$0",
    expenseReduction: 0,
    revenueData: [] // Initialize empty array for chart data
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    data: transactions = [],
    isLoading: isLoadingTransactions,
    error: transactionsError,
  } = useQuery({
    queryKey: ["transactions", dateRange],
    queryFn: () => getTransactions(dateRange),
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `/api/finance/stats?startDate=${dateRange.from}&endDate=${dateRange.to}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch finance stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching finance stats:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [dateRange]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  const handleDownloadReport = () => {
    // TODO: Implement report download
    console.log("Downloading report...");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Finance Overview</h2>
          <p className="text-muted-foreground">
            Monitor your financial performance and transactions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <DatePickerWithRange
            date={dateRange}
            setDate={setDateRange}
          />
          <Button onClick={() => router.push("/private/dashboard/finance/income/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New Income
          </Button>
          <Button onClick={() => router.push("/private/dashboard/finance/expense/new")} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Expense
          </Button>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="hover:bg-accent cursor-pointer" onClick={() => router.push("/private/dashboard/finance/income")}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Income Management
              <ArrowRight className="h-5 w-5" />
            </CardTitle>
            <CardDescription>
              Manage all income sources including application fees, commissions, and service charges
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:bg-accent cursor-pointer" onClick={() => router.push("/private/dashboard/finance/expense")}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Expense Management
              <ArrowRight className="h-5 w-5" />
            </CardTitle>
            <CardDescription>
              Track and manage all expenses including commissions, marketing, and operational costs
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Overview data={stats} isLoading={isLoading} error={error} />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <FinanceChart data={stats.revenueData || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions transactions={transactions} isLoading={isLoading} error={transactionsError} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>
                A list of all your transactions
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={getTransactionColumns()}
              data={transactions || []}
              searchKey="description"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 