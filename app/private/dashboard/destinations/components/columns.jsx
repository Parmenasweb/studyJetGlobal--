"use client";

import { useState } from "react";
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
import { 
  MoreHorizontal, 
  Pencil, 
  Eye, 
  Building2, 
  GraduationCap, 
  Award,
  Trash2 
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { deleteDestination } from "@/actions/destination";

// Separate component for the actions cell
const DestinationActions = ({ row, onDelete }) => {
  const destination = row.original;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteDestination(destination.id);
      
      toast({
        title: "Success",
        description: "Destination deleted successfully",
      });

      // Call the onDelete callback to refresh the data
      onDelete();
    } catch (error) {
      console.error("Error deleting destination:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete destination",
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
          <DropdownMenuItem asChild>
            <Link href={`/private/dashboard/destinations/${destination.id}`} className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/private/dashboard/destinations/${destination.id}/edit`} className="flex items-center">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-destructive flex items-center"
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
              This will permanently delete {destination.name} and all associated data.
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
};

export const createColumns = (onDelete) => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.capital}, {row.original.countryCode}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusColors = {
        active: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
        draft: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        inactive: "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      };

      return (
        <Badge className={statusColors[status] || "bg-secondary"}>
          {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "universities",
    header: "Universities",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("universities")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "programs",
    header: "Programs",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("programs")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "scholarships",
    header: "Scholarships",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("scholarships")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "studyInfo.averageTuitionFee",
    header: "Avg. Tuition",
    cell: ({ row }) => {
      const fee = row.original.studyInfo?.averageTuitionFee;
      return fee ? `$${fee.toLocaleString()}/year` : "N/A";
    },
  },
  {
    accessorKey: "statistics.visaSuccessRate",
    header: "Visa Success",
    cell: ({ row }) => {
      const rate = row.original.statistics?.visaSuccessRate;
      return rate ? `${rate}%` : "N/A";
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
  },
  {
    id: "actions",
    cell: ({ row }) => <DestinationActions row={row} onDelete={onDelete} />
  },
];
