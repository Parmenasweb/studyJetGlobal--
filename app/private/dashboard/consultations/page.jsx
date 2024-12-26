"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "../students/components/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { mockConsultations } from "./data/mock-consultations";
import { columns } from "./components/columns";
import { Suspense } from "react";
import { CardSkeleton } from "@/components/skeletons";
import { TableError } from "../students/components/TableError";
import { Download, Filter, Plus } from "lucide-react";
import { getConsultations } from "@/actions/consultation";
import Link from "next/link";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "./loading";
import Error from "./error";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function ConsultationsPage() {
  const router = useRouter();
  const [consultations, error] = await getConsultations();

  if (error) {
    return <Error message={error} />;
  }

  const [selectedDate, setSelectedDate] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const stats = {
    total: consultations.length,
    pending: consultations.filter((cons) => cons.status === "pending").length,
    confirmed: consultations.filter((cons) => cons.status === "confirmed").length,
    completed: consultations.filter((cons) => cons.status === "completed").length,
    cancelled: consultations.filter((cons) => cons.status === "cancelled").length,
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Consultations</h2>
          <p className="text-muted-foreground">
            Manage and track consultation requests
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker
            value={selectedDate}
            onChange={setSelectedDate}
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Link href="/private/dashboard/consultations/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Consultation
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Consultations</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <div className="p-6">
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">
                  Total Consultations
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">
                  Pending Consultations
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stats.confirmed}</p>
                <p className="text-xs text-muted-foreground">
                  Confirmed Consultations
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-xs text-muted-foreground">
                  Completed Consultations
                </p>
              </div>
            </div>
          </Card>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Suspense fallback={<CardSkeleton />}>
            <DataTable data={consultations} columns={columns} />
          </Suspense>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Suspense fallback={<CardSkeleton />}>
            <DataTable
              data={consultations.filter((cons) => cons.status === "pending")}
              columns={columns}
            />
          </Suspense>
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          <Suspense fallback={<CardSkeleton />}>
            <DataTable
              data={consultations.filter((cons) => cons.status === "confirmed")}
              columns={columns}
            />
          </Suspense>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Suspense fallback={<CardSkeleton />}>
            <DataTable
              data={consultations.filter((cons) => cons.status === "completed")}
              columns={columns}
            />
          </Suspense>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Suspense fallback={<CardSkeleton />}>
            <DataTable
              data={consultations.filter((cons) => cons.status === "cancelled")}
              columns={columns}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
} 