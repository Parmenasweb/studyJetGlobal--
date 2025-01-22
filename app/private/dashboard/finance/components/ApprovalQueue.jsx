"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

async function getPendingApprovals() {
  const [expenseRes, incomeRes] = await Promise.all([
    fetch("/api/finance/expense/approve"),
    fetch("/api/finance/income/verify")
  ]);

  if (!expenseRes.ok || !incomeRes.ok) {
    throw new Error("Failed to fetch pending approvals");
  }

  const [expenses, income] = await Promise.all([
    expenseRes.json(),
    incomeRes.json()
  ]);

  return {
    expenses,
    income
  };
}

export function ApprovalQueue() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);
  const [approvalNotes, setApprovalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["pending-approvals"],
    queryFn: getPendingApprovals
  });

  const handleApprove = async () => {
    if (!selectedItem) return;

    setIsSubmitting(true);
    try {
      const endpoint = selectedItem.type === "expense" 
        ? "/api/finance/expense/approve"
        : "/api/finance/income/verify";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: selectedItem._id,
          notes: approvalNotes
        })
      });

      if (!res.ok) {
        throw new Error("Failed to approve item");
      }

      toast.success(
        selectedItem.type === "expense"
          ? "Expense approved successfully"
          : "Income verified successfully"
      );

      setSelectedItem(null);
      setApprovalNotes("");
      refetch();
    } catch (error) {
      console.error("Error approving item:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">
              {error.message || "Failed to load pending approvals"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { expenses = [], income = [] } = data || {};
  const totalPending = expenses.length + income.length;

  if (totalPending === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>
            No items pending approval
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>
            {totalPending} {totalPending === 1 ? "item" : "items"} pending approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense._id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Expense</Badge>
                    <span className="font-medium">
                      {expense.formattedAmount}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {expense.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Created by {expense.createdBy.name}</span>
                    <span>•</span>
                    <span>{format(new Date(expense.date), "PPP")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/private/dashboard/finance/expense/${expense._id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => setSelectedItem({ ...expense, type: "expense" })}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ))}

            {income.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Income</Badge>
                    <span className="font-medium">
                      {item.formattedAmount}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Created by {item.createdBy.name}</span>
                    <span>•</span>
                    <span>{format(new Date(item.date), "PPP")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/private/dashboard/finance/income/${item._id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => setSelectedItem({ ...item, type: "income" })}
                  >
                    Verify
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.type === "expense" ? "Approve Expense" : "Verify Income"}
            </DialogTitle>
            <DialogDescription>
              Please review the details and add any notes before {selectedItem?.type === "expense" ? "approving" : "verifying"}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="font-medium">Amount</p>
              <p className="text-sm text-muted-foreground">
                {selectedItem?.formattedAmount}
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                {selectedItem?.description}
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="font-medium">
                Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Add any notes or comments..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedItem(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {selectedItem?.type === "expense" ? "Approve" : "Verify"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 