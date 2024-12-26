"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DestinationForm from "../../components/DestinationForm";
import { getDestination } from "@/actions/destination";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditDestinationPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDestination();
  }, [params.destinationId]);

  async function fetchDestination() {
    try {
      setIsLoading(true);
      const data = await getDestination(params.destinationId);
      setDestination(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch destination. Please try again.",
        variant: "destructive",
      });
      router.push("/private/dashboard/destinations");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="gap-2"
              disabled
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[600px]" />
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
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
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
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
              Edit {destination.name}
            </h2>
            <p className="text-muted-foreground">
              Update destination information
            </p>
          </div>
        </div>
      </div>

      <DestinationForm 
        initialData={destination}
        onSuccess={() => {
          toast({
            title: "Success",
            description: "Destination updated successfully.",
          });
          router.push(`/private/dashboard/destinations/${destination._id}`);
          router.refresh();
        }}
        onError={(error) => {
          toast({
            title: "Error",
            description: error.message || "Failed to update destination. Please try again.",
            variant: "destructive",
          });
        }}
      />
    </div>
  );
} 