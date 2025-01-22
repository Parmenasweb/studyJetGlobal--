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
import { getStatusConfig } from "@/app/lib/status-config";

export function getColumns({ onDeleteAgent }) {
  return [
    {
      accessorKey: "name",
      header: "Agent Details",
      cell: ({ row }) => {
        const agent = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{agent.name}</span>
            <span className="text-sm text-muted-foreground">{agent.email}</span>
            <span className="text-xs text-muted-foreground">{agent.company || "Independent"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "country",
      header: "Location",
      cell: ({ row }) => {
        const agent = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{agent.country}</span>
            <span className="text-xs text-muted-foreground">{agent.phone || "No phone"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "baseCommission",
      header: "Commission",
      cell: ({ row }) => {
        const commission = row.original.baseCommission;
        return (
          <div className="flex flex-col">
            <span className="font-medium">
              {commission.type === "percentage"
                ? `${commission.value}%`
                : commission.value.toLocaleString("en-US", {
                    style: "currency",
                    currency: commission.currency || "USD",
                  })}
            </span>
            <span className="text-xs text-muted-foreground">
              {commission.type.charAt(0).toUpperCase() + commission.type.slice(1)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "performance",
      header: "Performance",
      cell: ({ row }) => {
        const performance = row.original.performance;
        const successRate = performance.totalLeads
          ? ((performance.successfulApplications / performance.totalLeads) * 100).toFixed(1)
          : 0;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{successRate}% Success Rate</span>
            <span className="text-xs text-muted-foreground">
              {performance.successfulApplications} of {performance.totalLeads} leads
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
        const statusConfig = getStatusConfig(status, "agent");
        
        return (
          <div className="flex flex-col gap-1">
            <Badge variant={statusConfig.color} className={`${statusConfig.bgColor} ${statusConfig.textColor}`}>
              {statusConfig.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Since {format(new Date(row.original.createdAt), "MMM d, yyyy")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "commissions",
      header: "Earnings",
      cell: ({ row }) => {
        const commissions = row.original.commissions || [];
        const paidCommissions = commissions.filter(c => c.status === "paid");
        const totalPaid = paidCommissions.reduce((sum, c) => sum + (c.amount || 0), 0);
        const averagePaid = paidCommissions.length > 0 
          ? totalPaid / paidCommissions.length 
          : 0;

        return (
          <div className="flex flex-col">
            <span className="font-medium">
              {totalPaid.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <span className="text-xs text-muted-foreground">
              {paidCommissions.length > 0 
                ? `Avg ${averagePaid.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })} per commission` 
                : "No paid commissions"}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const agent = row.original;

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
                <Link href={`/private/dashboard/agents/${agent._id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/private/dashboard/agents/${agent._id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDeleteAgent(agent._id)}
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
