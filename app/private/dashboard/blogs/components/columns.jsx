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

// Status badge variants
const statusVariants = {
  published: "success",
  draft: "secondary",
  archived: "warning",
};

export const columns = [
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
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category");
      return (
        <Badge variant="outline">
          {category}
        </Badge>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={statusVariants[status] || "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "publishDate",
    header: "Published",
    cell: ({ row }) => {
      const date = row.getValue("publishDate");
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const blog = row.original;

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
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/private/dashboard/blogs/${blog._id}`;
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/private/dashboard/blogs/${blog._id}/edit`;
              }}
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 