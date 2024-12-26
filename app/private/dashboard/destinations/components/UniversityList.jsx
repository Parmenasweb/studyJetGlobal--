"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { MoreVertical, Plus, School, Award, Edit, Trash2 } from "lucide-react";
import { deleteUniversity } from "@/actions/destination";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function UniversityList({ destinationId, universities = [] }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleDelete = async (universityId) => {
    try {
      setIsDeleting(true);
      await deleteUniversity(destinationId, universityId);
      toast.success("University deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Error deleting university:", error);
      toast.error(error.message || "Failed to delete university");
    } finally {
      setIsDeleting(false);
      setSelectedUniversity(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Universities</h2>
          <p className="text-muted-foreground">
            Manage partner universities and their scholarships
          </p>
        </div>
        <Button
          onClick={() =>
            router.push(
              `/private/dashboard/destinations/${destinationId}/universities/new`
            )
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add University
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {universities.map((university) => (
          <Card key={university._id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="line-clamp-1">{university.name}</CardTitle>
                  <CardDescription className="line-clamp-1">
                    {university.location}
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
                          `/private/dashboard/destinations/${destinationId}/universities/${university._id}`
                        )
                      }
                    >
                      <School className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(
                          `/private/dashboard/destinations/${destinationId}/universities/${university._id}/edit`
                        )
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit University
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(
                          `/private/dashboard/destinations/${destinationId}/universities/${university._id}/scholarships/new`
                        )
                      }
                    >
                      <Award className="mr-2 h-4 w-4" />
                      Add Scholarship
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setSelectedUniversity(university)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete University
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {university.images?.[0] && (
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={university.images[0].url}
                      alt={university.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={university.type === "public" ? "default" : "secondary"}>
                      {university.type}
                    </Badge>
                    <Badge variant="outline">
                      Rank: {university.ranking || "N/A"}
                    </Badge>
                    <Badge
                      variant={
                        university.status === "active"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {university.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {university.description || "No description available"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-2">
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-muted-foreground" />
                    <span>{university.programs?.length || 0} Programs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>{university.scholarships?.length || 0} Scholarships</span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {universities.length === 0 && (
        <Card className="p-8 text-center">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <School className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No universities added</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add your first university to start managing programs and scholarships.
            </p>
            <Button
              className="mt-4"
              onClick={() =>
                router.push(
                  `/private/dashboard/destinations/${destinationId}/universities/new`
                )
              }
            >
              Add University
            </Button>
          </div>
        </Card>
      )}

      <Dialog
        open={!!selectedUniversity}
        onOpenChange={() => setSelectedUniversity(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete University</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUniversity?.name}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedUniversity(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(selectedUniversity._id)}
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