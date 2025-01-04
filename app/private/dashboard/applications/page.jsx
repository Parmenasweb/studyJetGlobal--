"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

async function getApplications(page = 1, limit = 10, status = "", search = "") {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status) queryParams.append("status", status);
    if (search) queryParams.append("search", search);

    const res = await fetch(`/api/applications?${queryParams.toString()}`);
    if (!res.ok) {
      throw new Error("Failed to fetch applications");
    }
    const data = await res.json();
    
    // Format the data to match our table requirements
    return {
      applications: data.applications.map(app => ({
        id: app.id,
        studentName: app.studentName,
        studentEmail: app.studentEmail,
        type: app.applicationType,
        status: app.status,
        priority: app.priority,
        destination: app.destination,
        program: app.program,
        submittedAt: app.submittedAt ? format(new Date(app.submittedAt), "PPP") : "Not submitted",
        updatedAt: app.updatedAt ? format(new Date(app.updatedAt), "PPP") : "Not updated"
      })),
      pagination: data.pagination
    };
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw new Error("Failed to fetch applications");
  }
}

function ApplicationsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <div className="rounded-lg border">
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  );
}

function MetricsCards({ applications = [] }) {
  const totalApplications = applications.length;
  const studyApplications = applications.filter(app => app.type === "study").length;
  const workApplications = applications.filter(app => app.type === "work").length;
  const pendingApplications = applications.filter(app => app.status === "submitted").length;
  const underReviewApplications = applications.filter(app => app.status === "under_review").length;
  const approvedApplications = applications.filter(app => app.status === "approved").length;
  const rejectedApplications = applications.filter(app => app.status === "rejected").length;

  const metrics = [
    {
      title: "Total Applications",
      value: totalApplications,
      description: "Total number of applications",
    },
    {
      title: "Study Applications",
      value: studyApplications,
      description: totalApplications > 0 ? `${((studyApplications / totalApplications) * 100).toFixed(1)}% of total` : "No applications",
    },
    {
      title: "Work Applications",
      value: workApplications,
      description: totalApplications > 0 ? `${((workApplications / totalApplications) * 100).toFixed(1)}% of total` : "No applications",
    },
    {
      title: "Processing Status",
      value: `${pendingApplications} / ${underReviewApplications}`,
      description: "Pending / Under Review",
    },
    {
      title: "Success Rate",
      value: totalApplications > 0 ? `${((approvedApplications / totalApplications) * 100).toFixed(1)}%` : "0%",
      description: `${approvedApplications} approved out of ${totalApplications}`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function ApplicationsPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["applications", page, limit, selectedTab],
    queryFn: () => getApplications(
      page,
      limit,
      selectedTab === "all" ? "" : selectedTab
    ),
  });

  const applications = data?.applications || [];
  const pagination = data?.pagination;

  if (error) {
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2">
        <p className="text-sm text-muted-foreground">
          {error.message || "Something went wrong"}
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    );
  }

  const filteredApplications = applications.filter((application) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "study") return application.type === "study";
    if (selectedTab === "work") return application.type === "work";
    return application.status === selectedTab;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Applications</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track all applications in one place
          </p>
        </div>
        <Button
          onClick={() => router.push("/private/dashboard/applications/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      {isLoading ? (
        <ApplicationsTableSkeleton />
      ) : (
        <>
          <MetricsCards applications={applications} />

          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="all">All Applications</TabsTrigger>
              <TabsTrigger value="study">Study</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="submitted">Pending</TabsTrigger>
              <TabsTrigger value="under_review">Under Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedTab} className="space-y-4">
              <DataTable
                columns={columns}
                data={filteredApplications}
                pageCount={pagination?.pages}
                pageSize={limit}
                pageIndex={page - 1}
                onPageChange={(newPage) => setPage(newPage + 1)}
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
