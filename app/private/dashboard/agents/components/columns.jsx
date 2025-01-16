"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

export function getColumns({ onDeleteAgent }) {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
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
        return (
          <div className="flex flex-col gap-1">
            <Badge
              variant={
                status === "active"
                  ? "success"
                  : status === "inactive"
                  ? "secondary"
                  : "destructive"
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Since {format(new Date(row.original.createdAt), "MMM d, yyyy")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "performance.totalCommissionEarned",
      header: "Earnings",
      cell: ({ row }) => {
        const amount = row.getValue("performance.totalCommissionEarned");
        const totalLeads = row.original.performance.totalLeads;
        const avgPerLead = totalLeads
          ? amount / totalLeads
          : 0;
        return (
          <div className="flex flex-col">
            <span className="font-medium">
              {amount?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <span className="text-xs text-muted-foreground">
              Avg {avgPerLead.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })} per lead
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
