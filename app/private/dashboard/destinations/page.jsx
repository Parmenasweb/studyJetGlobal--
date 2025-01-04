"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { createColumns } from "./components/columns";
import { getDestinations } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import CardDestinationStats from "./components/CardDestinationStats";
import Link from "next/link";

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

  const fetchDestinations = async (query = {}) => {
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
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleDelete = async () => {
    await fetchDestinations({ page: data.pagination.page });
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  // Format the data for the table
  const formattedDestinations = data.destinations.map(destination => ({
    id: destination._id.toString(),
    name: destination.name,
    countryCode: destination.countryCode,
    capital: destination.capital,
    status: destination.status,
    universities: destination.universities?.length || 0,
    programs: destination.programs?.length || 0,
    scholarships: destination.scholarships?.length || 0,
    studyInfo: {
      averageTuitionFee: destination.studyInfo?.averageTuitionFee,
      academicYear: destination.studyInfo?.academicYear,
    },
    quickFacts: {
      population: destination.quickFacts?.population,
      language: destination.quickFacts?.language,
      currency: destination.quickFacts?.currency,
      internationalStudents: destination.quickFacts?.internationalStudents,
    },
    statistics: {
      studentSatisfactionRate: destination.statistics?.studentSatisfactionRate,
      employmentRate: destination.statistics?.employmentRate,
      visaSuccessRate: destination.statistics?.visaSuccessRate,
    },
    createdAt: destination.createdAt ? new Date(destination.createdAt).toLocaleDateString() : 'N/A',
    updatedAt: destination.updatedAt ? new Date(destination.updatedAt).toLocaleDateString() : 'N/A',
  }));

  const columns = createColumns(handleDelete);

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
          <Link href="/private/dashboard/destinations/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Destination
            </Button>
          </Link>
        </div>

        <CardDestinationStats destinations={data.destinations} />
        
        <Separator />

        <DataTable
          columns={columns}
          data={formattedDestinations}
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
}
