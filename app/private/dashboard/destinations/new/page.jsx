"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DestinationForm from "../components/DestinationForm";
import { useToast } from "@/components/ui/use-toast";

export default function NewDestinationPage() {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">New Destination</h2>
          <p className="text-muted-foreground">
            Add a new study destination to the system
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <DestinationForm 
          onSuccess={() => {
            toast({
              title: "Success",
              description: "Destination created successfully.",
            });
            router.push("/private/dashboard/destinations");
            router.refresh();
          }}
          onError={(error) => {
            toast({
              title: "Error",
              description: error.message || "Failed to create destination. Please try again.",
              variant: "destructive",
            });
          }}
        />
      </div>
    </div>
  );
} 