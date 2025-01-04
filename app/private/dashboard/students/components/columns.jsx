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
import { format } from "date-fns";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "type",
    header: "Program Level",
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <Badge variant="outline">
          {type}
        </Badge>
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
        <Badge 
          variant={
            status === "active" 
              ? "success" 
              : status === "graduated"
              ? "default"
              : status === "withdrawn"
              ? "destructive"
              : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "advisor",
    header: "Advisor",
  },
  {
    accessorKey: "enrollmentDate",
    header: "Enrollment Date",
    cell: ({ row }) => {
      const date = row.getValue("enrollmentDate");
      if (!date) return "Not enrolled";
      return format(new Date(date), "MMM d, yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

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
              onClick={() => window.location.href = `/private/dashboard/students/${student.id}`}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.location.href = `/private/dashboard/students/${student.id}/edit`}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.location.href = `/private/dashboard/students/${student.id}/documents`}
            >
              Manage Documents
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.location.href = `/private/dashboard/students/${student.id}/progress`}
            >
              Academic Progress
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 