"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteConsultation } from "@/actions/consultation";
import { useRouter } from "next/navigation";

export default function DeleteConsultationDialog({ open, onOpenChange, consultation }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const [success, error] = await deleteConsultation(consultation.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      } else {
        toast({
          title: "Success",
          description: "Consultation deleted successfully.",
        });
        // Close the dialog first
        onOpenChange(false);
        // Then refresh and navigate
        router.refresh();
        // Add a small delay before navigating to ensure state is updated
        setTimeout(() => {
          router.push("/private/dashboard/consultations");
        }, 100);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while deleting the consultation.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Consultation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this consultation? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 