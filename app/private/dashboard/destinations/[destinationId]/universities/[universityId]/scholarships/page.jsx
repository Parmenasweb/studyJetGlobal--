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
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getScholarships, deleteScholarship } from "@/actions/scholarship";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function ScholarshipsPage({ params }) {
  const router = useRouter();
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scholarshipToDelete, setScholarshipToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter scholarships based on search query
  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadScholarships();
  }, []);

  async function loadScholarships() {
    try {
      const data = await getScholarships(params.destinationId, params.universityId);
      setScholarships(data);
    } catch (error) {
      console.error("Error loading scholarships:", error);
      toast({
        title: "Error",
        description: "Failed to load scholarships. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(scholarshipId) {
    try {
      setIsDeleting(true);
      await deleteScholarship(params.destinationId, params.universityId, scholarshipId);
      toast({
        title: "Success",
        description: "Scholarship deleted successfully",
      });
      loadScholarships();
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      toast({
        title: "Error",
        description: "Failed to delete scholarship. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setScholarshipToDelete(null);
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
        <Button onClick={loadScholarships}>Retry</Button>
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
          <h2 className="text-3xl font-bold tracking-tight">Scholarships</h2>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search scholarships..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            </div>
          <Button
            onClick={() =>
              router.push(
                `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/scholarships/new`
              )
            }
          >
              <Plus className="mr-2 h-4 w-4" />
              Add Scholarship
            </Button>
          </div>
        </div>

      {filteredScholarships.length === 0 && searchQuery ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-muted-foreground">No scholarships found matching your search</p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-muted-foreground">No scholarships found</p>
          <Button
            onClick={() =>
              router.push(
                `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/scholarships/new`
              )
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Scholarship
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredScholarships.map((scholarship) => (
            <Card key={scholarship._id} className="relative p-6">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <CardTitle className="line-clamp-1">{scholarship.name}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      {scholarship.type}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={scholarship.status === "active" ? "default" : "secondary"}
                    className={cn(
                      "ml-auto",
                      scholarship.status === "active" 
                        ? "bg-emerald-500 hover:bg-emerald-600" 
                        : "bg-zinc-500 hover:bg-zinc-600"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        scholarship.status === "active" 
                          ? "bg-emerald-200" 
                          : "bg-zinc-200"
                      )} />
                      {scholarship.status === "active" ? "Active" : "Inactive"}
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
                        `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/scholarships/${scholarship._id}/edit`
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
                      setScholarshipToDelete(scholarship._id);
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
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="text-sm font-medium">
                      {scholarship.amount.type === "fixed" 
                        ? `${scholarship.amount.value.toLocaleString()} ${scholarship.amount.currency}`
                        : `${scholarship.amount.value}%`}
                      {" "}per{" "}
                      {scholarship.amount.period.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Deadline:</span>
                    <span className="text-sm font-medium">
                      {new Date(scholarship.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {scholarship.coverage?.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Coverage</h4>
                    <div className="flex flex-wrap gap-2">
                      {scholarship.coverage.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {scholarship.eligibility?.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Eligibility</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {scholarship.eligibility.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {scholarship.applicationProcess?.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Application Process</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {scholarship.applicationProcess.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
      )}

      <AlertDialog open={scholarshipToDelete !== null} onOpenChange={() => setScholarshipToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Scholarship</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this scholarship? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleDelete(scholarshipToDelete)}
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