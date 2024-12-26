"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import UniversityForm from "../../components/UniversityForm";
import { getUniversity } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";

export default function EditUniversityPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    async function loadUniversity() {
      try {
        const data = await getUniversity(params.destinationId, params.universityId);
        setUniversity(data);
      } catch (error) {
        setError(error.message || "Failed to load university");
        toast({
          title: "Error",
          description: error.message || "Failed to load university",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadUniversity();
  }, [params.destinationId, params.universityId, toast]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (!university) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">University Not Found</h1>
          <p className="text-muted-foreground">
            The university you are looking for does not exist.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit University</h2>
          <p className="text-muted-foreground">
            Update university information
          </p>
        </div>
        <Separator />
        <UniversityForm
          destinationId={params.destinationId}
          university={university}
        />
      </div>
    </div>
  );
} 