"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LeadForm } from "./lead-form";

export function LeadDialog({ agent, lead, trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{lead ? "Edit Lead" : "Add Lead"}</DialogTitle>
          <DialogDescription>
            {lead
              ? "Update the lead details below."
              : "Enter the lead details below."}
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          agent={agent}
          lead={lead}
          onSuccess={() => {
            // Close the dialog by clicking the close button
            const closeButton = document.querySelector(
              '[data-dialog-close="true"]'
            );
            closeButton?.click();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
