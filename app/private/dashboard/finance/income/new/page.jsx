"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { IncomeCategoryDialog } from "../components/income-category-dialog";

export default function NewIncomePage() {
  const router = useRouter();
  const [showCategoryDialog, setShowCategoryDialog] = useState(true);

  const handleCategorySelect = (category) => {
    setShowCategoryDialog(false);
    router.push(`/private/dashboard/finance/income/new/${category}`);
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
            <h2 className="text-3xl font-bold tracking-tight">New Income Entry</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Select an income category to begin
            </p>
          </div>
        </div>
      </div>

      <IncomeCategoryDialog
        isOpen={showCategoryDialog}
        onClose={() => {
          setShowCategoryDialog(false);
          router.back();
        }}
        onCategorySelect={handleCategorySelect}
      />
    </div>
  );
} 