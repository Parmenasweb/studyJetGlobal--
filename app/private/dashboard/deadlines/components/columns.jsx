"use client";

import { format } from "date-fns";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  FileEdit,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const statusVariants = {
  pending: "secondary",
  in_progress: "warning",
  completed: "success",
  overdue: "destructive",
};

const priorityVariants = {
  low: "secondary",
  medium: "warning",
  high: "destructive",
  urgent: "destructive",
};

const typeIcons = {
  application: Clock,
  document_submission: FileEdit,
  payment: AlertCircle,
  visa: Eye,
  enrollment: CheckCircle2,
  accommodation: Calendar,
  other: MoreHorizontal,
};

export function getColumns({ onDeleteDeadline }) {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type");
        const Icon = typeIcons[type] || MoreHorizontal;
        return (
          <div className="flex items-center">
            <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {type
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority");
        return (
          <Badge variant={priorityVariants[priority]}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge variant={statusVariants[status]}>
            {status
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Due Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue("dueDate");
        const daysRemaining = row.original.daysRemaining;
        return (
          <div className="flex flex-col">
            <span>{format(new Date(date), "PPP")}</span>
            {daysRemaining !== null && (
              <span
                className={`text-xs ${
                  daysRemaining < 0
                    ? "text-destructive"
                    : daysRemaining <= 7
                    ? "text-warning"
                    : "text-muted-foreground"
                }`}
              >
                {daysRemaining < 0
                  ? `${Math.abs(daysRemaining)} days overdue`
                  : daysRemaining === 0
                  ? "Due today"
                  : `${daysRemaining} days remaining`}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "assignedTo.name",
      header: "Assigned To",
      cell: ({ row }) => {
        const assignedTo = row.original.assignedTo;
        return assignedTo ? (
          <div className="flex items-center">
            <span>{assignedTo.name}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">Unassigned</span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const deadline = row.original;

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
              <DropdownMenuItem asChild>
                <Link href={`/private/dashboard/deadlines/${deadline._id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/private/dashboard/deadlines/${deadline._id}/edit`}
                >
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit Deadline
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDeleteDeadline(deadline._id)}
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
}
