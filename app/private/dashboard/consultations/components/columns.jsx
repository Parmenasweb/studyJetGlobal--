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

const statusConfig = {
  pending: {
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    label: "Pending"
  },
  confirmed: {
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    label: "Confirmed"
  },
  completed: {
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    label: "Completed"
  },
  cancelled: {
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    label: "Cancelled"
  }
};

const consultationTypeConfig = {
  study: {
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    label: "Study"
  },
  work: {
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    label: "Work"
  },
  other: {
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/20",
    label: "Other"
  }
};

const preferredModeConfig = {
  online: {
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    label: "Online"
  },
  phone: {
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    label: "Phone"
  }
};

// Separate component for the actions cell
const ConsultationActions = ({ row }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);

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
          <Link href={`/private/dashboard/consultations/${row.original.id}`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </Link>
          <Link href={`/private/dashboard/consultations/${row.original.id}/edit`}>
            <DropdownMenuItem>
              <FileEdit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setShowAssignDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Assign Staff
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteConsultationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        consultation={row.original}
      />

      <AssignStaffDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        consultation={row.original}
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
      const config = consultationTypeConfig[type];
      return (
        <Badge 
          className={`${config.bgColor} ${config.color} border ${config.borderColor}`}
          variant="outline"
        >
          <span className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${config.bgColor}`} />
            {config.label}
          </span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "preferredMode",
    header: "Mode",
    cell: ({ row }) => {
      const mode = row.getValue("preferredMode");
      const config = preferredModeConfig[mode];
      return (
        <Badge 
          className={`${config.bgColor} ${config.color} border ${config.borderColor}`}
          variant="outline"
        >
          <span className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${config.bgColor}`} />
            {config.label}
          </span>
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
    cell: ({ row }) => {
      return format(new Date(row.getValue("selectedDate")), "PPP");
    },
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
      const config = statusConfig[status];
      return (
        <Badge 
          className={`${config.bgColor} ${config.color} border ${config.borderColor}`}
          variant="outline"
        >
          <span className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${config.bgColor}`} />
            {config.label}
          </span>
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ConsultationActions row={row} />
  },
];
