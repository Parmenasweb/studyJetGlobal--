"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { ExpenseForm } from "./expense-form";

const officeExpenseSchema = {
  location: z.string().min(1, "Office location is required"),
  expenseType: z.enum([
    "rent",
    "utilities",
    "maintenance",
    "insurance",
    "property-tax",
    "other"
  ]),
  period: z.object({
    startDate: z.date(),
    endDate: z.date()
  }),
  propertyDetails: z.object({
    area: z.string().optional(),
    unitNumber: z.string().optional(),
    buildingName: z.string().optional()
  }),
  landlordDetails: z.object({
    name: z.string().optional(),
    contact: z.string().optional(),
    email: z.string().email().optional()
  }).optional(),
  utilityBreakdown: z.object({
    electricity: z.coerce.number().min(0).optional(),
    water: z.coerce.number().min(0).optional(),
    internet: z.coerce.number().min(0).optional(),
    other: z.coerce.number().min(0).optional()
  }).optional()
};

export function OfficeExpenseForm({ onSubmit, isLoading, defaultValues }) {
  return (
    <ExpenseForm
      category="office-rent"
      onSubmit={onSubmit}
      isLoading={isLoading}
      defaultValues={defaultValues}
      additionalFields={officeExpenseSchema}
      additionalComponents={{
        location: {
          type: "text",
          label: "Office Location",
          description: "Enter the office location or address",
          placeholder: "e.g., 123 Business District"
        },
        expenseType: {
          type: "select",
          label: "Expense Type",
          description: "Select the type of office expense",
          options: [
            { value: "rent", label: "Rent" },
            { value: "utilities", label: "Utilities" },
            { value: "maintenance", label: "Maintenance" },
            { value: "insurance", label: "Insurance" },
            { value: "property-tax", label: "Property Tax" },
            { value: "other", label: "Other" }
          ]
        },
        "period.startDate": {
          type: "date",
          label: "Period Start Date",
          description: "Start date of the rental/billing period"
        },
        "period.endDate": {
          type: "date",
          label: "Period End Date",
          description: "End date of the rental/billing period"
        },
        "propertyDetails.area": {
          type: "text",
          label: "Area",
          description: "Office area (optional)",
          placeholder: "e.g., 1000 sq ft"
        },
        "propertyDetails.unitNumber": {
          type: "text",
          label: "Unit Number",
          description: "Office unit number (optional)",
          placeholder: "e.g., #04-12"
        },
        "propertyDetails.buildingName": {
          type: "text",
          label: "Building Name",
          description: "Name of the building (optional)",
          placeholder: "e.g., Central Business Tower"
        },
        "landlordDetails.name": {
          type: "text",
          label: "Landlord Name",
          description: "Name of the landlord or property manager (optional)",
          placeholder: "e.g., John Smith"
        },
        "landlordDetails.contact": {
          type: "text",
          label: "Landlord Contact",
          description: "Contact number of the landlord (optional)",
          placeholder: "e.g., +1234567890"
        },
        "landlordDetails.email": {
          type: "email",
          label: "Landlord Email",
          description: "Email address of the landlord (optional)",
          placeholder: "e.g., landlord@example.com"
        },
        "utilityBreakdown.electricity": {
          type: "number",
          label: "Electricity Cost",
          description: "Cost of electricity (if applicable)",
          placeholder: "0.00"
        },
        "utilityBreakdown.water": {
          type: "number",
          label: "Water Cost",
          description: "Cost of water (if applicable)",
          placeholder: "0.00"
        },
        "utilityBreakdown.internet": {
          type: "number",
          label: "Internet Cost",
          description: "Cost of internet (if applicable)",
          placeholder: "0.00"
        },
        "utilityBreakdown.other": {
          type: "number",
          label: "Other Utilities",
          description: "Cost of other utilities (if applicable)",
          placeholder: "0.00"
        }
      }}
    />
  );
} 