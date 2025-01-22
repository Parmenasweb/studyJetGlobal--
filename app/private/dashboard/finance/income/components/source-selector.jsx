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

export const INCOME_SOURCES = {
  "application-fee": {
    label: "Application Fee",
    description: "Fees collected for processing student applications",
    form: "ApplicationFeeForm"
  },
  "tuition-fee": {
    label: "Tuition Fee",
    description: "Tuition fees received from students",
    form: "TuitionFeeForm"
  },
  "commission": {
    label: "Commission",
    description: "Commission received from universities or partners",
    form: "AgentCommissionForm"
  },
  "service-fee": {
    label: "Service Fee",
    description: "Fees for additional services provided to students",
    form: "ServiceFeeForm"
  },
  "consultation-fee": {
    label: "Consultation Fee",
    description: "Fees for student counseling and consultation",
    form: "ConsultationFeeForm"
  },
  "document-processing": {
    label: "Document Processing",
    description: "Fees for document verification and processing",
    form: "DocumentProcessingForm"
  },
  "visa-assistance": {
    label: "Visa Assistance",
    description: "Fees for visa application assistance",
    form: "VisaAssistanceForm"
  },
  "other": {
    label: "Other Income",
    description: "Other miscellaneous income sources",
    form: "IncomeForm"
  }
};

export function SourceSelector({ onSourceSelect }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Income Entry
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Income Source</DialogTitle>
          <DialogDescription>
            Choose the type of income to create a new entry
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={onSourceSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select income source" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(INCOME_SOURCES).map(([key, { label, description }]) => (
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