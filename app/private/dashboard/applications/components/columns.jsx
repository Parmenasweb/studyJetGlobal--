"use client";

import { format } from "date-fns";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  FileEdit,
  MessageSquare,
  Trash2,
  Save,
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateApplication } from "@/actions/application";

// Color variants for different types of badges
const typeVariants = {
  study: {
    variant: "default",
    icon: <GraduationCap className="mr-2 h-4 w-4 text-blue-500" />,
    label: "Study"
  },
  work: {
    variant: "default",
    icon: <Briefcase className="mr-2 h-4 w-4 text-purple-500" />,
    label: "Work"
  },
};

const statusVariants = {
  draft: {
    variant: "secondary",
    label: "Draft",
    icon: <FileText className="mr-2 h-4 w-4 text-gray-500" />
  },
  submitted: {
    variant: "info",
    label: "Submitted",
    icon: <Clock className="mr-2 h-4 w-4 text-blue-500" />
  },
  under_review: {
    variant: "warning",
    label: "Under Review",
    icon: <Clock className="mr-2 h-4 w-4 text-yellow-500" />
  },
  approved: {
    variant: "success",
    label: "Approved",
    icon: <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
  },
  rejected: {
    variant: "destructive",
    label: "Rejected",
    icon: <XCircle className="mr-2 h-4 w-4 text-red-500" />
  },
  pending_documents: {
    variant: "warning",
    label: "Pending Documents",
    icon: <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
  },
};

const priorityVariants = {
  low: {
    variant: "secondary",
    label: "Low",
    icon: <ArrowDown className="mr-2 h-4 w-4 text-gray-500" />
  },
  medium: {
    variant: "warning",
    label: "Medium",
    icon: <ArrowRight className="mr-2 h-4 w-4 text-yellow-500" />
  },
  high: {
    variant: "destructive",
    label: "High",
    icon: <ArrowUp className="mr-2 h-4 w-4 text-red-500" />
  },
};

const editSchema = z.object({
  status: z.enum(["draft", "submitted", "under_review", "approved", "rejected", "pending_documents"]),
  priority: z.enum(["low", "medium", "high"]),
  destination: z.string().min(1, "Destination is required"),
});

function formatValue(value) {
  if (!value) return "N/A";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatDate(date) {
  if (!date) return "N/A";
  try {
    // Handle both ISO strings and timestamps
    const parsedDate = typeof date === 'string' ? new Date(date) : new Date(Number(date));
    
    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      console.log('Invalid date:', date);
      return "N/A";
    }
    
    return format(parsedDate, "MMM d, yyyy");
  } catch (error) {
    console.log('Date parsing error:', error, date);
    return "N/A";
  }
}

async function deleteApplication(id) {
  try {
    const response = await fetch(`/api/applications/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete application');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
}

// Separate component for the actions cell
const CellActions = ({ row }) => {
  const router = useRouter();
  const application = row.original;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      status: application.status || "draft",
      priority: application.priority || "medium",
      destination: application.destination || "",
    },
  });

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteApplication(application.id);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      toast.success("Application deleted successfully");
      setShowDeleteDialog(false);
      // Use window.location.href to ensure a complete page reload
      window.location.href = "/private/dashboard/applications";
    } catch (error) {
      toast.error(error.message || "Failed to delete application");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleView = () => {
    router.push(`/private/dashboard/applications/${application.id}`);
  };

  const onSubmit = async (data) => {
    try {
      setIsUpdating(true);
      const result = await updateApplication(application.id, data);
      
      if (result.error || !result.success) {
        throw new Error(result.error);
      }

      toast.success("Application updated successfully");
      setShowEditDialog(false);
      // Use window.location.href to ensure a complete page reload
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to update application");
    } finally {
      setIsUpdating(false);
    }
  };

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
          <DropdownMenuItem onClick={handleView}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <FileEdit className="mr-2 h-4 w-4" />
            Quick Edit
          </DropdownMenuItem>
     
         
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              application and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
            <DialogDescription>
              Update the application status, priority, and destination.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="pending_documents">Pending Documents</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setShowEditDialog(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <span className="loading loading-spinner loading-sm mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const columns = [
  {
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "studentEmail",
    header: "Email",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      const variant = typeVariants[type] || { variant: "secondary", icon: null, label: type };
      return (
        <Badge variant={variant.variant} className="flex items-center gap-1">
          {variant.icon}
          {variant.label || formatValue(type)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => {
      const destination = row.getValue("destination");
      return (
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          {destination || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "program",
    header: "Program",
    cell: ({ row }) => {
      const program = row.getValue("program");
      const type = row.getValue("type");
      const icon = type === "study" ? 
        <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" /> : 
        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />;
      return (
        <div className="flex items-center">
          {icon}
          {program || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const variant = statusVariants[status] || { variant: "secondary", icon: null, label: "Unknown" };
      return (
        <Badge variant={variant.variant} className="flex items-center gap-1">
          {variant.icon}
          {variant.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      const variant = priorityVariants[priority] || { variant: "secondary", icon: null, label: "None" };
      return (
        <Badge variant={variant.variant} className="flex items-center gap-1">
          {variant.icon}
          {variant.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "submittedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("submittedAt");
      return (
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          {date}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("updatedAt");
      return (
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          {date}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions row={row} />
  },
];
