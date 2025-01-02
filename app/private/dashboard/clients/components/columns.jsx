"use client";

import { format } from "date-fns";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  FileEdit,
  FileText,
  GraduationCap,
  Building,
  Calendar,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const statusVariants = {
  active: "success",
  graduated: "secondary",
  deferred: "warning",
  withdrawn: "destructive",
};

export function getColumns({ onDeleteClient }) {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
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
      accessorKey: "personalInfo.fullName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Full Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "academicInfo.university.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            University
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const university = row.getValue("academicInfo.university.name");
        return (
          <div className="flex items-center">
            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
            {university}
          </div>
        );
      },
    },
    {
      accessorKey: "academicInfo.program.name",
      header: "Program",
      cell: ({ row }) => {
        const program = row.getValue("academicInfo.program.name");
        return (
          <div className="flex items-center">
            <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
            {program}
          </div>
        );
      },
    },
    {
      accessorKey: "academicInfo.studentId",
      header: "Student ID",
      cell: ({ row }) => {
        const studentId = row.getValue("academicInfo.studentId");
        return <Badge variant="outline">{studentId}</Badge>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge variant={statusVariants[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "academicInfo.enrollmentDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Enrollment Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue("academicInfo.enrollmentDate");
        return (
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            {format(new Date(date), "PPP")}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original;

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
                <Link href={`/private/dashboard/clients/${client._id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/private/dashboard/clients/${client._id}/edit`}>
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit Client
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/private/dashboard/clients/${client._id}/documents`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDeleteClient(client._id)}
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
