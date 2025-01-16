"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { getProgram } from "@/actions/program";
import ProgramForm from "../../components/ProgramForm";

export default function EditProgramPage({ params }) {
  const router = useRouter();
  const { toast } = useToast();
  const [program, setProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProgram();
  }, []);

  async function loadProgram() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProgram(
        params.destinationId,
        params.universityId,
        params.programId
      );
      setProgram(data);
    } catch (error) {
      console.error("Error loading program:", error);
      setError(error.message || "Failed to load program");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load program",
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
        <Button onClick={loadProgram}>Try Again</Button>
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
          <h2 className="text-3xl font-bold tracking-tight">Edit Program</h2>
        </div>
      </div>
      <Separator />
      {program && (
        <ProgramForm
          destinationId={params.destinationId}
          universityId={params.universityId}
          initialData={program}
        />
      )}
    </div>
  );
} 