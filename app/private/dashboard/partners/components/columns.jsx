"use client";

import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Building2, Users2, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function getColumns({ onDeletePartner }) {
  const router = useRouter();

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
      header: "Partner Name",
      cell: ({ row }) => {
        const type = row.original.type;
        const Icon =
          type === "university" ? Building2 : type === "agency" ? Users2 : User;
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{row.getValue("name")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type");
        return (
          <Badge
            variant={
              type === "university"
                ? "default"
                : type === "agency"
                ? "secondary"
                : "outline"
            }
          >
            {type === "university"
              ? "University"
              : type === "agency"
              ? "Agency"
              : "Independent Agent"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "location.country",
      header: "Country",
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
                : status === "pending"
                ? "warning"
                : "destructive"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "performance.activeStudents",
      header: "Active Students",
      cell: ({ row }) => {
        const activeStudents = row.original.performance?.activeStudents || 0;
        return (
          <Badge variant="secondary" className="font-mono">
            {activeStudents}
          </Badge>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => {
        return (
          <div className="text-sm text-muted-foreground">
            {format(new Date(row.getValue("updatedAt")), "MMM d, yyyy")}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const partner = row.original;

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
                  router.push(`/private/dashboard/partners/${partner._id}`)
                }
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/private/dashboard/partners/${partner._id}/edit`)
                }
              >
                Edit Partner
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDeletePartner(partner._id)}
              >
                Delete Partner
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
