"use client";
import React from "react";

import { DataTable } from "../students/components/data-table";
import PageTitle from "@/components/pageTitle.jsx";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { mockApplications } from "./data/mock-applications";
import { format } from "date-fns";

const columns = [
  {
    accessorKey: "clientId.name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("clientId.name");
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${name}`}
            alt="user-image"
          />
          <p>{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "clientId.email",
    header: "Email",
  },
  {
    accessorKey: "applicationType",
    header: "Type",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-orange-200":
              row.getValue("status") === "submitted" || row.getValue("status") === "processing",
            "bg-red-200": row.getValue("status") === "rejected",
            "bg-green-200": row.getValue("status") === "approved",
            "bg-slate-200": row.getValue("status") === "draft",
          })}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "submissionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(new Date(row.getValue("submissionDate")), "PPP");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(application._id)}
            >
              Copy Application ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Application details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ApplicationPage() {
  return (
    <div className="container flex flex-col gap-5">
      <PageTitle text="Student Applications" />
      <DataTable columns={columns} data={mockApplications} />
    </div>
  );
}
