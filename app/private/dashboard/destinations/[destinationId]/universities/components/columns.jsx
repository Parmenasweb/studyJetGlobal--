"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { deleteUniversity } from "@/actions/destination";
import { useToast } from "@/components/ui/use-toast";

// Separate component for the actions cell
const UniversityActions = ({ row }) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const university = row.original;

  async function handleDelete() {
    try {
      await deleteUniversity(params.destinationId, university._id);
      toast({
        title: "Success",
        description: "University deleted successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete university",
        variant: "destructive",
      });
    }
  }

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
              `/private/dashboard/destinations/${params.destinationId}/universities/${university._id}`
            )
          }
        >
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push(
              `/private/dashboard/destinations/${params.destinationId}/universities/${university._id}/edit`
            )
          }
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            router.push(
              `/private/dashboard/destinations/${params.destinationId}/universities/${university._id}/programs`
            )
          }
        >
          Manage Programs
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push(
              `/private/dashboard/destinations/${params.destinationId}/universities/${university._id}/scholarships`
            )
          }
        >
          Manage Scholarships
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={handleDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
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
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <Badge variant={type === "public" ? "default" : "secondary"}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "ranking",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ranking
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
          variant={status === "active" ? "success" : "secondary"}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UniversityActions row={row} />
  },
];