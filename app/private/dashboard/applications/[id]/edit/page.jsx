"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import ApplicationEditForm from "@/components/forms/ApplicationEditForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

async function getApplication(id) {
  const res = await fetch(`/api/applications/${id}`);
  if (!res.ok) throw new Error("Failed to fetch application");
  return res.json();
}

export default function EditApplicationPage() {
  const params = useParams();
  const router = useRouter();

  const { data: application, isLoading, error } = useQuery({
    queryKey: ["application", params.id],
    queryFn: () => getApplication(params.id),
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to fetch application");
    }
  }, [error]);

  const handleSubmit = async (data) => {
    try {
      const res = await fetch(`/api/applications/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to update application");
      }

      toast.success("Application updated successfully");
      router.push(`/private/dashboard/applications/${params.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error(error.message || "Failed to update application");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2">
        <p className="text-sm text-muted-foreground">
          {error.message || "Something went wrong"}
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Edit Application</h2>
            <p className="text-sm text-muted-foreground">
              Update application details
            </p>
          </div>
        </div>
      </div>

      <ApplicationEditForm
        initialData={application}
        onSubmit={handleSubmit}
      />
    </div>
  );
} 