"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useToast } from "@/components/ui/use-toast";
import { getDestination } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import { ChevronLeft, Plus } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { scholarshipColumns } from "./components/columns";
import { ScholarshipForm } from "./components/ScholarshipForm";

export default function DestinationScholarshipsPage({ params }) {
  const { destinationId } = params;
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchDestination();
  }, []);

  async function fetchDestination() {
    try {
      setLoading(true);
      setError(null);
      const data = await getDestination(destinationId);
      setDestination(data);
    } catch (error) {
      console.error("Error fetching destination:", error);
      setError(error.message || "Failed to fetch destination");
      toast({
        title: "Error",
        description: error.message || "Failed to fetch destination",
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
      label: destination.name, 
      href: `/private/dashboard/destinations/${destinationId}` 
    },
    { label: "Scholarships", href: "#" },
  ];

  // Get all scholarships from universities
  const allScholarships = destination.universities?.reduce((acc, university) => {
    const universityScholarships = university.scholarships?.map(scholarship => ({
      ...scholarship,
      universityName: university.name,
      universityId: university._id,
    })) || [];
    return [...acc, ...universityScholarships];
  }, []) || [];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Scholarships</h2>
              <p className="text-muted-foreground">
                View all scholarships for {destination.name}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <DataTable
          columns={scholarshipColumns}
          data={allScholarships}
          searchKey="name"
          searchPlaceholder="Search scholarships..."
        />
      </div>
    </div>
  );
} 