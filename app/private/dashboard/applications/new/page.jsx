"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ApplicationForm from "@/components/forms/ApplicationForm";
import { toast } from "sonner";

export default function NewApplicationPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create application");
      }

      const result = await response.json();
      router.push(`/private/dashboard/applications/${result.applicationId}`);
      router.refresh();
    } catch (error) {
      console.error("Error creating application:", error);
      toast.error(error.message || "Failed to create application");
      throw error;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-semibold tracking-tight">New Application</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Create a new application for a client
          </p>
        </div>
      </div>

      <ApplicationForm onSubmit={handleSubmit} />
    </div>
  );
} 