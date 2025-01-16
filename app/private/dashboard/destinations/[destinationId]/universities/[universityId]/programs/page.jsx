"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getPrograms, deleteProgram } from "@/actions/program";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function ProgramsPage({ params }) {
  const router = useRouter();
  const { toast } = useToast();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [programToDelete, setProgramToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter programs based on search query
  const filteredPrograms = programs.filter((program) =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadPrograms();
  }, []);

  async function loadPrograms() {
    try {
      const data = await getPrograms(params.destinationId, params.universityId);
      setPrograms(data);
    } catch (error) {
      console.error("Error loading programs:", error);
      toast({
        title: "Error",
        description: "Failed to load programs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(programId) {
    try {
      setIsDeleting(true);
      await deleteProgram(params.destinationId, params.universityId, programId);
      toast({
        title: "Success",
        description: "Program deleted successfully",
      });
      loadPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
      toast({
        title: "Error",
        description: "Failed to delete program. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setProgramToDelete(null);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={loadPrograms}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Programs</h2>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            </div>
          <Button
            onClick={() =>
              router.push(
                `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/programs/new`
              )
            }
          >
              <Plus className="mr-2 h-4 w-4" />
              Add Program
            </Button>
          </div>
        </div>

      {filteredPrograms.length === 0 && searchQuery ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-muted-foreground">No programs found matching your search</p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      ) : programs.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-muted-foreground">No programs found</p>
          <Button
            onClick={() =>
              router.push(
                `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/programs/new`
              )
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Program
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <Card key={program._id} className="relative p-6">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <CardTitle className="line-clamp-1">{program.name}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      {program.field}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={program.status === "active" ? "default" : "secondary"}
                    className={cn(
                      "ml-auto",
                      program.status === "active" 
                        ? "bg-emerald-500 hover:bg-emerald-600" 
                        : "bg-zinc-500 hover:bg-zinc-600"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        program.status === "active" 
                          ? "bg-emerald-200" 
                          : "bg-zinc-200"
                      )} />
                      {program.status === "active" ? "Active" : "Inactive"}
                    </div>
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(
                        `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/programs/${program._id}/edit`
                      );
                    }}
                    className="h-8 w-8 bg-background hover:bg-accent"
                  >
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      setProgramToDelete(program._id);
                    }}
                    className="h-8 w-8 bg-background hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Level:</span>
                    <span className="text-sm font-medium">{program.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <span className="text-sm font-medium">
                      {program.duration.value} {program.duration.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tuition Fee:</span>
                    <span className="text-sm font-medium">
                      {program.tuitionFee.amount.toLocaleString()} {program.tuitionFee.currency} per{" "}
                      {program.tuitionFee.period.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Language:</span>
                    <span className="text-sm font-medium">
                      {program.language.name} ({program.language.level})
                    </span>
                  </div>
                </div>

                {program.requirements?.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {program.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {program.intakes?.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Intakes</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.intakes.map((intake) => (
                        <Badge key={intake} variant="secondary" className="text-xs">
                          {intake}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
      )}

      <AlertDialog open={programToDelete !== null} onOpenChange={() => setProgramToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Program</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this program? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleDelete(programToDelete)}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 