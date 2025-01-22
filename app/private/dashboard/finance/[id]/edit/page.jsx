"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionForm } from "../../components/transaction-form";
import { LoadingPage } from "@/components/loading";
import { ErrorPage } from "@/components/error";

async function getTransaction(id) {
  const res = await fetch(`/api/finance/transactions?transactionId=${id}`);
  if (!res.ok) throw new Error("Failed to fetch transaction");
  return res.json();
}

async function getAgents() {
  const res = await fetch("/api/agents");
  if (!res.ok) throw new Error("Failed to fetch agents");
  return res.json();
}

async function getLeads() {
  const res = await fetch("/api/leads");
  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json();
}

export default function EditTransactionPage({ params }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: transaction,
    isLoading: isLoadingTransaction,
    error: transactionError,
  } = useQuery({
    queryKey: ["transaction", params.id],
    queryFn: () => getTransaction(params.id),
  });

  const {
    data: agents = [],
    isLoading: isLoadingAgents,
    error: agentsError,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  const {
    data: leads = [],
    isLoading: isLoadingLeads,
    error: leadsError,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`/api/finance/transactions?transactionId=${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to update transaction");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["transaction", params.id]);
      toast.success("Transaction updated successfully");
      router.push("/private/dashboard/finance");
      router.refresh();
    },
    onError: (error) => {
      console.error("Error updating transaction:", error);
      toast.error(error.message || "Something went wrong");
    },
  });

  if (isLoadingTransaction || isLoadingAgents || isLoadingLeads) {
    return <LoadingPage />;
  }

  if (transactionError || agentsError || leadsError) {
    return (
      <ErrorPage 
        error={transactionError || agentsError || leadsError} 
        reset={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Edit Transaction</h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>
            Update transaction information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm
            defaultValues={{
              ...transaction,
              date: new Date(transaction.date),
            }}
            onSubmit={(data) => updateMutation.mutate(data)}
            isLoading={updateMutation.isLoading}
            agents={agents}
            leads={leads}
          />
        </CardContent>
      </Card>
    </div>
  );
} 