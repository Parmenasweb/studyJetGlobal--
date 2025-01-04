"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../../students/components/data-table";
import { CardSkeleton } from "@/components/skeletons";
import { Suspense } from "react";
import { columns } from "./columns";
import CalendarView from "./CalendarView";
import { useConsultationView } from "./ConsultationViewContext";

export default function ConsultationContent({ consultations }) {
  if (!consultations?.length) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[400px]">
          <p className="text-muted-foreground">No consultations found</p>
        </CardContent>
      </Card>
    );
  }
  
  const { viewMode } = useConsultationView();

  // No need to transform the consultations as they're already serialized
  if (viewMode === "calendar") {
    return (
      <Card>
        <CardContent className="p-0">
          <CalendarView consultations={consultations} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">All Consultations</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        <Suspense fallback={<CardSkeleton />}>
          <DataTable data={consultations} columns={columns} />
        </Suspense>
      </TabsContent>

      {["pending", "confirmed", "completed", "cancelled"].map((status) => (
        <TabsContent key={status} value={status} className="space-y-4">
          <Suspense fallback={<CardSkeleton />}>
            <DataTable
              data={consultations.filter((cons) => cons.status === status)}
              columns={columns}
            />
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  );
} 