"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft } from "lucide-react";
import ProgramForm from "../components/ProgramForm";

export default function NewProgramPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create program");
      }

      toast({
        title: "Success",
        description: "Program created successfully",
      });
      router.refresh();
      router.push("/private/dashboard/programs");
    } catch (error) {
      console.error("Error creating program:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create program",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">New Program</h2>
              <p className="text-muted-foreground">
                Create a new academic program
              </p>
            </div>
          </div>
        </div>

        <ProgramForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
} 