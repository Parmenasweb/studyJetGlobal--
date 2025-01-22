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

export function getColumns({ onDeleteCommission }) {
  return [
    {
      accessorKey: "lead",
      header: "Lead Details",
      cell: ({ row }) => {
        const commission = row.original;
        const lead = commission.lead;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{lead.studentName}</span>
            <span className="text-sm text-muted-foreground">{lead.course}</span>
            <span className="text-xs text-muted-foreground">{lead.university}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue("amount");
        return (
          <div className="font-medium">
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        const statusConfig = getStatusConfig(status, "commission");
        
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
      accessorKey: "paymentDate",
      header: "Payment Date",
      cell: ({ row }) => {
        const paymentDate = row.getValue("paymentDate");
        return paymentDate ? format(new Date(paymentDate), "MMM d, yyyy") : "Not paid";
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
        const commission = row.original;

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
                <Link href={`/private/dashboard/commissions/${commission._id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/private/dashboard/commissions/${commission._id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDeleteCommission(commission._id)}
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