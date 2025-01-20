"use client";

import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import {
  Download,
  Filter,
  Plus,
  Calendar as CalendarIcon,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { useConsultationView } from "./ConsultationViewContext";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { format } from "date-fns";

export default function ConsultationActions() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { viewMode, toggleViewMode } = useConsultationView();

  // Get date range from URL or use defaults
  const fromDate = searchParams.get("from") 
    ? new Date(searchParams.get("from")) 
    : new Date(new Date().setMonth(new Date().getMonth() - 1));
  const toDate = searchParams.get("to") 
    ? new Date(searchParams.get("to")) 
    : new Date();

  const handleDateRangeChange = (newDateRange) => {
    const params = new URLSearchParams(searchParams);
    if (newDateRange.from) {
      params.set("from", format(newDateRange.from, "yyyy-MM-dd"));
    } else {
      params.delete("from");
    }
    if (newDateRange.to) {
      params.set("to", format(newDateRange.to, "yyyy-MM-dd"));
    } else {
      params.delete("to");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <CalendarDateRangePicker
        value={{
          from: fromDate,
          to: toDate
        }}
        onChange={handleDateRangeChange}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={toggleViewMode}
        title={viewMode === "table" ? "Switch to Calendar View" : "Switch to Table View"}
      >
        {viewMode === "table" ? (
          <CalendarIcon className="h-4 w-4" />
        ) : (
          <LayoutGrid className="h-4 w-4" />
        )}
      </Button>
      <Button variant="outline" size="icon" title="Filter">
        <Filter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" title="Download">
        <Download className="h-4 w-4" />
      </Button>
      <Link href="/private/dashboard/consultations/new">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Consultation
        </Button>
      </Link>
    </div>
  );
} 