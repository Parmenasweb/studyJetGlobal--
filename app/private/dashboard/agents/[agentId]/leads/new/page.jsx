"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { LeadForm } from "../../components/lead-form";
import { CommissionForm } from "../../components/commission-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function NewLeadPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("lead");
  const [createdLead, setCreatedLead] = useState(null);

  const { data: agent, isLoading, error } = useQuery({
    queryKey: ["agent", params.agentId],
    queryFn: () => getAgent(params.agentId),
  });

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage error={error.message} />;

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
          <h1 className="text-2xl font-bold">New Lead</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="lead">Lead Details</TabsTrigger>
          <TabsTrigger value="commission" disabled={!createdLead}>
            Commission Details
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lead">
          <Card className="p-6">
            <LeadForm
              agent={agent}
              onSuccess={(lead) => {
                setCreatedLead(lead);
                setActiveTab("commission");
              }}
            />
          </Card>
        </TabsContent>
        <TabsContent value="commission">
          {createdLead && (
            <Card className="p-6">
              <CommissionForm
                agent={{
                  ...agent,
                  leads: [...agent.leads, createdLead],
                }}
                onSuccess={() => {
                  router.push(`/private/dashboard/agents/${params.agentId}`);
                }}
              />
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 