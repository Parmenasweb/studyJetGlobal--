"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";

// Transaction Columns
export const transactionColumns = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("date")),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("type") === "INCOME" ? "success" : "destructive"}
      >
        {row.getValue("type")}
      </Badge>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const variants = {
        COMPLETED: "success",
        PENDING: "warning",
        FAILED: "destructive",
        REFUNDED: "secondary",
      };
      return <Badge variant={variants[status]}>{status}</Badge>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "reference",
    header: "Reference",
  },
];

// Student Payment Columns
export const studentPaymentColumns = [
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => formatDate(row.getValue("dueDate")),
  },
  {
    accessorKey: "studentId",
    header: "Student",
    cell: ({ row }) => {
      const student = row.original.student;
      return student ? `${student.firstName} ${student.lastName}` : row.getValue("studentId");
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue("type").replace("_", " ")}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const variants = {
        PAID: "success",
        PENDING: "warning",
        OVERDUE: "destructive",
        REFUNDED: "secondary",
      };
      return <Badge variant={variants[status]}>{status}</Badge>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => row.getValue("paymentMethod")?.replace("_", " ") || "-",
  },
  {
    accessorKey: "reference",
    header: "Reference",
  },
];

// Budget Columns
export const budgetColumns = [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "period",
    header: "Period",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue("period")}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Budget Amount",
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
  {
    accessorKey: "actual",
    header: "Actual Spend",
    cell: ({ row }) => formatCurrency(row.getValue("actual")),
  },
  {
    accessorKey: "variance",
    header: "Variance",
    cell: ({ row }) => {
      const variance = row.getValue("variance");
      const isPositive = variance >= 0;
      return (
        <span className={isPositive ? "text-green-600" : "text-red-600"}>
          {formatCurrency(Math.abs(variance))} {isPositive ? "under" : "over"}
        </span>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => formatDate(row.getValue("startDate")),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => formatDate(row.getValue("endDate")),
  },
]; 