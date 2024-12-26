"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Edit, Globe, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUniversity } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";

export default function UniversityDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    async function loadUniversity() {
      try {
        const data = await getUniversity(params.destinationId, params.universityId);
        setUniversity(data);
      } catch (error) {
        setError(error.message || "Failed to load university");
        toast({
          title: "Error",
          description: error.message || "Failed to load university",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadUniversity();
  }, [params.destinationId, params.universityId, toast]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (!university) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">University Not Found</h1>
          <p className="text-muted-foreground">
            The university you are looking for does not exist.
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
            <h2 className="text-3xl font-bold tracking-tight">
              {university.name}
            </h2>
            <p className="text-muted-foreground">{university.location}</p>
          </div>
          <Button
            onClick={() =>
              router.push(
                `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/edit`
              )
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Edit University
          </Button>
        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant={university.type === "public" ? "default" : "secondary"}>
                  {university.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Ranking:</span>
                <span>{university.ranking || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge
                  variant={university.status === "active" ? "success" : "secondary"}
                >
                  {university.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {university.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
              {university.contactEmail && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${university.contactEmail}`}
                    className="text-primary hover:underline"
                  >
                    {university.contactEmail}
                  </a>
                </div>
              )}
              {university.contactPhone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${university.contactPhone}`}
                    className="text-primary hover:underline"
                  >
                    {university.contactPhone}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {university.facilities?.map((facility, index) => (
                  <Badge key={index} variant="outline">
                    {facility}
                  </Badge>
                ))}
                {(!university.facilities || university.facilities.length === 0) && (
                  <span className="text-muted-foreground">No facilities listed</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {university.description || "No description available"}
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="programs" className="w-full">
          <TabsList>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>
          <TabsContent value="programs" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Programs</h3>
              <Button
                onClick={() =>
                  router.push(
                    `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/programs/new`
                  )
                }
              >
                Add Program
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {university.programs?.map((program) => (
                <Card key={program._id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge variant={program.status === "active" ? "success" : "secondary"}>
                        {program.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span>{program.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tuition Fee:</span>
                      <span>${program.tuitionFee.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {(!university.programs || university.programs.length === 0) && (
                <p className="text-muted-foreground">No programs available</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="scholarships" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Scholarships</h3>
              <Button
                onClick={() =>
                  router.push(
                    `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/scholarships/new`
                  )
                }
              >
                Add Scholarship
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {university.scholarships?.map((scholarship) => (
                <Card key={scholarship._id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                      <Badge variant={scholarship.status === "active" ? "success" : "secondary"}>
                        {scholarship.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span>${scholarship.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="outline">{scholarship.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Coverage:</span>
                      <Badge variant="outline">{scholarship.coverage}</Badge>
                    </div>
                    {scholarship.deadline && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Deadline:</span>
                        <span>{new Date(scholarship.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {(!university.scholarships || university.scholarships.length === 0) && (
                <p className="text-muted-foreground">No scholarships available</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 