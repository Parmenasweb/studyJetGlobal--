"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFinanceStore } from "../../store/finance-store";
import { toast } from "sonner";

const budgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.number().min(0, "Amount must be positive"),
  period: z.enum(["MONTHLY", "QUARTERLY", "YEARLY"]),
  startDate: z.string(),
  endDate: z.string(),
  actual: z.number().default(0),
});

export function BudgetForm({ initialData, onSuccess }) {
  const { addBudget, updateBudget } = useFinanceStore();

  const form = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: initialData || {
      category: "",
      amount: 0,
      period: "MONTHLY",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
      actual: 0,
    },
  });

  async function onSubmit(data) {
    try {
      if (initialData) {
        updateBudget(initialData.id, {
          ...data,
          variance: data.amount - data.actual,
        });
        toast.success("Budget updated successfully");
      } else {
        addBudget({
          ...data,
          id: Date.now().toString(),
          variance: data.amount - data.actual,
        });
        toast.success("Budget added successfully");
      }
      onSuccess?.();
      form.reset();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter budget category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter budget amount"
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
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="QUARTERLY">Quarterly</SelectItem>
                  <SelectItem value="YEARLY">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="actual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Actual Spend</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter actual spend"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? "Update Budget" : "Add Budget"}
        </Button>
      </form>
    </Form>
  );
} 