"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChevronDown, Trash2, FileDown, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export function BatchActions({ selectedRows, onAction }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBatchDelete = async () => {
    try {
      setIsProcessing(true);
      await onAction("delete", selectedRows);
      toast.success(`Successfully deleted ${selectedRows.length} applications`);
    } catch (error) {
      toast.error("Failed to delete applications");
    } finally {
      setIsProcessing(false);
      setShowDeleteDialog(false);
    }
  };

  const handleBatchStatusUpdate = async (status) => {
    try {
      setIsProcessing(true);
      await onAction("updateStatus", selectedRows, { status });
      toast.success(`Successfully updated status for ${selectedRows.length} applications`);
    } catch (error) {
      toast.error("Failed to update application status");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async (format) => {
    try {
      setIsProcessing(true);
      await onAction("export", selectedRows, { format });
      toast.success(`Successfully exported ${selectedRows.length} applications`);
    } catch (error) {
      toast.error("Failed to export applications");
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedRows.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {selectedRows.length} selected
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Actions
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleBatchStatusUpdate("approved")}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve Selected
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleBatchStatusUpdate("rejected")}>
            <XCircle className="mr-2 h-4 w-4" />
            Reject Selected
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("csv")}>
            <FileDown className="mr-2 h-4 w-4" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedRows.length} selected applications and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBatchDelete}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 