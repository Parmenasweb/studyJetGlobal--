"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Plus, Users, DollarSign, UserCheck, Globe, CheckCircle, Wallet } from "lucide-react";
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
    return true;
  });

  const stats = {
    total: agents.length,
    active: agents.filter((a) => a.status === "active").length,
    totalLeads: agents.reduce((sum, a) => sum + a.performance.totalLeads, 0),
    totalCommission: agents
      .reduce((sum, a) => {
        const paidCommissions = a.commissions?.filter(c => c.status === "paid") || [];
        return sum + paidCommissions.reduce((total, c) => total + (c.amount || 0), 0);
      }, 0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
    successfulApplications: agents.reduce((sum, a) => sum + a.performance.successfulApplications, 0),
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">StudyjetGlobal Agents</h2>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push("/private/dashboard/agents/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Agent
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className=" p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.active} active • {stats.total - stats.active} inactive
            </p>
          </CardContent>
        </Card>
        <Card className=" p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {stats.successfulApplications} successful applications
            </p>
          </CardContent>
        </Card>
        <Card className=" p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCommission}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.totalLeads} total leads
            </p>
          </CardContent>
        </Card>
        <Card className=" p-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unpaid Commissions</CardTitle>
            <Wallet className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents
                .reduce((sum, agent) => {
                  const unpaidAmount = agent.commissions
                    ?.filter(c => c.status === "pending" || c.status === "approved")
                    ?.reduce((total, c) => total + (c.amount || 0), 0) || 0;
                  return sum + unpaidAmount;
                }, 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </div>
            <p className="text-xs text-muted-foreground">
              {agents.reduce((count, agent) => 
                count + (agent.commissions?.filter(c => 
                  c.status === "pending" || c.status === "approved"
                ).length || 0), 0)} pending payments
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="mt-4">
        <TabsList>
          <TabsTrigger value="all" className="relative">
            All Agents
            <span className="ml-2 rounded-sm bg-primary/10 px-1 text-xs">
              {stats.total}
            </span>
          </TabsTrigger>
          <TabsTrigger value="active" className="relative">
            Active
            <span className="ml-2 rounded-sm bg-green-50 px-1 text-xs">
              {stats.active}
            </span>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="relative">
            Inactive
            <span className="ml-2 rounded-sm bg-primary/10 px-1 text-xs">
              {stats.total - stats.active}
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="border-none p-0">
          <DataTable
            columns={getColumns({ onDeleteAgent: handleDeleteAgent })}
            data={filteredAgents}
          />
        </TabsContent>
        <TabsContent value="active" className="border-none p-0">
          <DataTable
            columns={getColumns({ onDeleteAgent: handleDeleteAgent })}
            data={filteredAgents}
          />
        </TabsContent>
        <TabsContent value="inactive" className="border-none p-0">
          <DataTable
            columns={getColumns({ onDeleteAgent: handleDeleteAgent })}
            data={filteredAgents}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
