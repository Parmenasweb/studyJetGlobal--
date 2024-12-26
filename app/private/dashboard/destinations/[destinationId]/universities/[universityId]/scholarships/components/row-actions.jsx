"use client";

import { useParams, useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function RowActions({ row }) {
  const router = useRouter();
  const params = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() =>
            router.push(
              `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/scholarships/${row.original._id}`
            )
          }
        >
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push(
              `/private/dashboard/destinations/${params.destinationId}/universities/${params.universityId}/scholarships/${row.original._id}/edit`
            )
          }
        >
          Edit Scholarship
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 