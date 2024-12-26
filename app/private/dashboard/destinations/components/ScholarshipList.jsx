"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import {
  MoreVertical,
  Plus,
  Award,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  FileText,
  Clock,
} from "lucide-react";
import { deleteScholarship } from "@/actions/destination";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function ScholarshipList({
  destinationId,
  universityId,
  scholarships = [],
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const handleDelete = async (scholarshipId) => {
    try {
      setIsDeleting(true);
      await deleteScholarship(destinationId, universityId, scholarshipId);
      toast.success("Scholarship deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      toast.error(error.message || "Failed to delete scholarship");
    } finally {
      setIsDeleting(false);
      setSelectedScholarship(null);
    }
  };

  const getScholarshipTypeColor = (type) => {
    switch (type) {
      case "merit":
        return "bg-blue-100 text-blue-800";
      case "need-based":
        return "bg-green-100 text-green-800";
      case "research":
        return "bg-purple-100 text-purple-800";
      case "sports":
        return "bg-orange-100 text-orange-800";
      case "cultural":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Scholarships</h2>
          <p className="text-muted-foreground">
            Manage scholarships and financial aid opportunities
          </p>
        </div>
        <Button
          onClick={() =>
            router.push(
              `/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships/new`
            )
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Scholarship
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((scholarship) => (
          <Card key={scholarship._id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="line-clamp-1">
                    {scholarship.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {formatCurrency(scholarship.amount)}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(
                          `/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships/${scholarship._id}/edit`
                        )
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Scholarship
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setSelectedScholarship(scholarship)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Scholarship
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className={getScholarshipTypeColor(scholarship.type)}
                    variant="secondary"
                  >
                    {scholarship.type.replace("-", " ")}
                  </Badge>
                  <Badge
                    className={getStatusColor(scholarship.status)}
                    variant="secondary"
                  >
                    {scholarship.status}
                  </Badge>
                  <Badge variant="outline">{scholarship.coverage}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {scholarship.description || "No description available"}
                </p>
                {scholarship.deadline && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {formatDate(scholarship.deadline)}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-2">
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {scholarship.requiredDocuments?.length || 0} Documents
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {scholarship.applicationProcess ? "Process defined" : "No process"}
                    </span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {scholarships.length === 0 && (
        <Card className="p-8 text-center">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <Award className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No scholarships added</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add your first scholarship to start managing financial aid
              opportunities.
            </p>
            <Button
              className="mt-4"
              onClick={() =>
                router.push(
                  `/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships/new`
                )
              }
            >
              Add Scholarship
            </Button>
          </div>
        </Card>
      )}

      <Dialog
        open={!!selectedScholarship}
        onOpenChange={() => setSelectedScholarship(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Scholarship</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedScholarship?.name}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedScholarship(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(selectedScholarship._id)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 