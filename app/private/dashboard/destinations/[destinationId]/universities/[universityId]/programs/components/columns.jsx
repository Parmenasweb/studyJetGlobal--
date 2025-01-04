"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Eye, Trash2 } from "lucide-react";
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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { deleteProgram } from "@/actions/destination";

export const createProgramColumns = (destinationId, universityId, onDelete) => [
  {
    accessorKey: "name",
    header: "Program Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <Badge variant="secondary">
          {row.getValue("type")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "tuitionFee",
    header: "Tuition Fee",
    cell: ({ row }) => {
      const fee = row.getValue("tuitionFee");
      const currency = row.original.currency || "USD";
      return fee ? `${currency} ${fee.toLocaleString()}/year` : "N/A";
    },
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "intakes",
    header: "Intakes",
    cell: ({ row }) => {
      const intakes = row.getValue("intakes");
      return Array.isArray(intakes) ? intakes.join(", ") : "N/A";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const program = row.original;
      const [showDeleteDialog, setShowDeleteDialog] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);
      const { toast } = useToast();

      const handleDelete = async () => {
        try {
          setIsDeleting(true);
          await deleteProgram(destinationId, universityId, program.id);
          toast({
            title: "Success",
            description: "Program deleted successfully",
          });
          onDelete();
        } catch (error) {
          console.error("Error deleting program:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message || "Failed to delete program",
          });
        } finally {
          setIsDeleting(false);
          setShowDeleteDialog(false);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete {program.name}.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive hover:bg-destructive/90"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
]; 