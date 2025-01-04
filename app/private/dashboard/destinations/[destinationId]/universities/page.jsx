"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, School, Award, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDestination } from "@/actions/destination";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";

export default function UniversitiesPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    fetchDestination();
  }, [params.destinationId]);

  async function fetchDestination() {
    try {
      setLoading(true);
      setError(null);
      const data = await getDestination(params.destinationId);
      setDestination(data);
    } catch (error) {
      console.error("Error fetching destination:", error);
      setError(error.message || "Failed to fetch destination");
      toast({
        title: "Error",
        description: error.message || "Failed to fetch destination",
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

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Destination Not Found</h1>
          <p className="text-muted-foreground">
            The destination you are looking for does not exist.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Universities</h2>
            <p className="text-muted-foreground">
              Manage universities for {destination.name}
            </p>
          </div>
          <Button
            onClick={() =>
              router.push(`/private/dashboard/destinations/${params.destinationId}/universities/new`)
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add University
          </Button>
        </div>
        <Separator />

        {destination.universities?.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <School className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No Universities Yet</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              Start by adding universities to {destination.name}. Click the &quot;Add University button&quot; above to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destination.universities?.map((university) => (
              <Link
                key={university._id}
                href={`/private/dashboard/destinations/${params.destinationId}/universities/${university._id}`}
              >
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="aspect-video relative mb-4 rounded-lg overflow-hidden bg-muted">
                      {university.media?.mainImage ? (
                        <Image
                          src={university.media.mainImage.url}
                          alt={university.media.mainImage.alt || university.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <School className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <Badge
                        variant={university.status === "active" ? "success" : "secondary"}
                        className="absolute top-2 right-2"
                      >
                        {university.status}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold truncate">{university.name}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{university.location}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {university.ranking ? `Rank: ${university.ranking}` : "Unranked"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {university.programs?.length || 0} Programs
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}