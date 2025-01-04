"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./components/data-table";
import { getColumns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
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
import { DeadlineCalendar } from "./components/deadline-calendar";


async function getDeadlines() {
  const res = await fetch("/api/deadlines");
  if (!res.ok) {
    throw new Error("Failed to fetch deadlines");
  }
  return res.json();
}

async function deleteDeadline(id) {
  const res = await fetch(`/api/deadlines?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete deadline");
  }
  return res.json();
}

export default function DeadlinesPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'
  const [selectedDeadlines, setSelectedDeadlines] = useState([]);
  const queryClient = useQueryClient();

  const {
    data: deadlines = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["deadlines"],
    queryFn: getDeadlines,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDeadline,
    onSuccess: () => {
      queryClient.invalidateQueries(["deadlines"]);
      toast.success("Deadline deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete deadline");
    },
  });

  const handleDeleteDeadline = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting deadline:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedDeadlines.map((id) => deleteMutation.mutateAsync(id))
      );
      setSelectedDeadlines([]);
      toast.success("Selected deadlines deleted successfully");
    } catch (error) {
      console.error("Error deleting deadlines:", error);
      toast.error("Failed to delete some deadlines");
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

  const filteredDeadlines = deadlines.filter((deadline) => {
    if (selectedTab === "all") return true;
    return deadline.status === selectedTab;
  });

  const stats = {
    total: deadlines.length,
    pending: deadlines.filter((d) => d.status === "pending").length,
    inProgress: deadlines.filter((d) => d.status === "in_progress").length,
    completed: deadlines.filter((d) => d.status === "completed").length,
    overdue: deadlines.filter((d) => d.status === "overdue").length,
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Deadlines</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              setViewMode(viewMode === "list" ? "calendar" : "list")
            }
          >
            <Calendar className="mr-2 h-4 w-4" />
            {viewMode === "list" ? "Calendar View" : "List View"}
          </Button>
          {selectedDeadlines.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete Selected ({selectedDeadlines.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Deadlines</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedDeadlines.length}{" "}
                    selected deadlines? This action cannot be undone.
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
            onClick={() => router.push("/private/dashboard/deadlines/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Deadline
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending & In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.pending + stats.inProgress}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats.overdue}
            </div>
          </CardContent>
        </Card>
      </div>

      {viewMode === "list" ? (
        <Tabs defaultValue="all" onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All Deadlines</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <DataTable
              columns={getColumns({ onDeleteDeadline: handleDeleteDeadline })}
              data={filteredDeadlines}
              onRowSelectionChange={setSelectedDeadlines}
            />
          </TabsContent>
          <TabsContent value="pending" className="space-y-4">
            <DataTable
              columns={getColumns({ onDeleteDeadline: handleDeleteDeadline })}
              data={filteredDeadlines}
              onRowSelectionChange={setSelectedDeadlines}
            />
          </TabsContent>
          <TabsContent value="in_progress" className="space-y-4">
            <DataTable
              columns={getColumns({ onDeleteDeadline: handleDeleteDeadline })}
              data={filteredDeadlines}
              onRowSelectionChange={setSelectedDeadlines}
            />
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <DataTable
              columns={getColumns({ onDeleteDeadline: handleDeleteDeadline })}
              data={filteredDeadlines}
              onRowSelectionChange={setSelectedDeadlines}
            />
          </TabsContent>
          <TabsContent value="overdue" className="space-y-4">
            <DataTable
              columns={getColumns({ onDeleteDeadline: handleDeleteDeadline })}
              data={filteredDeadlines}
              onRowSelectionChange={setSelectedDeadlines}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <DeadlineCalendar
              deadlines={deadlines}
              onDeadlineClick={(deadline) =>
                router.push(`/private/dashboard/deadlines/${deadline._id}`)
              }
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
