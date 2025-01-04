"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { DataTable } from "./components/data-table";
import { DataTable } from "../students/components/data-table";
import { getColumns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
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

async function getClients() {
  const res = await fetch("/api/clients");
  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }
  return res.json();
}

async function deleteClient(id) {
  const res = await fetch(`/api/clients?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete client");
  }
  return res.json();
}

export default function ClientsPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedClients, setSelectedClients] = useState([]);
  const queryClient = useQueryClient();

  const {
    data: clients = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
      toast.success("Client deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete client");
    },
  });

  const handleDeleteClient = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedClients.map((id) => deleteMutation.mutateAsync(id))
      );
      setSelectedClients([]);
      toast.success("Selected clients deleted successfully");
    } catch (error) {
      console.error("Error deleting clients:", error);
      toast.error("Failed to delete some clients");
    }
  };

  const handleExportData = () => {
    const exportData = clients.map((client) => ({
      "Full Name": client.personalInfo.fullName,
      Email: client.personalInfo.email,
      Phone: client.personalInfo.phone,
      Status: client.status,
      University: client.academicInfo.university.name,
      Program: client.academicInfo.program.name,
      "Student ID": client.academicInfo.studentId,
      "Enrollment Date": format(
        new Date(client.academicInfo.enrollmentDate),
        "PPP"
      ),
      "Expected Graduation": format(
        new Date(client.academicInfo.expectedGraduationDate),
        "PPP"
      ),
    }));

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute(
      "download",
      `clients_export_${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const filteredClients = clients.filter((client) => {
    if (selectedTab === "all") return true;
    return client.status === selectedTab;
  });

  const stats = {
    total: clients.length,
    active: clients.filter((client) => client.status === "active").length,
    graduated: clients.filter((client) => client.status === "graduated").length,
    deferred: clients.filter((client) => client.status === "deferred").length,
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
        <div className="flex items-center gap-2">
          {selectedClients.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete Selected ({selectedClients.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Clients</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedClients.length}{" "}
                    selected clients? This action cannot be undone.
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
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => router.push("/private/dashboard/clients/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.graduated}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deferred</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deferred}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="graduated">Graduated</TabsTrigger>
          <TabsTrigger value="deferred">Deferred</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <DataTable
            columns={getColumns({ onDeleteClient: handleDeleteClient })}
            data={filteredClients}
            onRowSelectionChange={setSelectedClients}
          />
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <DataTable
            columns={getColumns({ onDeleteClient: handleDeleteClient })}
            data={filteredClients}
            onRowSelectionChange={setSelectedClients}
          />
        </TabsContent>
        <TabsContent value="graduated" className="space-y-4">
          <DataTable
            columns={getColumns({ onDeleteClient: handleDeleteClient })}
            data={filteredClients}
            onRowSelectionChange={setSelectedClients}
          />
        </TabsContent>
        <TabsContent value="deferred" className="space-y-4">
          <DataTable
            columns={getColumns({ onDeleteClient: handleDeleteClient })}
            data={filteredClients}
            onRowSelectionChange={setSelectedClients}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
