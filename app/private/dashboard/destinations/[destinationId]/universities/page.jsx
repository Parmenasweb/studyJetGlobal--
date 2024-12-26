"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/private/dashboard/students/components/data-table";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { columns } from "./components/columns";
import { getDestination } from "@/actions/destination";

export default function UniversitiesPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    async function loadDestination() {
      try {
        const data = await getDestination(params.destinationId);
        setDestination(data);
      } catch (error) {
        setError(error.message || "Failed to load destination");
        toast({
          title: "Error",
          description: error.message || "Failed to load destination",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadDestination();
  }, [params.destinationId, toast]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!destination) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Destination Not Found</h1>
          <p className="text-muted-foreground">
            The destination you are looking for does not exist.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Universities</h2>
            <p className="text-muted-foreground">
              Manage universities for {destination.name}
            </p>
          </div>
          <Button
            onClick={() =>
              router.push(`/private/dashboard/destinations/${params.destinationId}/universities/new`)
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add University
          </Button>
        </div>
        <Separator />
        <DataTable
          columns={columns}
          data={destination.universities || []}
          searchKey="name"
        />
      </div>
    </div>
  );
}