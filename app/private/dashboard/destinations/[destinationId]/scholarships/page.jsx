"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/private/dashboard/students/components/data-table";
import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import { getDestination } from "@/actions/destination";
import { useToast } from "@/components/ui/use-toast";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";

export default function ScholarshipsPage() {
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
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
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

  // Collect all scholarships from all universities
  const scholarships = destination.universities?.reduce((acc, university) => {
    if (university.scholarships) {
      return [
        ...acc,
        ...university.scholarships.map(scholarship => ({
          ...scholarship,
          universityName: university.name,
          universityId: university._id,
        })),
      ];
    }
    return acc;
  }, []) || [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Scholarships</h2>
            <p className="text-muted-foreground">
              Manage scholarships for {destination.name}
            </p>
          </div>
          <Button
            onClick={() =>
              router.push(`/private/dashboard/destinations/${params.destinationId}/scholarships/new`)
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add Scholarship
          </Button>
        </div>
        <Separator />
        <DataTable
          columns={columns}
          data={scholarships}
          searchKey="name"
        />
      </div>
    </div>
  );
}