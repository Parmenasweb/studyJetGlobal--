"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getScholarship } from "@/actions/destination";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ScholarshipDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    async function loadScholarship() {
      try {
        setLoading(true);
        setError(null);
        const data = await getScholarship(
          params.destinationId,
          params.universityId,
          params.scholarshipId
        );
        setScholarship(data);
      } catch (error) {
        console.error("Error loading scholarship:", error);
        setError(error.message || "Failed to load scholarship");
        toast({
          title: "Error",
          description: error.message || "Failed to load scholarship",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadScholarship();
  }, [params.destinationId, params.universityId, params.scholarshipId, toast]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (!scholarship) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Scholarship Not Found</h1>
          <p className="text-muted-foreground">
            The scholarship you are looking for does not exist.
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
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {scholarship.name}
              </h2>
              <p className="text-muted-foreground">
                View scholarship details and information
              </p>
            </div>
          </div>
          <Button
            onClick={() =>
              router.push(
                `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/scholarships/${params.scholarshipId}/edit`
              )
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Scholarship
          </Button>
        </div>
        <Separator />

        <div className="grid gap-6">
          {/* Status and Basic Info */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  variant={
                    scholarship.status === "active"
                      ? "success"
                      : scholarship.status === "upcoming"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {scholarship.status.charAt(0).toUpperCase() +
                    scholarship.status.slice(1)}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {formatCurrency(scholarship.amount)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Coverage: {scholarship.coverage}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deadline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">
                  {scholarship.deadline
                    ? formatDate(scholarship.deadline)
                    : "No deadline"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {scholarship.description}
              </p>
            </CardContent>
          </Card>

          {/* Eligibility Criteria */}
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {scholarship.criteria}
              </p>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card>
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {scholarship.applicationProcess}
              </p>
            </CardContent>
          </Card>

          {/* Required Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-1">
                {scholarship.requiredDocuments?.map((doc, index) => (
                  <li key={index} className="text-muted-foreground">
                    {doc}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 