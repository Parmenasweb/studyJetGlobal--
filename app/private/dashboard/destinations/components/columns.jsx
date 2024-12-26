"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DestinationRowActions } from "./DestinationRowActions";

export const columns = [
  {
    accessorKey: "name",
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
    accessorKey: "capital",
    header: "Capital",
  },
  {
    accessorKey: "countryCode",
    header: "Country Code",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          variant={
            status === "active"
              ? "success"
              : status === "draft"
              ? "secondary"
              : "destructive"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "studyInfo.averageTuitionFee",
    header: "Avg. Tuition Fee",
    cell: ({ row }) => {
      const fee = row.getValue("studyInfo.averageTuitionFee");
      return fee ? `$${fee.toLocaleString()} USD/year` : "N/A";
    },
  },
  {
    accessorKey: "quickFacts.averageCostOfLiving",
    header: "Avg. Cost of Living",
    cell: ({ row }) => {
      const cost = row.getValue("quickFacts.averageCostOfLiving");
      return cost ? `$${cost.toLocaleString()} USD/year` : "N/A";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DestinationRowActions data={row.original} />,
  },
];
