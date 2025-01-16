"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getUniversity } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import { ChevronLeft } from "lucide-react";
import UniversityForm from "../../components/UniversityForm";

export default function EditUniversityPage({ params }) {
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

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Edit University</h2>
              <p className="text-muted-foreground">
                Update university information
              </p>
            </div>
          </div>
        </div>

        <UniversityForm
          destinationId={destinationId}
          initialData={university}
        />
      </div>
    </div>
  );
} 