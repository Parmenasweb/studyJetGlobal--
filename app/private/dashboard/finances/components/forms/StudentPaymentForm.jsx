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
import { Textarea } from "@/components/ui/textarea";
import { useFinanceStore } from "../../store/finance-store";
import { toast } from "sonner";

const studentPaymentSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  amount: z.number().min(0, "Amount must be positive"),
  type: z.enum(["TUITION", "APPLICATION_FEE", "PROGRAM_FEE", "OTHER"]),
  status: z.enum(["PENDING", "PAID", "OVERDUE", "REFUNDED"]),
  dueDate: z.string(),
  paidDate: z.string().optional(),
  paymentMethod: z.enum(["CASH", "BANK_TRANSFER", "CREDIT_CARD", "OTHER"]).optional(),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

export function StudentPaymentForm({ initialData, onSuccess }) {
  const { addStudentPayment, updateStudentPayment } = useFinanceStore();

  const form = useForm({
    resolver: zodResolver(studentPaymentSchema),
    defaultValues: initialData || {
      studentId: "",
      amount: 0,
      type: "TUITION",
      status: "PENDING",
      dueDate: new Date().toISOString().split("T")[0],
      paidDate: "",
      paymentMethod: "BANK_TRANSFER",
      reference: "",
      notes: "",
    },
  });

  async function onSubmit(data) {
    try {
      if (initialData) {
        updateStudentPayment(initialData.id, data);
        toast.success("Payment updated successfully");
      } else {
        addStudentPayment({ ...data, id: Date.now().toString() });
        toast.success("Payment added successfully");
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
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter student ID" {...field} />
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
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter amount"
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TUITION">Tuition</SelectItem>
                  <SelectItem value="APPLICATION_FEE">Application Fee</SelectItem>
                  <SelectItem value="PROGRAM_FEE">Program Fee</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paidDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paid Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                  <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference</FormLabel>
              <FormControl>
                <Input placeholder="Enter reference number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter notes"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? "Update Payment" : "Add Payment"}
        </Button>
      </form>
    </Form>
  );
} 