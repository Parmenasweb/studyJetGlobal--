"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft } from "lucide-react";
import ProgramForm from "../../components/ProgramForm";
import { getProgram, editProgram } from "@/actions/program";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";

export default function EditProgramPage({ params }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [program, setProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProgram();
  }, []);

  async function fetchProgram() {
    try {
      setLoading(true);
      setError(null);
      const data = await getProgram(params.programId);
      setProgram(data);
    } catch (error) {
      console.error("Error fetching program:", error);
      setError(error.message || "Failed to fetch program");
      toast({
        title: "Error",
        description: error.message || "Failed to fetch program",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      await editProgram(params.programId, data);
      toast.success("Program updated successfully");
      router.push("/private/dashboard/programs");
    } catch (error) {
      console.error("Error updating program:", error);
      toast.error("Failed to update program");
    } finally {
      setIsLoading(false);
    }
  }

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
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
              <h2 className="text-3xl font-bold tracking-tight">Edit Program</h2>
              <p className="text-muted-foreground">
                Update program information
              </p>
            </div>
          </div>
        </div>

        <ProgramForm
          initialData={program}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
} 