"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import ScholarshipForm from "../components/ScholarshipForm";

export default function NewScholarshipPage({ params }) {
  const router = useRouter();

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
          <h2 className="text-3xl font-bold tracking-tight">Add Scholarship</h2>
        </div>
      </div>
      <Separator />
      <ScholarshipForm
        destinationId={params.destinationId}
        universityId={params.universityId}
      />
    </div>
  );
} 