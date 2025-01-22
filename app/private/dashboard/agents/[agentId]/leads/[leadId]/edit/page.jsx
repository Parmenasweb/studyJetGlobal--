"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { LeadForm } from "../../../components/lead-form";
import { Card } from "@/components/ui/card";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";

async function getAgent(id) {
  const res = await fetch(`/api/agents/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch agent");
  }
  return res.json();
}

async function getLead(agentId, leadId) {
  const res = await fetch(`/api/agents/${agentId}/leads/${leadId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch lead");
  }
  return res.json();
}

export default function EditLeadPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { data: agent, isLoading: isLoadingAgent, error: agentError } = useQuery({
    queryKey: ["agent", params.agentId],
    queryFn: () => getAgent(params.agentId),
  });

  const { data: lead, isLoading: isLoadingLead, error: leadError } = useQuery({
    queryKey: ["lead", params.agentId, params.leadId],
    queryFn: () => getLead(params.agentId, params.leadId),
    enabled: !!params.agentId && !!params.leadId,
  });

  if (isLoadingAgent || isLoadingLead) return <LoadingPage />;
  if (agentError || leadError) return <ErrorPage error={agentError?.message || leadError?.message} />;

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/private/dashboard/agents/${params.agentId}`)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Lead</h1>
        </div>
      </div>

      <Card className="p-6">
        <LeadForm
          agent={agent}
          lead={lead}
          onSuccess={() => {
            router.push(`/private/dashboard/agents/${params.agentId}`);
          }}
        />
      </Card>
    </div>
  );
} 