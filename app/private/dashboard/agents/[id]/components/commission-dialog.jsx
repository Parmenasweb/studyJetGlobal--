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
import { CommissionForm } from "./commission-form";

export function CommissionDialog({ agent, commission, trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Commission
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {commission ? "Edit Commission" : "Add Commission"}
          </DialogTitle>
          <DialogDescription>
            {commission
              ? "Update the commission details below."
              : "Enter the commission details below."}
          </DialogDescription>
        </DialogHeader>
        <CommissionForm
          agent={agent}
          commission={commission}
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
