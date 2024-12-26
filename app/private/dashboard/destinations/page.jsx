"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { columns } from "./components/columns";
import { getDestinations } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import CardDestinationStats from "./components/CardDestinationStats";

export default function DestinationsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    destinations: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      pages: 0,
    },
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations(query = {}) {
    try {
      setLoading(true);
      setError(null);
      const response = await getDestinations(query);
      setData(response);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setError(error.message || "Failed to fetch destinations");
      toast({
        title: "Error",
        description: error.message || "Failed to fetch destinations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Destinations</h2>
            <p className="text-muted-foreground">
              Manage study destinations and their details
            </p>
          </div>
          <Button
            onClick={() => router.push("/private/dashboard/destinations/new")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Destination
          </Button>
        </div>

        <CardDestinationStats destinations={data.destinations} />
        
        <Separator />

        <DataTable
          columns={columns}
          data={data.destinations}
          searchKey="name"
          searchPlaceholder="Search destinations..."
          pagination={{
            ...data.pagination,
            onPageChange: (page) => fetchDestinations({ page }),
          }}
        />
      </div>
    </div>
  );
};
