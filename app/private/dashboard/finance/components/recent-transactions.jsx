"use client";

import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowUpRight,
  ArrowDownRight,
  User,
  Building,
  Wallet,
  Loader2,
} from "lucide-react";

const TRANSACTION_TYPE = {
  income: {
    icon: ArrowUpRight,
    color: "text-emerald-500",
  },
  expense: {
    icon: ArrowDownRight,
    color: "text-red-500",
  },
};

const TRANSACTION_CATEGORY = {
  "agent-commission": {
    icon: User,
  },
  "university-payment": {
    icon: Building,
  },
  "service-fee": {
    icon: Wallet,
  },
};

export function RecentTransactions({ transactions = [], isLoading = false, error = null }) {
  if (isLoading) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {error.message || "Failed to load transactions"}
        </p>
      </div>
    );
  }

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <p className="text-sm text-muted-foreground">No recent transactions</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[350px] pr-4">
      <div className="space-y-4">
        {transactions.map((transaction) => {
          const typeConfig = TRANSACTION_TYPE[transaction.type] || TRANSACTION_TYPE.income;
          const categoryConfig = TRANSACTION_CATEGORY[transaction.category] || TRANSACTION_CATEGORY["service-fee"];
          const Icon = typeConfig.icon;
          const CategoryIcon = categoryConfig.icon;

          return (
            <div
              key={transaction.id || transaction._id || transaction.transactionId}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className={`rounded-full p-2 ${
                    transaction.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'
                  }`}>
                    <Icon className={`h-4 w-4 ${typeConfig.color}`} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5">
                    <CategoryIcon className="h-3 w-3" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(transaction.date), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {transaction.type === "expense" && "-"}
                {typeof transaction.amount === 'number' 
                  ? transaction.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  : "N/A"
                }
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
} 