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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  DollarSign,
  Plus,
  Trash2,
  Users,
  Calendar,
  FileText,
} from "lucide-react";

const commissionSchema = z.object({
  type: z.enum(["percentage", "fixed", "tiered"]),
  value: z.number().min(0, "Value must be at least 0"),
  currency: z.string().optional(),
  tiers: z
    .array(
      z.object({
        minStudents: z.number().min(0, "Minimum students must be at least 0"),
        maxStudents: z.number().optional(),
        value: z.number().min(0, "Value must be at least 0"),
      })
    )
    .optional(),
  terms: z.string().optional(),
  paymentSchedule: z.enum(["on_enrollment", "after_first_semester", "custom"]),
  customTerms: z.string().optional(),
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

export function CommissionDetails({ partner }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [tiers, setTiers] = useState(
    partner.commission?.tiers || [
      { minStudents: 0, maxStudents: undefined, value: 0 },
    ]
  );

  const form = useForm({
    resolver: zodResolver(commissionSchema),
    defaultValues: partner.commission || {
      type: "percentage",
      value: 0,
      currency: "USD",
      tiers: [{ minStudents: 0, maxStudents: undefined, value: 0 }],
      terms: "",
      paymentSchedule: "on_enrollment",
      customTerms: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      updatePartner(partner._id, {
        ...partner,
        commission: data,
      }),
    onSuccess: () => {
      toast.success("Commission details updated successfully");
      setIsOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const addTier = () => {
    setTiers([...tiers, { minStudents: 0, maxStudents: undefined, value: 0 }]);
  };

  const removeTier = (index) => {
    const newTiers = tiers.filter((_, i) => i !== index);
    setTiers(newTiers);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Commission</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Update Commission
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Update Commission</DialogTitle>
                <DialogDescription>
                  Update commission details for this partner.
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="percentage">
                              Percentage
                            </SelectItem>
                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                            <SelectItem value="tiered">
                              Tiered Structure
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("type") !== "tiered" && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {form.watch("type") === "percentage"
                                ? "Percentage"
                                : "Amount"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step={
                                  form.watch("type") === "percentage"
                                    ? "0.01"
                                    : "1"
                                }
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

                      {form.watch("type") === "fixed" && (
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
                      )}
                    </div>
                  )}

                  {form.watch("type") === "tiered" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <FormLabel>Commission Tiers</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addTier}
                        >
                          Add Tier
                        </Button>
                      </div>
                      {tiers.map((_, index) => (
                        <div
                          key={index}
                          className="rounded-lg border p-4 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Tier {index + 1}</h4>
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTier(index)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid gap-4 md:grid-cols-3">
                            <FormField
                              control={form.control}
                              name={`tiers.${index}.minStudents`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Min Students</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(parseInt(e.target.value))
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`tiers.${index}.maxStudents`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Max Students</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      placeholder="No limit"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          e.target.value
                                            ? parseInt(e.target.value)
                                            : undefined
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`tiers.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Commission Value</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value)
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commission Terms</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter commission terms"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Schedule</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select schedule" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="on_enrollment">
                              On Enrollment
                            </SelectItem>
                            <SelectItem value="after_first_semester">
                              After First Semester
                            </SelectItem>
                            <SelectItem value="custom">
                              Custom Schedule
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("paymentSchedule") === "custom" && (
                    <FormField
                      control={form.control}
                      name="customTerms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Payment Terms</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter custom payment terms"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <DialogFooter>
                    <Button type="submit" disabled={mutation.isPending}>
                      {mutation.isPending ? "Updating..." : "Update"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {partner.commission ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge>
                  {partner.commission.type.charAt(0).toUpperCase() +
                    partner.commission.type.slice(1)}
                </Badge>
                {partner.commission.type !== "tiered" && (
                  <Badge variant="secondary">
                    {partner.commission.type === "percentage"
                      ? `${partner.commission.value}%`
                      : `${partner.commission.value} ${partner.commission.currency}`}
                  </Badge>
                )}
              </div>

              {partner.commission.type === "tiered" && (
                <div className="space-y-2">
                  <div className="font-medium">Commission Tiers:</div>
                  <div className="grid gap-2">
                    {partner.commission.tiers.map((tier, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-2"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {tier.minStudents}
                            {tier.maxStudents
                              ? ` - ${tier.maxStudents}`
                              : "+"}{" "}
                            students
                          </span>
                        </div>
                        <Badge variant="secondary">{tier.value}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-lg border p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Payment Schedule:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {partner.commission.paymentSchedule === "on_enrollment"
                      ? "Payment on student enrollment"
                      : partner.commission.paymentSchedule ===
                        "after_first_semester"
                      ? "Payment after first semester"
                      : partner.commission.customTerms}
                  </p>
                </div>

                {partner.commission.terms && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Commission Terms:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {partner.commission.terms}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No commission details available.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
