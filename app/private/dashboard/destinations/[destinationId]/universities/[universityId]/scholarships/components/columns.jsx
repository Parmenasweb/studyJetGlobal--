"use client";

import { useParams, useRouter } from "next/navigation";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteScholarship } from "@/actions/destination";
import { toast } from "react-hot-toast";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return formatted;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <Badge variant="outline">
          {type.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "coverage",
    header: "Coverage",
    cell: ({ row }) => {
      const coverage = row.getValue("coverage");
      return (
        <Badge variant="outline">
          {coverage.charAt(0).toUpperCase() + coverage.slice(1)}
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
        <Badge
          variant={
            status === "active"
              ? "success"
              : status === "upcoming"
              ? "warning"
              : "secondary"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const deadline = row.getValue("deadline");
      if (!deadline) return "No deadline";
      return new Date(deadline).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const params = useParams();
      const scholarship = row.original;

      const onDelete = async () => {
        try {
          await deleteScholarship(params.destinationId, params.universityId, scholarship._id);
          toast.success("Scholarship deleted successfully");
          router.refresh();
        } catch (error) {
          console.error("Error deleting scholarship:", error);
          toast.error(error.message || "Failed to delete scholarship");
        }
      };

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
                router.push(
                  `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/scholarships/${scholarship._id}`
                )
              }
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/scholarships/${scholarship._id}/edit`
                )
              }
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onDelete}
              className="text-red-600"
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