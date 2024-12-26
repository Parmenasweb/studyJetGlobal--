"use client";

import { useParams, useRouter } from "next/navigation";
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
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { deleteScholarship } from "@/actions/destination";
import { useToast } from "@/components/ui/use-toast";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "universityName",
    header: "University",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.type.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
      </Badge>
    ),
  },
  {
    accessorKey: "coverage",
    header: "Coverage",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.coverage.charAt(0).toUpperCase() + row.original.coverage.slice(1)}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = 
        status === "active" ? "success" :
        status === "upcoming" ? "warning" :
        "secondary";
      
      return (
        <Badge variant={variant}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => row.original.deadline ? formatDate(row.original.deadline) : "No deadline",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const params = useParams();
      const { toast } = useToast();
      const scholarship = row.original;

      const handleDelete = async () => {
        try {
          await deleteScholarship(
            params.destinationId,
            scholarship.universityId,
            scholarship._id
          );
          toast({
            title: "Success",
            description: "Scholarship deleted successfully",
          });
          router.refresh();
        } catch (error) {
          toast({
            title: "Error",
            description: error.message || "Failed to delete scholarship",
            variant: "destructive",
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/private/dashboard/destinations/${params.destinationId}/universities/${scholarship.universityId}/scholarships/${scholarship._id}`
                )
              }
            >
              View details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/private/dashboard/destinations/${params.destinationId}/universities/${scholarship.universityId}/scholarships/${scholarship._id}/edit`
                )
              }
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
