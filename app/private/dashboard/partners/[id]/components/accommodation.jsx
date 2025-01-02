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
  Home,
  DollarSign,
  MapPin,
  Plus,
  Trash2,
  Edit,
  Bed,
  Wifi,
  UtensilsCrossed,
  Bath,
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
import { Checkbox } from "@/components/ui/checkbox";

const accommodationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  monthlyRent: z.number().min(0, "Monthly rent must be at least 0"),
  depositAmount: z.number().min(0, "Deposit amount must be at least 0"),
  features: z.object({
    furnished: z.boolean(),
    wifi: z.boolean(),
    meals: z.boolean(),
    ensuiteBathroom: z.boolean(),
  }),
  availability: z.enum(["available", "limited", "unavailable"]),
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

export function Accommodation({ partner }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  const form = useForm({
    resolver: zodResolver(accommodationSchema),
    defaultValues: selectedAccommodation || {
      name: "",
      type: "",
      description: "",
      location: "",
      monthlyRent: 0,
      depositAmount: 0,
      features: {
        furnished: false,
        wifi: false,
        meals: false,
        ensuiteBathroom: false,
      },
      availability: "available",
      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      const updatedAccommodations = selectedAccommodation
        ? partner.accommodations.map((accommodation) =>
            accommodation._id === selectedAccommodation._id
              ? { ...accommodation, ...data }
              : accommodation
          )
        : [...(partner.accommodations || []), { ...data, _id: Date.now() }];

      return updatePartner(partner._id, {
        ...partner,
        accommodations: updatedAccommodations,
      });
    },
    onSuccess: () => {
      toast.success(
        selectedAccommodation
          ? "Accommodation updated successfully"
          : "Accommodation added successfully"
      );
      setIsOpen(false);
      setSelectedAccommodation(null);
      form.reset();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (accommodationId) => {
      const updatedAccommodations = partner.accommodations.filter(
        (accommodation) => accommodation._id !== accommodationId
      );

      return updatePartner(partner._id, {
        ...partner,
        accommodations: updatedAccommodations,
      });
    },
    onSuccess: () => {
      toast.success("Accommodation deleted successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleEdit = (accommodation) => {
    setSelectedAccommodation(accommodation);
    form.reset(accommodation);
    setIsOpen(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "available":
        return "success";
      case "limited":
        return "warning";
      case "unavailable":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Accommodation</CardTitle>
          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
              if (!open) {
                setSelectedAccommodation(null);
                form.reset();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Accommodation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedAccommodation
                    ? "Edit Accommodation"
                    : "Add Accommodation"}
                </DialogTitle>
                <DialogDescription>
                  {selectedAccommodation
                    ? "Edit accommodation information for this partner."
                    : "Add a new accommodation option for this partner."}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Accommodation name" {...field} />
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
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select type</option>
                            <option value="Dormitory">Dormitory</option>
                            <option value="Shared Apartment">
                              Shared Apartment
                            </option>
                            <option value="Private Room">Private Room</option>
                            <option value="Studio">Studio</option>
                            <option value="Homestay">Homestay</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Accommodation description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="monthlyRent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Rent (USD)</FormLabel>
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
                      name="depositAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deposit Amount (USD)</FormLabel>
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

                  <div className="space-y-4">
                    <FormLabel>Features</FormLabel>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="features.furnished"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">Furnished</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="features.wifi"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">Wi-Fi</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="features.meals"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">Meals</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="features.ensuiteBathroom"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">
                              En-suite Bathroom
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="available">Available</option>
                            <option value="limited">Limited</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
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
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Additional notes" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit" disabled={mutation.isPending}>
                      {mutation.isPending
                        ? selectedAccommodation
                          ? "Updating..."
                          : "Adding..."
                        : selectedAccommodation
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
          {partner.accommodations && partner.accommodations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {partner.accommodations.map((accommodation) => (
                <Card key={accommodation._id}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-base font-medium">
                        {accommodation.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{accommodation.type}</Badge>
                        <Badge
                          variant={getAvailabilityColor(
                            accommodation.availability
                          )}
                        >
                          {accommodation.availability}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(accommodation)}
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
                              Delete Accommodation
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this
                              accommodation? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteMutation.mutate(accommodation._id)
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
                      <p className="text-sm text-muted-foreground">
                        {accommodation.description}
                      </p>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          Location: {accommodation.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                          Monthly Rent:{" "}
                          {formatCurrency(accommodation.monthlyRent)}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                          Deposit: {formatCurrency(accommodation.depositAmount)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {accommodation.features.furnished && (
                            <Badge variant="secondary">
                              <Bed className="mr-1 h-3 w-3" />
                              Furnished
                            </Badge>
                          )}
                          {accommodation.features.wifi && (
                            <Badge variant="secondary">
                              <Wifi className="mr-1 h-3 w-3" />
                              Wi-Fi
                            </Badge>
                          )}
                          {accommodation.features.meals && (
                            <Badge variant="secondary">
                              <UtensilsCrossed className="mr-1 h-3 w-3" />
                              Meals
                            </Badge>
                          )}
                          {accommodation.features.ensuiteBathroom && (
                            <Badge variant="secondary">
                              <Bath className="mr-1 h-3 w-3" />
                              En-suite
                            </Badge>
                          )}
                        </div>
                      </div>
                      {accommodation.notes && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Notes</h4>
                          <p className="text-sm text-muted-foreground">
                            {accommodation.notes}
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
              No accommodation options added yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
