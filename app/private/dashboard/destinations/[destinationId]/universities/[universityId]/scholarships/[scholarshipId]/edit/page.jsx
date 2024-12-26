"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ScholarshipForm from "../../components/ScholarshipForm";
import { getScholarship } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";

export default function EditScholarshipPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    async function loadScholarship() {
      try {
        setLoading(true);
        setError(null);
        const data = await getScholarship(
          params.destinationId,
          params.universityId,
          params.scholarshipId
        );
        setScholarship(data);
      } catch (error) {
        console.error("Error loading scholarship:", error);
        setError(error.message || "Failed to load scholarship");
        toast({
          title: "Error",
          description: error.message || "Failed to load scholarship",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadScholarship();
  }, [params.destinationId, params.universityId, params.scholarshipId, toast]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (!scholarship) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Scholarship Not Found</h1>
          <p className="text-muted-foreground">
            The scholarship you are looking for does not exist.
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
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Edit Scholarship
              </h2>
              <p className="text-muted-foreground">
                Update scholarship details for {scholarship.name}
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <ScholarshipForm
          destinationId={params.destinationId}
          universityId={params.universityId}
          initialData={scholarship}
        />
      </div>
    </div>
  );
} 