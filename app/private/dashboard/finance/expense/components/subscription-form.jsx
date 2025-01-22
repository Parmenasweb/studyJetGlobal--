"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { ExpenseForm } from "./expense-form";

const subscriptionSchema = {
  serviceName: z.string().min(1, "Service name is required"),
  provider: z.string().min(1, "Provider name is required"),
  subscriptionType: z.enum([
    "software-license",
    "cloud-service",
    "saas",
    "hosting",
    "domain",
    "other"
  ]),
  billingCycle: z.enum([
    "monthly",
    "quarterly",
    "semi-annual",
    "annual",
    "other"
  ]),
  subscriptionPeriod: z.object({
    startDate: z.date(),
    endDate: z.date()
  }),
  licenseDetails: z.object({
    numberOfUsers: z.coerce.number().min(1).optional(),
    planType: z.string().optional(),
    features: z.array(z.string()).optional()
  }),
  billingDetails: z.object({
    unitPrice: z.coerce.number().min(0).optional(),
    discount: z.coerce.number().min(0).optional(),
    tax: z.coerce.number().min(0).optional()
  }),
  renewalSettings: z.object({
    autoRenew: z.boolean().default(false),
    reminderDays: z.coerce.number().min(0).optional()
  }).optional()
};

export function SubscriptionForm({ onSubmit, isLoading, defaultValues }) {
  return (
    <ExpenseForm
      category="software-subscriptions"
      onSubmit={onSubmit}
      isLoading={isLoading}
      defaultValues={defaultValues}
      additionalFields={subscriptionSchema}
      additionalComponents={{
        serviceName: {
          type: "text",
          label: "Service Name",
          description: "Name of the software or service",
          placeholder: "e.g., Adobe Creative Cloud"
        },
        provider: {
          type: "text",
          label: "Service Provider",
          description: "Name of the service provider",
          placeholder: "e.g., Adobe Inc."
        },
        subscriptionType: {
          type: "select",
          label: "Subscription Type",
          description: "Type of subscription",
          options: [
            { value: "software-license", label: "Software License" },
            { value: "cloud-service", label: "Cloud Service" },
            { value: "saas", label: "SaaS" },
            { value: "hosting", label: "Hosting" },
            { value: "domain", label: "Domain" },
            { value: "other", label: "Other" }
          ]
        },
        billingCycle: {
          type: "select",
          label: "Billing Cycle",
          description: "Frequency of billing",
          options: [
            { value: "monthly", label: "Monthly" },
            { value: "quarterly", label: "Quarterly" },
            { value: "semi-annual", label: "Semi-Annual" },
            { value: "annual", label: "Annual" },
            { value: "other", label: "Other" }
          ]
        },
        "subscriptionPeriod.startDate": {
          type: "date",
          label: "Start Date",
          description: "Subscription start date"
        },
        "subscriptionPeriod.endDate": {
          type: "date",
          label: "End Date",
          description: "Subscription end date"
        },
        "licenseDetails.numberOfUsers": {
          type: "number",
          label: "Number of Users",
          description: "Number of licensed users (if applicable)",
          placeholder: "e.g., 5"
        },
        "licenseDetails.planType": {
          type: "text",
          label: "Plan Type",
          description: "Subscription plan type (if applicable)",
          placeholder: "e.g., Enterprise"
        },
        "billingDetails.unitPrice": {
          type: "number",
          label: "Unit Price",
          description: "Price per unit/user (if applicable)",
          placeholder: "0.00"
        },
        "billingDetails.discount": {
          type: "number",
          label: "Discount",
          description: "Applied discount amount (if applicable)",
          placeholder: "0.00"
        },
        "billingDetails.tax": {
          type: "number",
          label: "Tax",
          description: "Applied tax amount (if applicable)",
          placeholder: "0.00"
        },
        "renewalSettings.autoRenew": {
          type: "checkbox",
          label: "Auto Renewal",
          description: "Enable automatic renewal"
        },
        "renewalSettings.reminderDays": {
          type: "number",
          label: "Reminder Days",
          description: "Days before expiry to send reminder (if applicable)",
          placeholder: "e.g., 30"
        }
      }}
    />
  );
} 