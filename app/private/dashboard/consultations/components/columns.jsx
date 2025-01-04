"use client";

import { format } from "date-fns";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  FileEdit,
  Trash2,
  MessageSquare,
  UserPlus,
} from "lucide-react";
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
import { useState } from "react";
import AssignStaffDialog from "./AssignStaffDialog";
import DeleteConsultationDialog from "./DeleteConsultationDialog";

const statusVariants = {
  pending: "warning",
  confirmed: "secondary",
  completed: "success",
  cancelled: "destructive",
};

// Separate component for the actions cell
const ConsultationActions = ({ row }) => {
  const consultation = row.original;
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
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
            <Link href={`/private/dashboard/consultations/${consultation.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/private/dashboard/consultations/${consultation.id}/edit`}
            >
              <FileEdit className="mr-2 h-4 w-4" />
              Edit Consultation
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowAssignDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Assign Staff
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/private/dashboard/consultations/${consultation.id}/notes`}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              View Notes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Consultation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AssignStaffDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        consultation={consultation}
        staffMembers={[
          // TODO: Replace with actual staff members from API
          { _id: "1", firstName: "John", lastName: "Doe" },
          { _id: "2", firstName: "Jane", lastName: "Smith" },
        ]}
      />

      <DeleteConsultationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        consultation={consultation}
      />
    </>
  );
};

export const columns = [
  {
    accessorKey: "consulteeName",
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "consultationType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("consultationType");
      return (
        <Badge variant="outline">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "preferredMode",
    header: "Mode",
    cell: ({ row }) => {
      const mode = row.getValue("preferredMode");
      return (
        <Badge variant="secondary">
          {mode === "online" ? "Online" : "In-Person"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "selectedDate",
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
    cell: ({ row }) => format(new Date(row.getValue("selectedDate")), "PPP"),
  },
  {
    accessorKey: "selectedTime",
    header: "Time",
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row.getValue("assignedTo");
      return assignedTo ? (
        <span>{`${assignedTo.firstName} ${assignedTo.lastName}`}</span>
      ) : (
        <span className="text-muted-foreground">Unassigned</span>
      );
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
    id: "actions",
    cell: ({ row }) => <ConsultationActions row={row} />
  },
];
