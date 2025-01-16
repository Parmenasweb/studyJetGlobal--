"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CommissionForm } from "./commission-form";

export function CommissionDialog({ children, mode = "create", commission, agent }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(data) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/agents/${agent._id}/commissions${mode === "edit" ? `?commissionId=${commission._id}` : ""}`, {
        method: mode === "create" ? "POST" : mode === "edit" ? "PUT" : "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Something went wrong");
      }

      toast.success(
        mode === "create"
          ? "Commission added successfully"
          : mode === "edit"
          ? "Commission updated successfully"
          : "Commission deleted successfully"
      );

      setOpen(false);
      // Refresh the page data and redirect back to the agent details page
      router.refresh();
      router.push(`/private/dashboard/agents/${agent._id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Add Commission"
              : mode === "edit"
              ? "Edit Commission"
              : "Delete Commission"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new commission for this agent."
              : mode === "edit"
              ? "Make changes to this commission."
              : "Are you sure you want to delete this commission? This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>

        {mode === "delete" ? (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleSubmit(commission)}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Commission"}
            </Button>
          </DialogFooter>
        ) : (
          <CommissionForm
            commission={commission}
            agent={agent}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            mode={mode}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
