"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useToast } from "@/components/ui/use-toast";
import { getUniversity } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import { ChevronLeft, Plus } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { scholarshipColumns } from "./components/columns";

export default function UniversityScholarshipsPage({ params }) {
  const { destinationId, universityId } = params;
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    fetchUniversity();
  }, []);

  async function fetchUniversity() {
    try {
      setLoading(true);
      setError(null);
      const data = await getUniversity(destinationId, universityId);
      setUniversity(data);
    } catch (error) {
      console.error("Error fetching university:", error);
      setError(error.message || "Failed to fetch university");
      toast({
        title: "Error",
        description: error.message || "Failed to fetch university",
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

  const breadcrumbItems = [
    { label: "Dashboard", href: "/private/dashboard" },
    { label: "Destinations", href: "/private/dashboard/destinations" },
    { 
      label: university.destination?.name || "Destination", 
      href: `/private/dashboard/destinations/${destinationId}` 
    },
    { 
      label: university.name, 
      href: `/private/dashboard/destinations/${destinationId}/universities/${universityId}` 
    },
    { label: "Scholarships", href: "#" },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Scholarships</h2>
              <p className="text-muted-foreground">
                Manage scholarships for {university.name}
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Scholarship
            </Button>
          </div>
        </div>

        <Separator />

        <DataTable
          columns={scholarshipColumns}
          data={university.scholarships || []}
          searchKey="name"
          searchPlaceholder="Search scholarships..."
        />
      </div>
    </div>
  );
} 