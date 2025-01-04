"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { getUniversity } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import { ChevronLeft, GraduationCap, Award } from "lucide-react";
import Link from "next/link";

export default function UniversityDetailsPage({ params }) {
  const { destinationId, universityId } = params;
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    fetchUniversity();
  }, []);

  async function fetchUniversity() {
    try {
      setLoading(true);
      setError(null);
      const data = await getUniversity(destinationId, universityId);
      setUniversity(data);
    } catch (error) {
      console.error("Error fetching university:", error);
      setError(error.message || "Failed to fetch university");
      toast({
        title: "Error",
        description: error.message || "Failed to fetch university",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 space-y-4">
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
              <h2 className="text-3xl font-bold tracking-tight">{university.name}</h2>
              <p className="text-muted-foreground">
                View and manage university details
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Overview content */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link 
                href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`}
                className="block"
              >
                <div className="rounded-lg border p-4 hover:bg-accent transition-colors">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Programs</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {university.programs?.length || 0}
                  </p>
                </div>
              </Link>

              <Link 
                href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships`}
                className="block"
              >
                <div className="rounded-lg border p-4 hover:bg-accent transition-colors">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Scholarships</h3>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {university.scholarships?.length || 0}
                  </p>
                </div>
              </Link>
            </div>

            {/* University details */}
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">University Details</h3>
              {/* Add university details here */}
            </div>
          </TabsContent>

          <TabsContent value="programs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Programs</h3>
                <Link href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`}>
                  <Button>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    View All Programs
                  </Button>
                </Link>
              </div>
              {/* Programs preview or summary */}
            </div>
          </TabsContent>

          <TabsContent value="scholarships">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Scholarships</h3>
                <Link href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships`}>
                  <Button>
                    <Award className="mr-2 h-4 w-4" />
                    View All Scholarships
                  </Button>
                </Link>
              </div>
              {/* Scholarships preview or summary */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 