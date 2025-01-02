"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

const partnerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["university", "agency", "independent_agent"]),
  status: z.enum(["active", "pending", "inactive", "suspended"]),
  description: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  location: z.object({
    address: z.string().optional(),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().optional(),
    country: z.string().min(2, "Country is required"),
    postalCode: z.string().optional(),
    coordinates: z
      .object({
        lat: z.number().optional(),
        lng: z.number().optional(),
      })
      .optional(),
  }),
  contactPersons: z
    .array(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        position: z.string().optional(),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        isMainContact: z.boolean().default(false),
      })
    )
    .min(1, "At least one contact person is required"),
});

async function createPartner(data) {
  const res = await fetch("/api/partners", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create partner");
  }

  return res.json();
}

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

export function PartnerForm({ partner }) {
  const router = useRouter();
  const [contactPersons, setContactPersons] = useState(
    partner?.contactPersons || [{ isMainContact: true }]
  );

  const form = useForm({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: partner?.name || "",
      type: partner?.type || "university",
      status: partner?.status || "pending",
      description: partner?.description || "",
      website: partner?.website || "",
      location: {
        address: partner?.location?.address || "",
        city: partner?.location?.city || "",
        state: partner?.location?.state || "",
        country: partner?.location?.country || "",
        postalCode: partner?.location?.postalCode || "",
        coordinates: partner?.location?.coordinates || {},
      },
      contactPersons: partner?.contactPersons || [{ isMainContact: true }],
    },
  });

  const mutation = useMutation({
    mutationFn: partner
      ? (data) => updatePartner(partner._id, data)
      : createPartner,
    onSuccess: () => {
      toast.success(
        partner
          ? "Partner updated successfully"
          : "Partner created successfully"
      );
      router.push("/private/dashboard/partners");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const addContactPerson = () => {
    const newContactPersons = [
      ...form.getValues("contactPersons"),
      { isMainContact: false },
    ];
    form.setValue("contactPersons", newContactPersons);
    setContactPersons(newContactPersons);
  };

  const removeContactPerson = (index) => {
    const newContactPersons = form
      .getValues("contactPersons")
      .filter((_, i) => i !== index);
    form.setValue("contactPersons", newContactPersons);
    setContactPersons(newContactPersons);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Partner Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter partner name" {...field} />
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
                <FormLabel>Partner Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select partner type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="agency">Agency</SelectItem>
                    <SelectItem value="independent_agent">
                      Independent Agent
                    </SelectItem>
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter partner description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Location</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="location.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter state/province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter postal code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Contact Persons</h3>
            <Button type="button" variant="outline" onClick={addContactPerson}>
              Add Contact Person
            </Button>
          </div>

          {contactPersons.map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Contact Person {index + 1}</h4>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeContactPerson(index)}
                    className="text-destructive"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`contactPersons.${index}.name`}
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
                  name={`contactPersons.${index}.position`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter position" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`contactPersons.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`contactPersons.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {partner ? "Update Partner" : "Create Partner"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
