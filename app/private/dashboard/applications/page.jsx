"use client";
import React from "react";

import DataTable from "../students/components/data-table";
import PageTitle from "@/components/pageTitle";
import Image from "next/image";
import { MoreHorizontal, ArrowUpDown  } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "name"
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("name")} </p>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "nationality",
    header: "Nationality"
  },
  {
    accessorKey: "destination",
    header: "Destination"
  },
  {
    accessorKey: "program",
    header: "Program"
  },
  {
    accessorKey: "status",
    header: "Status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-orange-200": row.getValue("status") === "Submitted" || "In-Review",
            "bg-red-200": row.getValue("status") === "Rejected",
            "bg-green-200": row.getValue("status") === "Approved"
          })}
        >
          {row.getValue("status")}
        </div>
      );
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // for displaying more actions
  {
    id: "actions",
    cell: ({ row }) => {
      // we wuse the row.original to get the data of the row being displayed
      const student = row.original
 
      return (
        <DropdownMenu className="">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 " align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Application ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Application details</DropdownMenuItem>
            <DropdownMenuItem>Edit </DropdownMenuItem>
            <DropdownMenuItem>
            <Button variant="danger" className="h-8 w-8 p-0">
              Delete
            </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

const data = [
  {
    name: "John Doe",
    email: "john@example.com",
    nationality: "Ghana",
    destination: "India",
    program: "B.tech",
    status: "Approved",
    date: "2023-02-15"
  },
  {
    name: "Alice smith",
    email: "Alicesmith@example.com",
    nationality: "Liberia",
    destination: "India",
    program: "Social work",
    status: "Rejected",
    date: "2023-02-15"
  },
  {
    name: "joshua poo",
    email: "john@example.com",
    nationality: "Liberia",
    destination: "India",
    program: "BBA",
    status: "Approved",
    date: "2023-02-15"
  },
  {
    name: "Darius Block",
    email: "john@example.com",
    nationality: "Liberia",
    destination: "India",
    program: "Radiology",
    status: "Rejected",
    date: "2023-02-15"
  },
  {
    name: "Stephen Namibs",
    email: "john@example.com",
    nationality: "Namibia",
    destination: "India",
    program: "Optometry",
    status: "Submitted",
    date: "2023-02-15"
  },
  {
    name: "Michael Nweke",
    email: "john@example.com",
    nationality: "Nigeria",
    destination: "India",
    program: "B tech",
    status: "Approved",
    date: "2023-02-15"
  },
  {
    name: "Fatimah Bakare",
    email: "john@example.com",
    nationality: "Nigeria",
    destination: "India",
    program: "MBA",
    status: "Submitted",
    date: "2023-02-15"
  },
  {
    name: "Grace Ibeji",
    email: "john@example.com",
    nationality: "Nigeria",
    destination: "India",
    program: "BBA",
    status: "Approved",
    date: "2023-02-15"
  },
  {
    name: "Maria Namibs",
    email: "john@example.com",
    nationality: "Namibia",
    destination: "Canada",
    program: "BBA",
    status: "Submitted",
    date: "2023-02-15"
  },
  {
    name: "Anatalah Shangola",
    email: "john@example.com",
    nationality: "Namibia",
    destination: "UK",
    program: "B.pharm",
    status: "In-review",
    date: "2023-02-15"
  },
  {
    name: "Tahsha shangs",
    email: "john@example.com",
    nationality: "Zimbabwe",
    destination: "USA",
    program: "BBA",
    status: "Submitted",
    date: "2023-02-15"
  },
  {
    name: "Lepota Boitatelo",
    email: "john@example.com",
    nationality: "Lesotho",
    destination: "India",
    program: "BBA",
    status: "In-review",
    date: "2023-02-15"
  },
  {
    name: "Sabusiswa Mahtlambi",
    email: "john@example.com",
    nationality: "Swaziland",
    destination: "India",
    program: "BBA",
    status: "Submitted",
    date: "2023-02-15"
  },
  {
    name: "Akoldit Manyuat",
    email: "john@example.com",
    nationality: "South-sudan",
    destination: "India",
    program: "BBA",
    status: "Rejected",
    date: "2023-02-15"
  },
  {
    name: "pollard shijji",
    email: "john@example.com",
    nationality: "Zimbabwe",
    destination: "India",
    program: "BBA",
    status: "Approved",
    date: "2023-02-15"
  },
  
];

export default function ApplicationPage({}) {
  return (
    <div className="flex flex-col gap-5  w-full ">
      <PageTitle text="Student Applications" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}