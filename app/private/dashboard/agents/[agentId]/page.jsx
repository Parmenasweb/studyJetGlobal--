"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Wallet,
  FileText,
  BarChart3,
  ChevronLeft,
  Edit,
  Trash,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";
import { LeadsTable } from "./components/leads-table";
import { CommissionsTable } from "./components/commissions-table";
import { AgentOverview } from "./components/agent-overview";


// Status badge variants
const statusVariants = {
  active: {
    variant: "success",
    icon: CheckCircle2,
    label: "Active",
  },
  inactive: {
    variant: "secondary",
    icon: Clock,
    label: "Inactive",
  },
  suspended: {
    variant: "destructive",
    icon: XCircle,
    label: "Suspended",
  },
};

// Commission type badge variants
const commissionVariants = {
  percentage: {
    variant: "default",
    label: "Percentage",
  },
  fixed: {
    variant: "outline",
    label: "Fixed Amount",
  },
};

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

async function getAgentCommissions(id) {
  try {
    const response = await fetch(`/api/agents/${id}/commissions`);
    if (!response.ok) {
      throw new Error("Failed to fetch commissions");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching commissions:", error);
    throw error;
  }
}

export default function AgentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: agent, isLoading: isLoadingAgent, isError: isAgentError } = useQuery({
    queryKey: ["agent", params.agentId],
    queryFn: () => getAgent(params.agentId),
  });

  const { data: commissions, isLoading: isLoadingCommissions } = useQuery({
    queryKey: ["commissions", params.agentId],
    queryFn: () => getAgentCommissions(params.agentId),
    enabled: !!params.agentId,
  });

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/agents/${params.agentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete agent");
      }

      toast.success("Agent deleted successfully");
      router.push("/private/dashboard/agents");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoadingAgent) {
    return <LoadingPage />;
  }

  if (isAgentError) {
    return <ErrorPage />;
  }

  const StatusBadge = ({ status }) => {
    const { variant, icon: Icon, label } = statusVariants[status];
    return (
      <Badge variant={variant} className="h-6">
        <Icon className="w-4 h-4 mr-1" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="w-full py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{agent.name}</h1>
        <Button
          onClick={() => router.push(`/private/dashboard/agents/${params.agentId}/leads/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Lead
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <AgentOverview agent={agent} />
        </TabsContent>
        <TabsContent value="leads">
          <LeadsTable agent={agent} />
        </TabsContent>
        <TabsContent value="commissions">
          <CommissionsTable 
            agent={agent} 
            commissions={commissions} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
