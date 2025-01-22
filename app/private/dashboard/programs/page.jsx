"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useToast } from "@/components/ui/use-toast";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import { MetricsCards } from "./components/metrics";

export default function ProgramsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [programs, setPrograms] = useState([]);

  async function fetchPrograms() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/programs");
      if (!response.ok) {
        throw new Error("Failed to fetch programs");
      }
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
      setError(error.message || "Failed to fetch programs");
      toast({
        title: "Error",
        description: error.message || "Failed to fetch programs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPrograms();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">studyjetGlobal Programs</h2>
            <p className="text-muted-foreground">
              Manage academic programs
            </p>
          </div>
          <Button
            onClick={() => router.push("/private/dashboard/programs/new")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Program
          </Button>
        </div>

        <MetricsCards programs={programs} />

        <DataTable
          columns={columns}
          data={programs}
          searchKey="name"
          searchPlaceholder="Search programs..."
        />
      </div>
    </div>
  );
} 