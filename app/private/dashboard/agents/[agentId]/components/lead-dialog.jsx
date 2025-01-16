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
import { LeadForm } from "./lead-form";

export function LeadDialog({ children, mode = "create", lead, agent }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(data) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/agents/${agent._id}/leads${mode === "edit" ? `?leadId=${lead._id}` : ""}`, {
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
          ? "Lead added successfully"
          : mode === "edit"
          ? "Lead updated successfully"
          : "Lead deleted successfully"
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
              ? "Add Lead"
              : mode === "edit"
              ? "Edit Lead"
              : "Delete Lead"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new lead to this agent."
              : mode === "edit"
              ? "Make changes to this lead."
              : "Are you sure you want to delete this lead? This action cannot be undone."}
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
              onClick={() => handleSubmit(lead)}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Lead"}
            </Button>
          </DialogFooter>
        ) : (
          <LeadForm
            lead={lead}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            mode={mode}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
