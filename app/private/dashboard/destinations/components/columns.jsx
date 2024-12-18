"use client";

import { ArrowUpDown, MoreHorizontal, Globe } from "lucide-react";
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
import Link from "next/link";
import Image from "next/image";

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
    cell: ({ row }) => {
      const flagImage = row.original.media.flagImage;
      return (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={flagImage}
              alt={`${row.getValue("name")} flag`}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "capital",
    header: "Capital",
  },
  {
    accessorKey: "studyInfo.averageTuitionFee",
    header: "Avg. Tuition",
    cell: ({ row }) => {
      const amount = row.getValue("studyInfo.averageTuitionFee");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return formatted;
    },
  },
  {
    accessorKey: "totalUniversities",
    header: "Universities",
    cell: ({ row }) => {
      return (
        <Badge variant="secondary">
          {row.original.universities?.length || 0}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalScholarships",
    header: "Scholarships",
    cell: ({ row }) => {
      return (
        <Badge variant="secondary">
          {row.original.scholarships?.length || 0}
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
              : status === "inactive"
              ? "destructive"
              : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const destination = row.original;

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
              <Link href={`/private/dashboard/destinations/${destination._id}`}>
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/private/dashboard/destinations/${destination._id}/edit`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/private/dashboard/destinations/${destination._id}/universities`}
              >
                Manage Universities
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/private/dashboard/destinations/${destination._id}/scholarships`}
              >
                Manage Scholarships
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                // Handle delete
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 