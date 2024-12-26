"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ApplicationForm from "../../components/ApplicationForm";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditApplicationPage() {
  const params = useParams();
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const res = await fetch(`/api/applications/${params.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch application");
        }
        const data = await res.json();
        setApplication(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplication();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2">
        <p className="text-sm text-muted-foreground">
          {error}
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Application</h2>
      </div>

      <ApplicationForm initialData={application} />
    </div>
  );
} 