"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { MoreHorizontal, Eye, FileEdit, ClipboardList, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteConsultation } from "@/lib/actions/consultation-actions";
import ConsultationNotes from "./ConsultationNotes";

export function DataTable({ data, columns }) {
  const router = useRouter();
  
  const handleDelete = async (id) => {
    try {
      const [success, error] = await deleteConsultation(id);
      if (success) {
        toast.success("Consultation deleted successfully");
        router.refresh(); // Refresh the current page
        router.push("/private/dashboard/consultations"); // Navigate back to the list
      } else {
        toast.error(error || "Failed to delete consultation");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the consultation");
    }
  };
  
  // ... rest of the component
} 

export const columns = [
  // ... other columns
  {
    id: "actions",
    cell: ({ row }) => {
      const consultation = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/private/dashboard/consultations/${consultation.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/private/dashboard/consultations/${consultation.id}/edit`}>
                <FileEdit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ConsultationNotes 
                notes={consultation.notes} 
                consultationId={consultation.id}
              />
              <span className="ml-2">View Notes</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/private/dashboard/consultations/${consultation.id}/notes`}>
                <ClipboardList className="mr-2 h-4 w-4" />
                Manage Notes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDelete(consultation.id)}
              className="text-destructive"
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