"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

const commissionFormSchema = z.object({
  leadId: z.string().min(1, "Lead is required"),
  amount: z.number().min(0, "Amount must be non-negative"),
  currency: z.string().min(1, "Currency is required"),
  status: z.enum(["pending", "approved", "paid", "cancelled"]),
  paymentDate: z.string().optional(),
  paymentReference: z.string().optional(),
  notes: z.string().optional(),
});

async function createCommission(agentId, data) {
  const res = await fetch(`/api/agents/${agentId}/commissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create commission");
  }

  return res.json();
}

async function updateCommission(agentId, commissionId, data) {
  const res = await fetch(`/api/agents/${agentId}/commissions/${commissionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update commission");
  }

  return res.json();
}

export function CommissionForm({ agent, commission, onSuccess }) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const form = useForm({
    resolver: zodResolver(commissionFormSchema),
    defaultValues: {
      leadId: commission?.leadId || "",
      amount: commission?.amount || 0,
      currency: commission?.currency || "USD",
      status: commission?.status || "pending",
      paymentDate: commission?.paymentDate
        ? format(new Date(commission.paymentDate), "yyyy-MM-dd")
        : "",
      paymentReference: commission?.paymentReference || "",
      notes: commission?.notes || "",
    },
  });

  const selectedLeadId = form.watch("leadId");
  const selectedLead = agent.leads.find(
    (lead) => lead._id === selectedLeadId
  );

  // Auto-calculate commission amount based on lead status and agent's commission structure
  const calculateCommission = () => {
    if (!selectedLead) return 0;

    const baseAmount = agent.baseCommission.type === "fixed" 
      ? agent.baseCommission.value 
      : 0;

    let multiplier = 1;
    switch (selectedLead.status) {
      case "enrolled":
        multiplier = 1;
        break;
      case "visa_approved":
        multiplier = 0.8;
        break;
      case "application_submitted":
        multiplier = 0.5;
        break;
      default:
        multiplier = 0;
    }

    if (agent.baseCommission.type === "percentage") {
      // Assuming there's a standard tuition fee amount for calculation
      const estimatedTuition = 10000; // This should be replaced with actual program tuition
      return (agent.baseCommission.value / 100) * estimatedTuition * multiplier;
    }

    return baseAmount * multiplier;
  };

  const mutation = useMutation({
    mutationFn: (data) =>
      commission
        ? updateCommission(agent._id, commission._id, data)
        : createCommission(agent._id, data),
    onSuccess: () => {
      toast.success(
        commission
          ? "Commission updated successfully"
          : "Commission created successfully"
      );
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoadingForm(true);
      await mutation.mutateAsync(data);
    } finally {
      setIsLoadingForm(false);
    }
  };

  // Update amount when lead changes
  useEffect(() => {
    if (selectedLead && !commission) {
      const calculatedAmount = calculateCommission();
      form.setValue("amount", calculatedAmount);
    }
  }, [selectedLeadId, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Commission Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {/* Lead Selection */}
            <FormField
              control={form.control}
              name="leadId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lead</FormLabel>
                  <Select
                    disabled={isLoadingForm || !!commission}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {agent.leads
                        .filter((lead) => 
                          ["enrolled", "visa_approved", "application_submitted"].includes(lead.status)
                        )
                        .map((lead) => (
                          <SelectItem key={lead._id} value={lead._id}>
                            {lead.studentName} - {lead.program} ({lead.status})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Commission Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          disabled={isLoadingForm}
                        />
                      </FormControl>
                      {!commission && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const calculatedAmount = calculateCommission();
                            form.setValue("amount", calculatedAmount);
                          }}
                        >
                          <Calculator className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <FormDescription>
                      {agent.baseCommission.type === "percentage"
                        ? `Base commission: ${agent.baseCommission.value}%`
                        : `Base commission: ${agent.baseCommission.value} ${agent.baseCommission.currency}`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoadingForm} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status and Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={isLoadingForm}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("status") === "paid" && (
                <FormField
                  control={form.control}
                  name="paymentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          disabled={isLoadingForm}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Payment Reference */}
            {form.watch("status") === "paid" && (
              <FormField
                control={form.control}
                name="paymentReference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Reference</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoadingForm} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isLoadingForm}
                      rows={4}
                      placeholder="Add any notes about the commission..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoadingForm}>
            {isLoadingForm ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : commission ? (
              "Update Commission"
            ) : (
              "Create Commission"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
