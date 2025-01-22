"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { ExpenseForm } from "./expense-form";

const equipmentSchema = {
  itemName: z.string().min(1, "Item name is required"),
  category: z.enum([
    "office-equipment",
    "computers",
    "furniture",
    "supplies",
    "electronics",
    "other"
  ]),
  purchaseDetails: z.object({
    quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    unitPrice: z.coerce.number().min(0),
    supplier: z.string().min(1, "Supplier name is required"),
    warranty: z.string().optional()
  }),
  assetDetails: z.object({
    assetTag: z.string().optional(),
    location: z.string().optional(),
    assignedTo: z.string().optional(),
    expectedLifespan: z.string().optional()
  }).optional(),
  specifications: z.object({
    brand: z.string().optional(),
    model: z.string().optional(),
    serialNumber: z.string().optional(),
    technicalDetails: z.string().optional()
  }).optional(),
  maintenanceSchedule: z.object({
    nextService: z.date().optional(),
    serviceProvider: z.string().optional(),
    estimatedCost: z.coerce.number().min(0).optional()
  }).optional()
};

export function EquipmentForm({ onSubmit, isLoading, defaultValues }) {
  return (
    <ExpenseForm
      category="equipment"
      onSubmit={onSubmit}
      isLoading={isLoading}
      defaultValues={defaultValues}
      additionalFields={equipmentSchema}
      additionalComponents={{
        itemName: {
          type: "text",
          label: "Item Name",
          description: "Name of the equipment or supply item",
          placeholder: "e.g., Dell Laptop XPS 15"
        },
        category: {
          type: "select",
          label: "Category",
          description: "Type of equipment or supply",
          options: [
            { value: "office-equipment", label: "Office Equipment" },
            { value: "computers", label: "Computers & Accessories" },
            { value: "furniture", label: "Furniture" },
            { value: "supplies", label: "Office Supplies" },
            { value: "electronics", label: "Electronics" },
            { value: "other", label: "Other" }
          ]
        },
        "purchaseDetails.quantity": {
          type: "number",
          label: "Quantity",
          description: "Number of items",
          placeholder: "1"
        },
        "purchaseDetails.unitPrice": {
          type: "number",
          label: "Unit Price",
          description: "Price per item",
          placeholder: "0.00"
        },
        "purchaseDetails.supplier": {
          type: "text",
          label: "Supplier",
          description: "Name of the supplier or vendor",
          placeholder: "e.g., Dell Technologies"
        },
        "purchaseDetails.warranty": {
          type: "text",
          label: "Warranty",
          description: "Warranty period (if applicable)",
          placeholder: "e.g., 2 years"
        },
        "assetDetails.assetTag": {
          type: "text",
          label: "Asset Tag",
          description: "Internal asset tracking number (if applicable)",
          placeholder: "e.g., EQ-2024-001"
        },
        "assetDetails.location": {
          type: "text",
          label: "Location",
          description: "Where the equipment will be located",
          placeholder: "e.g., Main Office - Room 101"
        },
        "assetDetails.assignedTo": {
          type: "text",
          label: "Assigned To",
          description: "Person responsible for the equipment",
          placeholder: "e.g., John Smith"
        },
        "assetDetails.expectedLifespan": {
          type: "text",
          label: "Expected Lifespan",
          description: "Expected useful life of the equipment",
          placeholder: "e.g., 5 years"
        },
        "specifications.brand": {
          type: "text",
          label: "Brand",
          description: "Brand name (if applicable)",
          placeholder: "e.g., Dell"
        },
        "specifications.model": {
          type: "text",
          label: "Model",
          description: "Model number or name",
          placeholder: "e.g., XPS 15 9520"
        },
        "specifications.serialNumber": {
          type: "text",
          label: "Serial Number",
          description: "Unique identifier from manufacturer",
          placeholder: "e.g., SN123456789"
        },
        "specifications.technicalDetails": {
          type: "textarea",
          label: "Technical Details",
          description: "Additional specifications or requirements",
          placeholder: "e.g., 16GB RAM, 512GB SSD, Intel i7"
        },
        "maintenanceSchedule.nextService": {
          type: "date",
          label: "Next Service Date",
          description: "Date of next scheduled maintenance (if applicable)"
        },
        "maintenanceSchedule.serviceProvider": {
          type: "text",
          label: "Service Provider",
          description: "Company responsible for maintenance",
          placeholder: "e.g., Dell Support"
        },
        "maintenanceSchedule.estimatedCost": {
          type: "number",
          label: "Estimated Service Cost",
          description: "Expected cost of next maintenance",
          placeholder: "0.00"
        }
      }}
    />
  );
} 