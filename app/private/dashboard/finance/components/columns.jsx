"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Building,
  Wallet,
} from "lucide-react";

const TRANSACTION_TYPE = {
  income: {
    label: "Income",
    icon: ArrowUpRight,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  expense: {
    label: "Expense",
    icon: ArrowDownRight,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
};

const TRANSACTION_STATUS = {
  completed: {
    label: "Completed",
    color: "success",
    textColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  pending: {
    label: "Pending",
    color: "warning",
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  failed: {
    label: "Failed",
    color: "destructive",
    textColor: "text-red-500",
    bgColor: "bg-red-50",
  },
};

const TRANSACTION_CATEGORY = {
  "agent-commission": {
    label: "Agent Commission",
    icon: User,
  },
  "university-payment": {
    label: "University Payment",
    icon: Building,
  },
  "service-fee": {
    label: "Service Fee",
    icon: Wallet,
  },
};

export function getTransactionColumns() {
  return [
    {
      accessorKey: "id",
      header: "Transaction ID",
      cell: ({ row }) => {
        return <span className="font-mono text-xs">{row.getValue("id")}</span>;
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return format(new Date(row.getValue("date")), "MMM d, yyyy");
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type");
        const config = TRANSACTION_TYPE[type];
        const Icon = config.icon;
        
        return (
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${config.color}`} />
            <span className={config.color}>{config.label}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category");
        const config = TRANSACTION_CATEGORY[category];
        const Icon = config.icon;
        
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span>{config.label}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium">{row.getValue("description")}</span>
            <span className="text-xs text-muted-foreground">
              {row.original.reference || "No reference"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue("amount");
        const type = row.getValue("type");
        
        return (
          <div className={`font-medium ${type === "income" ? "text-emerald-600" : "text-red-600"}`}>
            {type === "expense" && "-"}
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        const config = TRANSACTION_STATUS[status];
        
        return (
          <Badge
            variant={config.color}
            className={`${config.bgColor} ${config.textColor}`}
          >
            {config.label}
          </Badge>
        );
      },
    },
  ];
} 