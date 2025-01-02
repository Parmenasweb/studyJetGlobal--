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
  Home,
  Plus,
  Trash2,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const accommodationSchema = z.object({
  type: z.enum(["on_campus", "off_campus", "both"]),
  options: z.array(
    z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      description: z.string().optional(),
      cost: z.object({
        amount: z.number().min(0, "Amount must be at least 0"),
        currency: z.string().min(1, "Currency is required"),
        period: z.enum(["per_month", "per_semester", "per_year"]),
      }),
      amenities: z.array(z.string()),
      availability: z.enum(["available", "limited", "unavailable"]),
    })
  ),
  guaranteedForInternational: z.boolean().default(false),
  notes: z.string().optional(),
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

export function AccommodationDetails({ partner }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([
    {
      name: "",
      description: "",
      cost: {
        amount: 0,
        currency: "USD",
        period: "per_month",
      },
      amenities: [""],
      availability: "available",
    },
  ]);

  const form = useForm({
    resolver: zodResolver(accommodationSchema),
    defaultValues: partner.accommodation || {
      type: "both",
      options: [
        {
          name: "",
          description: "",
          cost: {
            amount: 0,
            currency: "USD",
            period: "per_month",
          },
          amenities: [""],
          availability: "available",
        },
      ],
      guaranteedForInternational: false,
      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      updatePartner(partner._id, {
        ...partner,
        accommodation: data,
      }),
    onSuccess: () => {
      toast.success("Accommodation details updated successfully");
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

  const addOption = () => {
    setOptions([
      ...options,
      {
        name: "",
        description: "",
        cost: {
          amount: 0,
          currency: "USD",
          period: "per_month",
        },
        amenities: [""],
        availability: "available",
      },
    ]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const addAmenity = (optionIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].amenities.push("");
    setOptions(newOptions);
  };

  const removeAmenity = (optionIndex, amenityIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].amenities = newOptions[
      optionIndex
    ].amenities.filter((_, i) => i !== amenityIndex);
    setOptions(newOptions);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Accommodation</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Update Accommodation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Update Accommodation</DialogTitle>
                <DialogDescription>
                  Update accommodation details for this partner.
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
                        <FormLabel>Accommodation Type</FormLabel>
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
                            <SelectItem value="on_campus">
                              On Campus Only
                            </SelectItem>
                            <SelectItem value="off_campus">
                              Off Campus Only
                            </SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Accommodation Options</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addOption}
                      >
                        Add Option
                      </Button>
                    </div>
                    {options.map((_, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="rounded-lg border p-4 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Option {optionIndex + 1}
                          </h4>
                          {optionIndex > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(optionIndex)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <FormField
                          control={form.control}
                          name={`options.${optionIndex}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`options.${optionIndex}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter description"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid gap-4 md:grid-cols-3">
                          <FormField
                            control={form.control}
                            name={`options.${optionIndex}.cost.amount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cost</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="0"
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
                            name={`options.${optionIndex}.cost.currency`}
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

                          <FormField
                            control={form.control}
                            name={`options.${optionIndex}.cost.period`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Period</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select period" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="per_month">
                                      Per Month
                                    </SelectItem>
                                    <SelectItem value="per_semester">
                                      Per Semester
                                    </SelectItem>
                                    <SelectItem value="per_year">
                                      Per Year
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <FormLabel>Amenities</FormLabel>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addAmenity(optionIndex)}
                            >
                              Add Amenity
                            </Button>
                          </div>
                          {options[optionIndex].amenities.map(
                            (_, amenityIndex) => (
                              <div key={amenityIndex} className="flex gap-2">
                                <FormField
                                  control={form.control}
                                  name={`options.${optionIndex}.amenities.${amenityIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input
                                          placeholder="Enter amenity"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                {amenityIndex > 0 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      removeAmenity(optionIndex, amenityIndex)
                                    }
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            )
                          )}
                        </div>

                        <FormField
                          control={form.control}
                          name={`options.${optionIndex}.availability`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Availability</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select availability" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="available">
                                    Available
                                  </SelectItem>
                                  <SelectItem value="limited">
                                    Limited
                                  </SelectItem>
                                  <SelectItem value="unavailable">
                                    Unavailable
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <FormField
                    control={form.control}
                    name="guaranteedForInternational"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">
                          Guaranteed for International Students
                        </FormLabel>
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
                            placeholder="Enter any additional notes"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
          {partner.accommodation ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge>
                  {partner.accommodation.type === "on_campus"
                    ? "On Campus Only"
                    : partner.accommodation.type === "off_campus"
                    ? "Off Campus Only"
                    : "On & Off Campus"}
                </Badge>
                {partner.accommodation.guaranteedForInternational && (
                  <Badge variant="success">
                    Guaranteed for International Students
                  </Badge>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {partner.accommodation.options.map((option, index) => (
                  <div key={index} className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{option.name}</span>
                      </div>
                      <Badge
                        variant={
                          option.availability === "available"
                            ? "success"
                            : option.availability === "limited"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {option.availability.charAt(0).toUpperCase() +
                          option.availability.slice(1)}
                      </Badge>
                    </div>

                    {option.description && (
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      {option.cost.amount.toLocaleString()}{" "}
                      {option.cost.currency} {option.cost.period}
                    </div>

                    {option.amenities.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Amenities:</div>
                        <div className="flex flex-wrap gap-1">
                          {option.amenities.map((amenity, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {partner.accommodation.notes && (
                <div className="rounded-lg border p-4">
                  <div className="font-medium">Additional Notes:</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {partner.accommodation.notes}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No accommodation details available.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
