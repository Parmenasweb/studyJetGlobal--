"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScholarshipForm } from "../components/ScholarshipForm";

export default function NewScholarshipPage() {
  const router = useRouter();
  const params = useParams();

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
                Add New Scholarship
              </h2>
              <p className="text-muted-foreground">
                Create a new scholarship for this university
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <ScholarshipForm
          destinationId={params.destinationId}
          universityId={params.universityId}
        />
      </div>
    </div>
  );
} 