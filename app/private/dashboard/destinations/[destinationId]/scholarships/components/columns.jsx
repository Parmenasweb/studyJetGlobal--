"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

export const scholarshipColumns = [
  {
    accessorKey: "name",
    header: "Scholarship Name",
  },
  {
    accessorKey: "universityName",
    header: "University",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      const currency = row.original.currency || "USD";
      return amount ? `${currency} ${amount.toLocaleString()}` : "N/A";
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <Badge variant="secondary">
          {row.getValue("type")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const deadline = row.getValue("deadline");
      return deadline ? new Date(deadline).toLocaleDateString() : "N/A";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={
          status === "active" ? "success" :
          status === "upcoming" ? "warning" : "secondary"
        }>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const scholarship = row.original;
      
      return (
        <Button
          variant="ghost"
          size="sm"
          asChild
        >
          <Link 
            href={`/private/dashboard/destinations/${scholarship.destinationId}/universities/${scholarship.universityId}/scholarships/${scholarship.id}`}
            className="flex items-center"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </Button>
      );
    },
  },
]; 