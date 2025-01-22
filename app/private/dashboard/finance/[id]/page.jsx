"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  ChevronLeft,
  Edit,
  Trash2,
  User,
  Building,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const TRANSACTION_TYPE = {
  income: {
    icon: ArrowUpRight,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  expense: {
    icon: ArrowDownRight,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
};

const TRANSACTION_CATEGORY = {
  "agent-commission": {
    label: "Agent Commission",
    icon: User,
  },
  "university-payment": {
    label: "University Payment",
    icon: Building,
  },
  "service-fee": {
    label: "Service Fee",
    icon: Wallet,
  },
};

async function getTransaction(id) {
  const res = await fetch(`/api/finance/transactions?transactionId=${id}`);
  if (!res.ok) throw new Error("Failed to fetch transaction");
  return res.json();
}

export default function TransactionDetailsPage({ params }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: transaction,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transaction", params.id],
    queryFn: () => getTransaction(params.id),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/finance/transactions?transactionId=${params.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete transaction");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      toast.success("Transaction deleted successfully");
      router.push("/private/dashboard/finance");
      router.refresh();
    },
    onError: (error) => {
      console.error("Error deleting transaction:", error);
      toast.error(error.message || "Something went wrong");
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} reset={() => window.location.reload()} />;
  }

  const typeConfig = TRANSACTION_TYPE[transaction.type];
  const categoryConfig = TRANSACTION_CATEGORY[transaction.category];
  const TypeIcon = typeConfig.icon;
  const CategoryIcon = categoryConfig.icon;

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
          <h2 className="text-3xl font-bold tracking-tight">Transaction Details</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/private/dashboard/finance/${params.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this transaction? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className={`rounded-full p-2 ${typeConfig.bgColor}`}>
                <TypeIcon className={`h-4 w-4 ${typeConfig.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className={`text-sm ${typeConfig.color}`}>
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="rounded-full p-2 bg-gray-100">
                <CategoryIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-sm text-muted-foreground">
                  {categoryConfig.label}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Amount</p>
              <p className={`text-2xl font-bold ${
                transaction.type === "income" ? "text-emerald-600" : "text-red-600"
              }`}>
                {transaction.type === "expense" && "-"}
                {transaction.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                {transaction.description}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Reference Number</p>
              <p className="text-sm text-muted-foreground">
                {transaction.reference || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(transaction.date), "PPP")}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge
                variant={
                  transaction.status === "completed"
                    ? "success"
                    : transaction.status === "pending"
                    ? "warning"
                    : "destructive"
                }
              >
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {transaction.agentId && (
              <div>
                <p className="text-sm font-medium">Related Agent</p>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <p className="text-sm text-muted-foreground">
                    {transaction.agentId.name}
                  </p>
                </div>
              </div>
            )}

            {transaction.leadId && (
              <div>
                <p className="text-sm font-medium">Related Lead</p>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <p className="text-sm text-muted-foreground">
                    {transaction.leadId.studentName}
                  </p>
                </div>
              </div>
            )}

            {transaction.notes && (
              <div>
                <p className="text-sm font-medium">Notes</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {transaction.notes}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Created on {format(new Date(transaction.createdAt), "PPP")}
              {transaction.updatedAt !== transaction.createdAt && 
                ` • Updated on ${format(new Date(transaction.updatedAt), "PPP")}`}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 