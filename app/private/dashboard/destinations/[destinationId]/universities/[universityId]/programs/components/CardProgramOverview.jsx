"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteProgram } from "@/actions/program";

export default function CardProgramOverview({ program, destinationId, universityId }) {
  const router = useRouter();
  const { toast } = useToast();

  async function handleDelete() {
    try {
      await deleteProgram(destinationId, universityId, program._id);
      toast({
        title: "Success",
        description: "Program deleted successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="line-clamp-1">{program.name}</CardTitle>
          <CardDescription>
            {program.level} • {program.duration}
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link
              href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs/${program._id}/edit`}
            >
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Tuition Fee</p>
          <p className="text-sm text-muted-foreground">{program.tuitionFee}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Faculty</p>
          <p className="text-sm text-muted-foreground">{program.faculty}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Department</p>
          <p className="text-sm text-muted-foreground">{program.department}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Intakes</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {program.intakes.map((intake, index) => (
              <Badge key={index} variant="secondary">
                {intake}
              </Badge>
            ))}
            {program.intakes.length === 0 && (
              <p className="text-sm text-muted-foreground">No intakes specified</p>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Status</p>
          <Badge
            variant={program.status === "active" ? "default" : "secondary"}
            className="mt-1"
          >
            {program.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
} 