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

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Program Name
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
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = row.getValue("level");
      return (
        <Badge variant="outline">
          {level}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "tuition",
    header: "Tuition",
    cell: ({ row }) => {
      return formatCurrency(row.getValue("tuition"));
    },
  },
  {
    accessorKey: "intake",
    header: "Intake",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={status === "active" ? "success" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const program = row.original;

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
                window.location.href = `/private/dashboard/programs/${program._id}`;
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/private/dashboard/programs/${program._id}/edit`;
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