"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
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
import { TransactionForm } from "../components/transaction-form";

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

// Function to generate a unique transaction ID
function generateTransactionId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `TRX-${timestamp}-${random}`;
}

export default function NewTransactionPage() {
  const router = useRouter();

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

  const handleSubmit = async (data) => {
    try {
      // Add transaction ID and status if not present
      const transactionData = {
        ...data,
        transactionId: data.transactionId || generateTransactionId(),
        status: data.status || "pending",
      };

      const res = await fetch("/api/finance/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create transaction");
      }

      toast.success("Transaction created successfully");
      router.push("/private/dashboard/finance");
      router.refresh();
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

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
          <h2 className="text-3xl font-bold tracking-tight">New Transaction</h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>
            Create a new financial transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm
            onSubmit={handleSubmit}
            agents={agents}
            leads={leads}
            isLoading={isLoadingAgents || isLoadingLeads}
          />
        </CardContent>
      </Card>
    </div>
  );
} 