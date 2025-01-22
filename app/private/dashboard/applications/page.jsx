"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle2, Clock, FileText, GraduationCap, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ApplicationSearch } from "./components/ApplicationSearch";
import { BatchActions } from "./components/BatchActions";
import { toast } from "sonner";

async function getApplications(page = 1, limit = 10, filters = {}) {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add filters to query params
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.type) queryParams.append("type", filters.type);
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.priority) queryParams.append("priority", filters.priority);
    if (filters.destination) queryParams.append("destination", filters.destination);
    if (filters.dateRange?.from) queryParams.append("startDate", filters.dateRange.from);
    if (filters.dateRange?.to) queryParams.append("endDate", filters.dateRange.to);

    const res = await fetch(`/api/applications?${queryParams.toString()}`);
    if (!res.ok) {
      throw new Error("Failed to fetch applications");
    }
    const data = await res.json();
    
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

async function handleBatchAction(action, selectedRows, options = {}) {
  const ids = selectedRows.map(row => row.id);
  
  try {
    let endpoint = "/api/applications/batch";
    let method = "POST";
    let body = { ids, action, ...options };

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to process batch action");
    }

    return await response.json();
  } catch (error) {
    console.error("Error processing batch action:", error);
    throw error;
  }
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
      icon: <FileText className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: "Study Applications", 
      value: studyApplications,
      description: totalApplications > 0 ? `${((studyApplications / totalApplications) * 100).toFixed(1)}% of total` : "No applications",
      icon: <GraduationCap className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Work Applications",
      value: workApplications,
      description: totalApplications > 0 ? `${((workApplications / totalApplications) * 100).toFixed(1)}% of total` : "No applications",
      icon: <Briefcase className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Processing Status",
      value: `${pendingApplications} / ${underReviewApplications}`,
      description: "Pending / Under Review",
      icon: <Clock className="h-5 w-5 text-yellow-500" />
    },
    {
      title: "Success Rate",
      value: totalApplications > 0 ? `${((approvedApplications / totalApplications) * 100).toFixed(1)}%` : "0%",
      description: `${approvedApplications} approved out of ${totalApplications}`,
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
    },
  ];

  return (
    <div className=" p-3 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            {metric.icon}
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
  const [filters, setFilters] = useState({});
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["applications", page, limit, selectedTab, filters],
    queryFn: () => {
      const queryFilters = { ...filters };
      
      // Handle tab-based filtering
      if (selectedTab === "study" || selectedTab === "work") {
        queryFilters.type = selectedTab;
      } else if (selectedTab !== "all") {
        queryFilters.status = selectedTab;
      }
      
      return getApplications(page, limit, queryFilters);
    },
  });

  const applications = data?.applications || [];
  const pagination = data?.pagination;

  const handleSearch = (searchQuery) => {
    setFilters(prev => ({ ...prev, search: searchQuery }));
    setPage(1);
  };

  const handleFilter = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const handleTabChange = (value) => {
    setSelectedTab(value);
    setPage(1);
    // Clear any existing type or status filters
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters.type;
      delete newFilters.status;
      return newFilters;
    });
  };

  const handleBatchActions = async (action, rows, options) => {
    try {
      await handleBatchAction(action, rows, options);
      queryClient.invalidateQueries(["applications"]);
    } catch (error) {
      toast.error("Failed to process batch action");
    }
  };

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

  return (
    <div className="w-full space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight ">StudyjetGlobal Student Applications</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track all applications in one place
          </p>
        </div>
      </div>

      <MetricsCards applications={applications} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <ApplicationSearch onSearch={handleSearch} onFilter={handleFilter} />
        </div>

        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>

            <TabsTrigger value="submitted">Pending</TabsTrigger>
            <TabsTrigger value="under_review">Under Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value={selectedTab} className="space-y-4">
            <DataTable
              columns={columns}
              data={applications}
              pageCount={pagination?.pages}
              pageSize={limit}
              pageIndex={page - 1}
              onPageChange={(newPage) => setPage(newPage + 1)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
