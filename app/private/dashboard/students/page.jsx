"use client";
import React from "react";

import  DataTable  from "./components/data-table";
import PageTitle from "@/components/pageTitle";
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
    accessorKey: "university",
    header: "University"
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-orange-200": row.getValue("status") === "Visa-Pend",
            "bg-green-200": row.getValue("status") === "Converted"
          })}
        >
          {row.getValue("status")}
        </div>
      );
    }
  },
  // for displaying more actions
  {
    id: "actions",
    cell: ({ row }) => {
      // we wuse the row.original to get the data of the row being displayed
      const student = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20  ">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => alert(student.name)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
    year: "2024",
    status: "Admitted",
    university: "ADTU"
  },
  {
    name: "Alice smith",
    email: "Alicesmith@example.com",
    nationality: "Liberia",
    destination: "India",
    program: "Social work",
    year: "2023",
    status: "Visa-Pend",
    university: "Kaziranga University"
  },
  {
    name: "joshua poo",
    email: "john@example.com",
    nationality: "Liberia",
    destination: "India",
    program: "BBA",
    year: "2022",
    status: "Converted",
    university: "ADTU"
  },
  {
    name: "Darius Block",
    email: "john@example.com",
    nationality: "Liberia",
    destination: "India",
    program: "Radiology",
    year: "2024",
    status: "Visa-Pend",
    university: "ADTU"
  },
  {
    name: "Stephen Namibs",
    email: "john@example.com",
    nationality: "Namibia",
    destination: "India",
    program: "Optometry",
    year: "2023",
    status: "Converted",
    university: "Chandigah"
  },
  {
    name: "Michael Nweke",
    email: "john@example.com",
    nationality: "Nigeria",
    destination: "India",
    program: "B tech",
    year: "2024",
    status: "Converted",
    university: "Kaziranga University"
  },
  {
    name: "Fatimah Bakare",
    email: "john@example.com",
    nationality: "Nigeria",
    destination: "India",
    program: "MBA",
    year: "2024",
    status: "Visa-Pend",
    university: "ADTU"
  },
  {
    name: "Grace Ibeji",
    email: "john@example.com",
    nationality: "Nigeria",
    destination: "India",
    program: "BBA",
    year: "2024",
    status: "Visa-Pend",
    university: "Chandigah"
  },
  {
    name: "Maria Namibs",
    email: "john@example.com",
    nationality: "Namibia",
    destination: "Canada",
    program: "BBA",
    year: "2023",
    status: "Converted",
    university: "ADTU"
  },
  {
    name: "Anatalah Shangola",
    email: "john@example.com",
    nationality: "Namibia",
    destination: "UK",
    program: "B.pharm",
    year: "2023",
    status: "Converted",
    university: "Chandigah"
  },
  {
    name: "Tahsha shangs",
    email: "john@example.com",
    nationality: "Zimbabwe",
    destination: "USA",
    program: "BBA",
    year: "2020",
    status: "Admitted",
    university: "ADTU"
  },
  {
    name: "Lepota Boitatelo",
    email: "john@example.com",
    nationality: "Lesotho",
    destination: "India",
    program: "BBA",
    year: "2022",
    status: "Admitted",
    university: "ADTU"
  },
  {
    name: "Sabusiswa Mahtlambi",
    email: "john@example.com",
    nationality: "Swaziland",
    destination: "India",
    program: "BBA",
    year: "2023",
    status: "Visa-Pend",
    university: "Chandigah"
  },
  {
    name: "Akoldit Manyuat",
    email: "john@example.com",
    nationality: "South-sudan",
    destination: "India",
    program: "BBA",
    status: "Admitted",
    university: "ADTU",
    year: "2024",
  },
  {
    name: "pollard shijji",
    email: "john@example.com",
    nationality: "Zimbabwe",
    destination: "India",
    program: "BBA",
    year: "2024",
    status: "Visa-Pend",
    university: "Kaziranga University"
  },
  
];

export default function studentsPage({}) {
  return (
    <div className="flex flex-col gap-5  w-full ">
      <PageTitle text="Enrolled Students" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}