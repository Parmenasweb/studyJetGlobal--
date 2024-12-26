"use client";

import { useEffect } from "react";
import { useFinanceStore } from "./store/finance-store";
import { FinanceMetrics } from "./components/analytics/FinanceMetrics";
import { FinanceCharts } from "./components/analytics/FinanceCharts";
import { FinanceTables } from "./components/tables/FinanceTables";
import { CardSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function FinancesPage() {
  const { selectedPeriod, setSelectedPeriod, fetchFinanceData, isLoading, error } = useFinanceStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchFinanceData().catch((error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch finance data",
        variant: "destructive",
      });
    });
  }, [fetchFinanceData, toast]);

  const handleDateRangeChange = (dateRange) => {
    setSelectedPeriod(dateRange);
  };

  const handleExport = () => {
    const { finance } = useFinanceStore.getState();
    
    // Prepare data for export
    const exportData = {
      summary: {
        totalRevenue: finance.totalRevenue,
        totalExpenses: finance.totalExpenses,
        netProfit: finance.netProfit,
        profitMargin: finance.profitMargin,
        revenuePerStudent: finance.revenuePerStudent,
        operationalCosts: finance.operationalCosts,
      },
      transactions: finance.transactions,
      studentPayments: finance.studentPayments,
      budgets: finance.budgets,
      analytics: {
        revenueByCategory: finance.revenueByCategory,
        expensesByCategory: finance.expensesByCategory,
        monthlyRevenue: finance.monthlyRevenue,
        monthlyExpenses: finance.monthlyExpenses,
      },
    };

    // Convert to CSV string
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.entries(exportData.summary).map(([key, value]) => `${key},${value}`).join("\n") + "\n\n" +
      "Transactions\n" +
      "Type,Category,Amount,Date,Status\n" +
      exportData.transactions.map(t => `${t.type},${t.category},${t.amount},${t.date},${t.status}`).join("\n") + "\n\n" +
      "Student Payments\n" +
      "Student ID,Amount,Type,Status,Due Date,Paid Date\n" +
      exportData.studentPayments.map(p => `${p.studentId},${p.amount},${p.type},${p.status},${p.dueDate},${p.paidDate || ''}`).join("\n") + "\n\n" +
      "Budgets\n" +
      "Category,Amount,Period,Start Date,End Date,Actual,Variance\n" +
      exportData.budgets.map(b => `${b.category},${b.amount},${b.period},${b.startDate},${b.endDate},${b.actual},${b.variance}`).join("\n");

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `finance_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: "Finance report has been downloaded",
    });
  };

  if (error) {
    return (
      <div className="flex-1 ml-[6%] p-8">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <h2 className="text-2xl font-bold text-destructive">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => fetchFinanceData()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 ml-[6%]">
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="flex-none p-8 pb-6 bg-background">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">Finances</h2>
              <p className="text-sm text-muted-foreground">
                Manage your financial transactions and analytics
              </p>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
              <CalendarDateRangePicker
                value={selectedPeriod}
                onChange={handleDateRangeChange}
              />
              <Button onClick={handleExport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 pt-0 space-y-8">
            {isLoading ? (
              <>
                <CardSkeleton className="grid grid-cols-1 gap-4 md:grid-cols-3" />
                <CardSkeleton className="grid grid-cols-1 gap-4 md:grid-cols-2" />
                <CardSkeleton />
              </>
            ) : (
              <>
                <FinanceMetrics />
                <FinanceCharts />
                <FinanceTables />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
