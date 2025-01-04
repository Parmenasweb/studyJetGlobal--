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
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConsultationActions() {
  const router = useRouter();
  const { viewMode, toggleViewMode } = useConsultationView();
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const handleDateRangeChange = async (newDateRange) => {
    setDateRange(newDateRange);
    router.refresh();
  };

  return (
    <div className="flex items-center space-x-2">
      <CalendarDateRangePicker
        value={dateRange}
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