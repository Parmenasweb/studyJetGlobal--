"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ApplicationFeeForm } from "../../components/application-fee-form";
import { TuitionFeeForm } from "../../components/tuition-fee-form";
import { ServiceFeeForm } from "../../components/service-fee-form";
import { ConsultationFeeForm } from "../../components/consultation-fee-form";
import { DocumentProcessingForm } from "../../components/document-processing-form";
import { VisaAssistanceForm } from "../../components/visa-assistance-form";
import { CommissionForm } from "../../components/commission-form";

const FORM_COMPONENTS = {
  "application-fee": {
    component: ApplicationFeeForm,
    title: "Application Fee",
    description: "Create a new application fee entry",
  },
  "tuition-fee": {
    component: TuitionFeeForm,
    title: "Tuition Fee",
    description: "Create a new tuition fee entry",
  },
  "commission": {
    component: CommissionForm,
    title: "Commission",
    description: "Create a new commission entry",
  },
  "service-fee": {
    component: ServiceFeeForm,
    title: "Service Fee",
    description: "Create a new service fee entry",
  },
  "consultation-fee": {
    component: ConsultationFeeForm,
    title: "Consultation Fee",
    description: "Create a new consultation fee entry",
  },
  "document-processing": {
    component: DocumentProcessingForm,
    title: "Document Processing",
    description: "Create a new document processing fee entry",
  },
  "visa-assistance": {
    component: VisaAssistanceForm,
    title: "Visa Assistance",
    description: "Create a new visa assistance fee entry",
  },
};

export default function CategoryFormPage({ params }) {
  const router = useRouter();
  const category = params.category;
  
  const selectedForm = FORM_COMPONENTS[category];
  
  if (!selectedForm) {
    router.push("/private/dashboard/finance/income/new");
    return null;
  }
  
  const FormComponent = selectedForm.component;

  const handleFormSubmit = async (data) => {
    try {
      const response = await fetch("/api/finance/income", {
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
        throw new Error("Failed to create income entry");
      }

      router.push("/private/dashboard/finance/income");
      router.refresh();
    } catch (error) {
      console.error("Error creating income:", error);
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