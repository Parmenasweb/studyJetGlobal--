"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Status badge variants
const statusVariants = {
  pending: "warning",
  processing: "secondary",
  approved: "success",
  rejected: "destructive",
};

export const columns = [
  {
    accessorKey: "clientId.name",
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
    accessorKey: "university",
    header: "University",
  },
  {
    accessorKey: "program",
    header: "Program",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={statusVariants[status] || "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "submissionDate",
    header: "Submitted",
    cell: ({ row }) => {
      const date = new Date(row.getValue("submissionDate"));
      return date.toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;

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
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/private/dashboard/applications/${application._id}`;
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/private/dashboard/applications/${application._id}/edit`;
              }}
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 