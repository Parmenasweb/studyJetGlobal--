"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  DollarSign,
  Percent,
  Clock,
  Plus,
  Trash2,
  Edit,
  CalendarRange,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const commissionSchema = z.object({
  type: z.string().min(1, "Commission type is required"),
  rate: z.number().min(0, "Rate must be at least 0"),
  basis: z.enum(["fixed", "percentage"]),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  minimumAmount: z.number().min(0, "Minimum amount must be at least 0"),
  maximumAmount: z
    .number()
    .min(0, "Maximum amount must be at least 0")
    .optional(),
  validFrom: z.string().min(1, "Valid from date is required"),
  validUntil: z.string().optional(),
  conditions: z.string().optional(),
});

async function updatePartner(id, data) {
  const res = await fetch(`/api/partners?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update partner");
  }

  return res.json();
}

export function Commission({ partner }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState(null);

  const form = useForm({
    resolver: zodResolver(commissionSchema),
    defaultValues: selectedCommission || {
      type: "",
      rate: 0,
      basis: "percentage",
      paymentTerms: "",
      minimumAmount: 0,
      maximumAmount: 0,
      validFrom: "",
      validUntil: "",
      conditions: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      const updatedCommissions = selectedCommission
        ? partner.commissions.map((commission) =>
            commission._id === selectedCommission._id
              ? { ...commission, ...data }
              : commission
          )
        : [...(partner.commissions || []), { ...data, _id: Date.now() }];

      return updatePartner(partner._id, {
        ...partner,
        commissions: updatedCommissions,
      });
    },
    onSuccess: () => {
      toast.success(
        selectedCommission
          ? "Commission updated successfully"
          : "Commission added successfully"
      );
      setIsOpen(false);
      setSelectedCommission(null);
      form.reset();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commissionId) => {
      const updatedCommissions = partner.commissions.filter(
        (commission) => commission._id !== commissionId
      );

      return updatePartner(partner._id, {
        ...partner,
        commissions: updatedCommissions,
      });
    },
    onSuccess: () => {
      toast.success("Commission deleted successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleEdit = (commission) => {
    setSelectedCommission(commission);
    form.reset(commission);
    setIsOpen(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Commission Structure</CardTitle>
          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
              if (!open) {
                setSelectedCommission(null);
                form.reset();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Commission
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedCommission ? "Edit Commission" : "Add Commission"}
                </DialogTitle>
                <DialogDescription>
                  {selectedCommission
                    ? "Edit commission structure for this partner."
                    : "Add a new commission structure for this partner."}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commission Type</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select type</option>
                            <option value="Standard">Standard</option>
                            <option value="Volume-based">Volume-based</option>
                            <option value="Performance">Performance</option>
                            <option value="Special">Special</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rate</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="basis"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Basis</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="percentage">Percentage</option>
                              <option value="fixed">Fixed Amount</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="paymentTerms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Terms</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Net 30, Upon enrollment"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="minimumAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Amount (USD)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maximumAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Amount (USD, Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="validFrom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valid From</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="validUntil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valid Until (Optional)</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="conditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conditions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific conditions or requirements"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit" disabled={mutation.isPending}>
                      {mutation.isPending
                        ? selectedCommission
                          ? "Updating..."
                          : "Adding..."
                        : selectedCommission
                        ? "Update"
                        : "Add"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {partner.commissions && partner.commissions.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {partner.commissions.map((commission) => (
                <Card key={commission._id}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-base font-medium">
                        {commission.type}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {commission.basis === "percentage"
                            ? `${commission.rate}%`
                            : formatCurrency(commission.rate)}
                        </Badge>
                        <Badge variant="secondary">
                          {commission.paymentTerms}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(commission)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Commission
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this commission
                              structure? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteMutation.mutate(commission._id)
                              }
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                          Range: {formatCurrency(commission.minimumAmount)}
                          {commission.maximumAmount
                            ? ` - ${formatCurrency(commission.maximumAmount)}`
                            : "+"}
                        </div>
                        <div className="flex items-center">
                          <CalendarRange className="mr-2 h-4 w-4 text-muted-foreground" />
                          Valid: {formatDate(commission.validFrom)}
                          {commission.validUntil &&
                            ` - ${formatDate(commission.validUntil)}`}
                        </div>
                      </div>
                      {commission.conditions && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Conditions</h4>
                          <p className="text-sm text-muted-foreground">
                            {commission.conditions}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No commission structures added yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
