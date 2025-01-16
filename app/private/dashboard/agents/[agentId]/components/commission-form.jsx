"use client";

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
import { Loader2 } from "lucide-react";

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
  const res = await fetch(
    `/api/agents/${agentId}/commissions/${commissionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update commission");
  }

  return res.json();
}

export function CommissionForm({ agent, commission, onSuccess }) {
  const form = useForm({
    resolver: zodResolver(commissionFormSchema),
    defaultValues: {
      leadId: commission?.leadId || "",
      amount: commission?.amount || 0,
      currency: commission?.currency || "USD",
      status: commission?.status || "pending",
      paymentDate: commission?.paymentDate
        ? new Date(commission.paymentDate).toISOString().split("T")[0]
        : "",
      paymentReference: commission?.paymentReference || "",
      notes: commission?.notes || "",
    },
  });

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

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="leadId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lead" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {agent.leads.map((lead) => (
                    <SelectItem key={lead._id} value={lead._id}>
                      {lead.studentName} - {lead.program} ({lead.university})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
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
                  <Input placeholder="USD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentReference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Reference</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter reference number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional notes"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {commission ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{commission ? "Update Commission" : "Create Commission"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
