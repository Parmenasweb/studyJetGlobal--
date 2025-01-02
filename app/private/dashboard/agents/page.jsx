"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./components/data-table";
import { getColumns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Plus, Users, DollarSign, UserCheck, Globe } from "lucide-react";
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

async function getAgents() {
  const res = await fetch("/api/agents");
  if (!res.ok) {
    throw new Error("Failed to fetch agents");
  }
  return res.json();
}

async function deleteAgent(id) {
  const res = await fetch(`/api/agents?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete agent");
  }
  return res.json();
}

export default function AgentsPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedAgents, setSelectedAgents] = useState([]);
  const queryClient = useQueryClient();

  const {
    data: agents = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAgent,
    onSuccess: () => {
      queryClient.invalidateQueries(["agents"]);
      toast.success("Agent deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete agent");
    },
  });

  const handleDeleteAgent = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedAgents.map((id) => deleteMutation.mutateAsync(id))
      );
      setSelectedAgents([]);
      toast.success("Selected agents deleted successfully");
    } catch (error) {
      console.error("Error deleting agents:", error);
      toast.error("Failed to delete some agents");
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

  const filteredAgents = agents.filter((agent) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "active") return agent.status === "active";
    if (selectedTab === "inactive") return agent.status === "inactive";
    if (selectedTab === "suspended") return agent.status === "suspended";
    return true;
  });

  const stats = {
    total: agents.length,
    active: agents.filter((a) => a.status === "active").length,
    totalLeads: agents.reduce((sum, a) => sum + a.performance.totalLeads, 0),
    totalCommission: agents
      .reduce((sum, a) => sum + a.performance.totalCommissionEarned, 0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
    countries: new Set(agents.map((a) => a.country)).size,
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
        <div className="flex items-center gap-2">
          {selectedAgents.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete Selected ({selectedAgents.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Agents</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedAgents.length}{" "}
                    selected agents? This action cannot be undone.
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
          <Button onClick={() => router.push("/private/dashboard/agents/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Agent
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Commission
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCommission}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <DataTable
            columns={getColumns({ onDeleteAgent: handleDeleteAgent })}
            data={filteredAgents}
            onRowSelectionChange={setSelectedAgents}
          />
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <DataTable
            columns={getColumns({ onDeleteAgent: handleDeleteAgent })}
            data={filteredAgents}
            onRowSelectionChange={setSelectedAgents}
          />
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <DataTable
            columns={getColumns({ onDeleteAgent: handleDeleteAgent })}
            data={filteredAgents}
            onRowSelectionChange={setSelectedAgents}
          />
        </TabsContent>
        <TabsContent value="suspended" className="space-y-4">
          <DataTable
            columns={getColumns({ onDeleteAgent: handleDeleteAgent })}
            data={filteredAgents}
            onRowSelectionChange={setSelectedAgents}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
