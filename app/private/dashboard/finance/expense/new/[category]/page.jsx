"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { SalaryForm } from "../../components/salary-form";
import { RentForm } from "../../components/rent-form";
import { UtilitiesForm } from "../../components/utilities-form";
import { MarketingForm } from "../../components/marketing-form";
import { TravelForm } from "../../components/travel-form";
import { OfficeSuppliesForm } from "../../components/office-supplies-form";
import { CommissionPayoutForm } from "../../components/commission-payout-form";
// import { OtherExpenseForm } from "../../components/other-expense-form";

const FORM_COMPONENTS = {
  "salary": {
    component: SalaryForm,
    title: "Salary Expense",
    description: "Create a new salary payment entry",
  },
  "rent": {
    component: RentForm,
    title: "Rent Expense",
    description: "Create a new rental payment entry",
  },
  "utilities": {
    component: UtilitiesForm,
    title: "Utilities Expense",
    description: "Create a new utility payment entry",
  },
  "marketing": {
    component: MarketingForm,
    title: "Marketing Expense",
    description: "Create a new marketing expense entry",
  },
  "travel": {
    component: TravelForm,
    title: "Travel Expense",
    description: "Create a new travel expense entry",
  },
  "office-supplies": {
    component: OfficeSuppliesForm,
    title: "Office Supplies",
    description: "Create a new office supplies expense entry",
  },
  "commission-payout": {
    component: CommissionPayoutForm,
    title: "Commission Payout",
    description: "Create a new commission payout entry",
  },
  // "other": {
  //   component: OtherExpenseForm,
  //   title: "Other Expense",
  //   description: "Create a new miscellaneous expense entry",
  // },
};

export default function CategoryFormPage({ params }) {
  const router = useRouter();
  const category = params.category;
  
  const selectedForm = FORM_COMPONENTS[category];
  
  if (!selectedForm) {
    router.push("/private/dashboard/finance/expense/new");
    return null;
  }
  
  const FormComponent = selectedForm.component;

  const handleFormSubmit = async (data) => {
    try {
      const response = await fetch("/api/finance/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          category: category,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create expense entry");
      }

      router.push("/private/dashboard/finance/expense");
      router.refresh();
    } catch (error) {
      console.error("Error creating expense:", error);
      // Handle error (show toast notification, etc.)
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{selectedForm.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{selectedForm.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <FormComponent
          onSubmit={handleFormSubmit}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
} 