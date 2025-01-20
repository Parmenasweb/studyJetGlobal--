"use client";

import { format } from "date-fns";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  FileEdit,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { typeConfig, statusConfig, priorityConfig } from "../config/colors";

function formatValue(value) {
  if (!value) return "N/A";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

async function deleteApplication(id) {
  try {
    const response = await fetch(`/api/applications/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete application');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
}

// Separate component for the actions cell
const CellActions = ({ row }) => {
  const router = useRouter();
  const application = row.original;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteApplication(application.id);
      toast.success("Application deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete application");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleView = () => {
    router.push(`/private/dashboard/applications/${application.id}`);
  };

  const handleEdit = () => {
    router.push(`/private/dashboard/applications/${application.id}/edit`);
  };

  const handleNotes = () => {
    router.push(`/private/dashboard/applications/${application.id}/notes`);
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
          <DropdownMenuItem onClick={handleView}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>
            <FileEdit className="mr-2 h-4 w-4" />
            Edit Application
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleNotes}>
            <MessageSquare className="mr-2 h-4 w-4" />
            View Notes
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
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
              This action cannot be undone. This will permanently delete the
              application and all associated data.
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
};

export const columns = [
  {
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "studentEmail",
    header: "Email",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type")?.toLowerCase();
      const config = typeConfig[type] || typeConfig.study;
      return (
        <div className="flex items-center gap-2">
          <span className={cn(
            "flex items-center gap-2 text-sm font-medium",
            config.color
          )}>
            <span className={cn(
              "h-2 w-2 rounded-full",
              config.bgColor
            )} />
            {config.label}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "program",
    header: "Program",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")?.toLowerCase();
      const config = statusConfig[status] || statusConfig.draft;
      return (
        <div className="flex items-center gap-2">
          <span className={cn(
            "flex items-center gap-2 text-sm font-medium",
            config.color
          )}>
            <span className={cn(
              "h-2 w-2 rounded-full",
              config.bgColor
            )} />
            {config.label}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority")?.toLowerCase();
      const config = priorityConfig[priority] || priorityConfig.low;
      return (
        <div className="flex items-center gap-2">
          <span className={cn(
            "flex items-center gap-2 text-sm font-medium",
            config.color
          )}>
            <span className={cn(
              "h-2 w-2 rounded-full",
              config.bgColor
            )} />
            {config.label}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "submittedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions row={row} />
  },
];
