"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const EXPENSE_CATEGORIES = {
  "agent-commission": {
    label: "Agent Commission",
    description: "Commission payments to recruitment agents",
    form: "AgentCommissionForm"
  },
  "marketing": {
    label: "Marketing & Advertising",
    description: "Marketing campaigns, advertising, and promotional activities",
    form: "MarketingForm"
  },
  "office-rent": {
    label: "Office Rent",
    description: "Monthly office rent and utilities",
    form: "OfficeExpenseForm"
  },
  "salaries": {
    label: "Salaries & Wages",
    description: "Employee salaries, bonuses, and benefits",
    form: "SalaryForm"
  },
  "travel": {
    label: "Travel & Transportation",
    description: "Business travel, accommodation, and transportation",
    form: "TravelForm"
  },
  "software-subscriptions": {
    label: "Software Subscriptions",
    description: "Software licenses and online service subscriptions",
    form: "SubscriptionForm"
  },
  "professional-services": {
    label: "Professional Services",
    description: "Legal, accounting, and consulting services",
    form: "ProfessionalServicesForm"
  },
  "equipment": {
    label: "Equipment & Supplies",
    description: "Office equipment, supplies, and maintenance",
    form: "EquipmentForm"
  },
  "other": {
    label: "Other Expenses",
    description: "Miscellaneous business expenses",
    form: "ExpenseForm"
  }
};

export function SourceSelector({ onSourceSelect }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Expense Entry
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Expense Category</DialogTitle>
          <DialogDescription>
            Choose the type of expense to create a new entry
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={onSourceSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select expense category" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(EXPENSE_CATEGORIES).map(([key, { label, description }]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex flex-col">
                    <span className="font-medium">{label}</span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
} 