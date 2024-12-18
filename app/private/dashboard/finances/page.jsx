"use client";

import { Suspense } from "react";
import { useFinanceStore } from "./store/finance-store";
import { FinanceMetrics } from "./components/analytics/FinanceMetrics";
import { FinanceCharts } from "./components/analytics/FinanceCharts";
import { FinanceTables } from "./components/tables/FinanceTables";
import { CardSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { Download } from "lucide-react";

export default function FinancesPage() {
  const { selectedPeriod, setSelectedPeriod } = useFinanceStore();

  const handleDateRangeChange = (dateRange) => {
    setSelectedPeriod(dateRange);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export functionality to be implemented");
  };

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
            <Suspense fallback={<CardSkeleton className="grid grid-cols-1 gap-4 md:grid-cols-3" />}>
              <FinanceMetrics />
            </Suspense>

            <Suspense fallback={<CardSkeleton className="grid grid-cols-1 gap-4 md:grid-cols-2" />}>
              <FinanceCharts />
            </Suspense>

            <Suspense fallback={<CardSkeleton />}>
              <FinanceTables />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
