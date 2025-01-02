"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./components/data-table";
import { getColumns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

async function getApplications() {
  const res = await fetch("/api/applications");
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}

async function deleteApplication(id) {
  const res = await fetch(`/api/applications?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete application");
  }
  return res.json();
}

export default function ApplicationsPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedApplications, setSelectedApplications] = useState([]);
  const queryClient = useQueryClient();

  const {
    data: applications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
      toast.success("Application deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete application");
    },
  });

  const handleDeleteApplication = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedApplications.map((id) => deleteMutation.mutateAsync(id))
      );
      setSelectedApplications([]);
      toast.success("Selected applications deleted successfully");
    } catch (error) {
      console.error("Error deleting applications:", error);
      toast.error("Failed to delete some applications");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
    if (selectedTab === "study") return application.applicationType === "study";
    if (selectedTab === "work") return application.applicationType === "work";
    return application.status === selectedTab;
  });

  const stats = {
    total: applications.length,
    study: applications.filter((app) => app.applicationType === "study").length,
    work: applications.filter((app) => app.applicationType === "work").length,
    pending: applications.filter((app) => app.status === "pending").length,
    approved: applications.filter((app) => app.status === "approved").length,
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
        <div className="flex items-center gap-2">
          {selectedApplications.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected ({selectedApplications.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Applications</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete{" "}
                    {selectedApplications.length} selected applications? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleBulkDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button
            onClick={() => router.push("/private/dashboard/applications/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Study Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.study}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Work Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.work}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="study">Study</TabsTrigger>
          <TabsTrigger value="work">Work</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <DataTable
            columns={getColumns({
              onDeleteApplication: handleDeleteApplication,
            })}
            data={filteredApplications}
            onRowSelectionChange={setSelectedApplications}
          />
        </TabsContent>
        <TabsContent value="study" className="space-y-4">
          <DataTable
            columns={getColumns({
              onDeleteApplication: handleDeleteApplication,
            })}
            data={filteredApplications}
            onRowSelectionChange={setSelectedApplications}
          />
        </TabsContent>
        <TabsContent value="work" className="space-y-4">
          <DataTable
            columns={getColumns({
              onDeleteApplication: handleDeleteApplication,
            })}
            data={filteredApplications}
            onRowSelectionChange={setSelectedApplications}
          />
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <DataTable
            columns={getColumns({
              onDeleteApplication: handleDeleteApplication,
            })}
            data={filteredApplications}
            onRowSelectionChange={setSelectedApplications}
          />
        </TabsContent>
        <TabsContent value="approved" className="space-y-4">
          <DataTable
            columns={getColumns({
              onDeleteApplication: handleDeleteApplication,
            })}
            data={filteredApplications}
            onRowSelectionChange={setSelectedApplications}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
