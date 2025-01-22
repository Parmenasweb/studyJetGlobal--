"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Wallet,
  Building2,
  Lightbulb,
  Megaphone,
  Plane,
  ShoppingBag,
  DollarSign,
  HelpCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EXPENSE_CATEGORIES = [
  {
    id: "salary",
    title: "Salary",
    description: "Employee salaries and wages",
    icon: Wallet,
    color: "text-green-500",
  },
  {
    id: "rent",
    title: "Rent",
    description: "Office and facility rental payments",
    icon: Building2,
    color: "text-blue-500",
  },
  {
    id: "utilities",
    title: "Utilities",
    description: "Electricity, water, internet, etc.",
    icon: Lightbulb,
    color: "text-yellow-500",
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Advertising and promotional expenses",
    icon: Megaphone,
    color: "text-purple-500",
  },
  {
    id: "travel",
    title: "Travel",
    description: "Business travel and accommodation",
    icon: Plane,
    color: "text-sky-500",
  },
  {
    id: "office-supplies",
    title: "Office Supplies",
    description: "Office equipment and supplies",
    icon: ShoppingBag,
    color: "text-pink-500",
  },
  {
    id: "commission-payout",
    title: "Commission Payout",
    description: "Partner and agent commission payments",
    icon: DollarSign,
    color: "text-orange-500",
  },
  {
    id: "other",
    title: "Other Expense",
    description: "Other miscellaneous expenses",
    icon: HelpCircle,
    color: "text-gray-500",
  },
];

export function ExpenseCategoryDialog({ isOpen, onClose, onCategorySelect }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-4xl">
        <div className="flex justify-between items-center">
          <AlertDialogHeader className="flex-1">
            <AlertDialogTitle>Select Expense Category</AlertDialogTitle>
            <AlertDialogDescription>
              Choose the category that best describes this expense entry
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {EXPENSE_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className={cn(
                  "cursor-pointer transition-all hover:scale-[1.02]",
                  "border hover:border-primary",
                )}
                onClick={() => {
                  onCategorySelect(category.id);
                }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "p-2 rounded-lg bg-gray-50",
                      category.color
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{category.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 