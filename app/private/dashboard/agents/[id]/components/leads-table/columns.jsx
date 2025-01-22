"use client";

import { format } from "date-fns";
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
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { getStatusConfig } from "@/lib/status-config";

export function getColumns({ onDeleteLead }) {
  return [
    {
      accessorKey: "studentName",
      header: "Student Details",
      cell: ({ row }) => {
        const lead = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{lead.studentName}</span>
            <span className="text-sm text-muted-foreground">{lead.email}</span>
            <span className="text-xs text-muted-foreground">{lead.phone || "No phone"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "course",
      header: "Course Details",
      cell: ({ row }) => {
        const lead = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{lead.course}</span>
            <span className="text-xs text-muted-foreground">{lead.university}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        const statusConfig = getStatusConfig(status, "lead");
        
        return (
          <div className="flex flex-col gap-1">
            <Badge variant={statusConfig.color} className={`${statusConfig.bgColor} ${statusConfig.textColor}`}>
              {statusConfig.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Updated {format(new Date(row.original.updatedAt), "MMM d, yyyy")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "commission",
      header: "Commission",
      cell: ({ row }) => {
        const lead = row.original;
        const commission = lead.commission;
        const statusConfig = getStatusConfig(commission.status, "commission");

        return (
          <div className="flex flex-col">
            <span className="font-medium">
              {commission.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <Badge variant={statusConfig.color} className={`mt-1 w-fit ${statusConfig.bgColor} ${statusConfig.textColor}`}>
              {statusConfig.label}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        return format(new Date(row.getValue("createdAt")), "MMM d, yyyy");
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const lead = row.original;

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
                <Link href={`/private/dashboard/leads/${lead._id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/private/dashboard/leads/${lead._id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDeleteLead(lead._id)}
                className="text-destructive focus:text-destructive"
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