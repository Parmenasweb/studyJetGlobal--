"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { ExpenseForm } from "./expense-form";

const professionalServicesSchema = {
  serviceType: z.enum([
    "legal",
    "accounting",
    "consulting",
    "training",
    "translation",
    "other"
  ]),
  provider: z.object({
    name: z.string().min(1, "Provider name is required"),
    company: z.string().min(1, "Company name is required"),
    contact: z.string().optional(),
    email: z.string().email().optional()
  }),
  serviceDetails: z.object({
    description: z.string().min(1, "Service description is required"),
    startDate: z.date(),
    endDate: z.date().optional(),
    deliverables: z.string().min(1, "Deliverables are required")
  }),
  billingDetails: z.object({
    rateType: z.enum([
      "hourly",
      "daily",
      "project-based",
      "retainer",
      "other"
    ]),
    rate: z.coerce.number().min(0).optional(),
    hours: z.coerce.number().min(0).optional(),
    retainerPeriod: z.string().optional()
  }),
  contractDetails: z.object({
    contractNumber: z.string().optional(),
    terms: z.string().optional(),
    paymentSchedule: z.string().optional()
  }).optional()
};

export function ProfessionalServicesForm({ onSubmit, isLoading, defaultValues }) {
  return (
    <ExpenseForm
      category="professional-services"
      onSubmit={onSubmit}
      isLoading={isLoading}
      defaultValues={defaultValues}
      additionalFields={professionalServicesSchema}
      additionalComponents={{
        serviceType: {
          type: "select",
          label: "Service Type",
          description: "Type of professional service",
          options: [
            { value: "legal", label: "Legal Services" },
            { value: "accounting", label: "Accounting Services" },
            { value: "consulting", label: "Consulting Services" },
            { value: "training", label: "Training Services" },
            { value: "translation", label: "Translation Services" },
            { value: "other", label: "Other Services" }
          ]
        },
        "provider.name": {
          type: "text",
          label: "Provider Name",
          description: "Name of the service provider",
          placeholder: "e.g., John Smith"
        },
        "provider.company": {
          type: "text",
          label: "Company Name",
          description: "Name of the provider's company",
          placeholder: "e.g., Smith Legal Services"
        },
        "provider.contact": {
          type: "text",
          label: "Contact Number",
          description: "Provider's contact number (optional)",
          placeholder: "e.g., +1234567890"
        },
        "provider.email": {
          type: "email",
          label: "Email",
          description: "Provider's email address (optional)",
          placeholder: "e.g., provider@example.com"
        },
        "serviceDetails.description": {
          type: "textarea",
          label: "Service Description",
          description: "Detailed description of the services",
          placeholder: "e.g., Legal consultation for student visa processing"
        },
        "serviceDetails.startDate": {
          type: "date",
          label: "Start Date",
          description: "Service start date"
        },
        "serviceDetails.endDate": {
          type: "date",
          label: "End Date",
          description: "Service end date (if applicable)"
        },
        "serviceDetails.deliverables": {
          type: "textarea",
          label: "Deliverables",
          description: "Expected outcomes or deliverables",
          placeholder: "e.g., Legal documentation review, Contract drafting"
        },
        "billingDetails.rateType": {
          type: "select",
          label: "Rate Type",
          description: "Billing rate structure",
          options: [
            { value: "hourly", label: "Hourly Rate" },
            { value: "daily", label: "Daily Rate" },
            { value: "project-based", label: "Project Based" },
            { value: "retainer", label: "Retainer" },
            { value: "other", label: "Other" }
          ]
        },
        "billingDetails.rate": {
          type: "number",
          label: "Rate",
          description: "Rate amount (if applicable)",
          placeholder: "0.00"
        },
        "billingDetails.hours": {
          type: "number",
          label: "Hours",
          description: "Number of hours (if applicable)",
          placeholder: "0"
        },
        "billingDetails.retainerPeriod": {
          type: "text",
          label: "Retainer Period",
          description: "Period for retainer services (if applicable)",
          placeholder: "e.g., 6 months"
        },
        "contractDetails.contractNumber": {
          type: "text",
          label: "Contract Number",
          description: "Reference number for the contract (optional)",
          placeholder: "e.g., CONT-2024-001"
        },
        "contractDetails.terms": {
          type: "textarea",
          label: "Contract Terms",
          description: "Key terms and conditions (optional)",
          placeholder: "e.g., Payment terms, Cancellation policy"
        },
        "contractDetails.paymentSchedule": {
          type: "textarea",
          label: "Payment Schedule",
          description: "Schedule of payments (optional)",
          placeholder: "e.g., 50% upfront, 50% upon completion"
        }
      }}
    />
  );
} 