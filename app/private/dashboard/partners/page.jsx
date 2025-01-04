"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { DataTable } from "./components/data-table";
import { DataTable } from "../students/components/data-table";
import { getColumns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Building2, Users } from "lucide-react";
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
import { PartnerMap } from "./components/partner-map";

async function getPartners() {
  const res = await fetch("/api/partners");
  if (!res.ok) {
    throw new Error("Failed to fetch partners");
  }
  return res.json();
}

async function deletePartner(id) {
  const res = await fetch(`/api/partners?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete partner");
  }
  return res.json();
}

export default function PartnersPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'map'
  const [selectedPartners, setSelectedPartners] = useState([]);
  const queryClient = useQueryClient();

  const {
    data: partners = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["partners"],
    queryFn: getPartners,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePartner,
    onSuccess: () => {
      queryClient.invalidateQueries(["partners"]);
      toast.success("Partner deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete partner");
    },
  });

  const handleDeletePartner = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedPartners.map((id) => deleteMutation.mutateAsync(id))
      );
      setSelectedPartners([]);
      toast.success("Selected partners deleted successfully");
    } catch (error) {
      console.error("Error deleting partners:", error);
      toast.error("Failed to delete some partners");
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

  const filteredPartners = partners.filter((partner) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "universities") return partner.type === "university";
    if (selectedTab === "agencies") return partner.type === "agency";
    if (selectedTab === "agents") return partner.type === "independent_agent";
    return partner.type === selectedTab;
  });

  const stats = {
    total: partners.length,
    universities: partners.filter((p) => p.type === "university").length,
    agencies: partners.filter((p) => p.type === "agency").length,
    agents: partners.filter((p) => p.type === "independent_agent").length,
    countries: new Set(partners.map((p) => p.location.country)).size,
    activeStudents: partners.reduce(
      (sum, p) => sum + (p.performance?.activeStudents || 0),
      0
    ),
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Partners</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
          >
            <MapPin className="mr-2 h-4 w-4" />
            {viewMode === "list" ? "Map View" : "List View"}
          </Button>
          {selectedPartners.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete Selected ({selectedPartners.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Partners</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedPartners.length}{" "}
                    selected partners? This action cannot be undone.
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
            onClick={() => router.push("/private/dashboard/partners/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Partner
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Universities</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.universities}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Agencies & Agents
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.agencies + stats.agents}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.countries}</div>
          </CardContent>
        </Card>
      </div>

      {viewMode === "list" ? (
        <Tabs defaultValue="all" onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All Partners</TabsTrigger>
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="agencies">Agencies</TabsTrigger>
            <TabsTrigger value="agents">Independent Agents</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <DataTable
              columns={getColumns({ onDeletePartner: handleDeletePartner })}
              data={filteredPartners}
              onRowSelectionChange={setSelectedPartners}
            />
          </TabsContent>
          <TabsContent value="universities" className="space-y-4">
            <DataTable
              columns={getColumns({ onDeletePartner: handleDeletePartner })}
              data={filteredPartners}
              onRowSelectionChange={setSelectedPartners}
            />
          </TabsContent>
          <TabsContent value="agencies" className="space-y-4">
            <DataTable
              columns={getColumns({ onDeletePartner: handleDeletePartner })}
              data={filteredPartners}
              onRowSelectionChange={setSelectedPartners}
            />
          </TabsContent>
          <TabsContent value="agents" className="space-y-4">
            <DataTable
              columns={getColumns({ onDeletePartner: handleDeletePartner })}
              data={filteredPartners}
              onRowSelectionChange={setSelectedPartners}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <PartnerMap
              partners={partners}
              onPartnerClick={(partner) =>
                router.push(`/private/dashboard/partners/${partner._id}`)
              }
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
