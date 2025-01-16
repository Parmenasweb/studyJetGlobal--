"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { getScholarship } from "@/actions/scholarship";
import ScholarshipForm from "../../components/ScholarshipForm";


export default function EditScholarshipPage({ params }) {
  const router = useRouter();
  const { toast } = useToast();
  const [scholarship, setScholarship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadScholarship();
  }, []);

  async function loadScholarship() {
    try {
      setIsLoading(true);
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
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load scholarship",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={loadScholarship}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Edit Scholarship</h2>
        </div>
      </div>
      <Separator />
      {scholarship && (
        <ScholarshipForm
          destinationId={params.destinationId}
          universityId={params.universityId}
          initialData={scholarship}
        />
      )}
    </div>
  );
} 