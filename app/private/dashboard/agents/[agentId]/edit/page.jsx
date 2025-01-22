"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import { AgentForm } from "../../components/agent-form";

async function getAgent(id) {
  try {
    const response = await fetch(`/api/agents/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch agent");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching agent:", error);
    throw error;
  }
}

export default function EditAgentPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data: agent, isLoading: isFetching, isError } = useQuery({
    queryKey: ["agent", params.agentId],
    queryFn: () => getAgent(params.agentId),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      // Only include fields that are being edited
      const updateData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        country: data.country,
        address: data.address,
        company: data.company,
        status: data.status,
        baseCommission: data.baseCommission,
        bankDetails: data.bankDetails,
        notes: data.notes
      };

      const response = await fetch(`/api/agents/${params.agentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update agent");
      }

      toast.success("Agent updated successfully");
      router.push(`/private/dashboard/agents/${params.agentId}`);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Agent</h1>
          <p className="text-muted-foreground">Update agent details</p>
        </div>
      </div>

      <AgentForm 
        initialData={agent}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
