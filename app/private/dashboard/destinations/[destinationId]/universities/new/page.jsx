"use client";

import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import UniversityForm from "../components/UniversityForm";

export default function NewUniversityPage() {
  const params = useParams();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add University</h2>
          <p className="text-muted-foreground">
            Create a new university for this destination
          </p>
        </div>
        <Separator />
        <UniversityForm destinationId={params.destinationId} />
      </div>
    </div>
  );
} 