"use client";

import { Suspense } from "react";
import ApplicationForm from "../components/ApplicationForm";
import { Loader2 } from "lucide-react";

export default function NewApplicationPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Application</h2>
      </div>

      <Suspense
        fallback={
          <div className="flex h-[200px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <ApplicationForm />
      </Suspense>
    </div>
  );
} 