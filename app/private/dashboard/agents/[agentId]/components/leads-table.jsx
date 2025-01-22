"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { toast } from "sonner";

// Status badge variants
const statusVariants = {
  new: { variant: "secondary", label: "New" },
  contacted: { variant: "default", label: "Contacted" },
  application_started: { variant: "warning", label: "Application Started" },
  application_submitted: { variant: "info", label: "Application Submitted" },
  visa_applied: { variant: "warning", label: "Visa Applied" },
  visa_approved: { variant: "success", label: "Visa Approved" },
  enrolled: { variant: "success", label: "Enrolled" },
  rejected: { variant: "destructive", label: "Rejected" },
  cancelled: { variant: "destructive", label: "Cancelled" },
};

export function LeadsTable({ agent }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // If there are no leads, show a message
  if (!agent?.leads?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <p className="text-muted-foreground mb-4">No leads found for this agent.</p>
        <Button
          onClick={() => router.push(`/private/dashboard/agents/${agent._id}/leads/new`)}
        >
          Add New Lead
        </Button>
      </div>
    );
  }

  const handleDelete = async (leadId) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/agents/${agent._id}/leads/${leadId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete lead");
      }

      toast.success("Lead deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agent.leads.map((lead) => (
            <TableRow key={lead._id}>
              <TableCell>
                <div>
                  <p className="font-medium">{lead.studentName}</p>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                </div>
              </TableCell>
              <TableCell>{lead.program}</TableCell>
              <TableCell>{lead.university}</TableCell>
              <TableCell>
                <Badge variant={statusVariants[lead.status]?.variant || "default"}>
                  {statusVariants[lead.status]?.label || lead.status}
                </Badge>
              </TableCell>
              <TableCell>
                {lead.createdAt ? format(new Date(lead.createdAt), "MMM d, yyyy") : "N/A"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      disabled={isDeleting}
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(
                          `/private/dashboard/agents/${agent._id}/leads/${lead._id}/edit`
                        )
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Lead
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(lead._id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Lead
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
