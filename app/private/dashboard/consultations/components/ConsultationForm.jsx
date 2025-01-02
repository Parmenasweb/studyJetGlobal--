"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { consultationSchema } from "@/lib/validations/consultation";
import FormError from "@/components/dynamicComps/form-error";
import FormSuccess from "@/components/dynamicComps/form-success";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useToast } from "@/components/ui/use-toast";

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return [
    { value: `${hour}:00`, label: `${hour}:00` },
    { value: `${hour}:30`, label: `${hour}:30` },
  ];
}).flat();

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "New Zealand",
  "Ireland",
  "Germany",
  "France",
  "Spain",
  "Italy",
  // Add more countries as needed
];

export default function ConsultationForm({ initialData }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(consultationSchema),
    defaultValues: initialData || {
      consulteeName: "",
      email: "",
      contactNumber: "",
      whatsAppNumber: "",
      selectedDate: new Date(),
      selectedTime: "",
      consultationType: "",
      preferredMode: "",
      interestedCountries: [],
      description: "",
      status: "pending",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const url = initialData
        ? `/api/consultations/${initialData._id}`
        : "/api/consultations";

      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to save consultation");
      }

      toast({
        title: initialData ? "Consultation Updated" : "Consultation Created",
        description: initialData
          ? "The consultation has been updated successfully."
          : "A new consultation has been created successfully.",
      });

      router.push("/private/dashboard/consultations");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="consulteeName">Full Name</Label>
              <Input
                id="consulteeName"
                {...form.register("consulteeName")}
                disabled={isLoading}
              />
              {form.formState.errors.consulteeName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.consulteeName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                disabled={isLoading}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Contact Number</Label>
              <PhoneInput
                country="us"
                value={form.watch("contactNumber")}
                onChange={(phone) => form.setValue("contactNumber", phone)}
                disabled={isLoading}
                inputProps={{
                  required: true,
                  className: "w-full p-2 border rounded-md",
                }}
                containerClass="w-full"
              />
              {form.formState.errors.contactNumber && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.contactNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>WhatsApp Number</Label>
              <PhoneInput
                country="us"
                value={form.watch("whatsAppNumber")}
                onChange={(phone) => form.setValue("whatsAppNumber", phone)}
                disabled={isLoading}
                inputProps={{
                  required: true,
                  className: "w-full p-2 border rounded-md",
                }}
                containerClass="w-full"
              />
              {form.formState.errors.whatsAppNumber && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.whatsAppNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("selectedDate") && "text-muted-foreground"
                    )}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("selectedDate") ? (
                      format(form.watch("selectedDate"), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch("selectedDate")}
                    onSelect={(date) => form.setValue("selectedDate", date)}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.selectedDate && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.selectedDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Select
                value={form.watch("selectedTime")}
                onValueChange={(value) => form.setValue("selectedTime", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.selectedTime && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.selectedTime.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Consultation Type</Label>
              <Select
                value={form.watch("consultationType")}
                onValueChange={(value) =>
                  form.setValue("consultationType", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.consultationType && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.consultationType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Preferred Mode</Label>
              <Select
                value={form.watch("preferredMode")}
                onValueChange={(value) => form.setValue("preferredMode", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.preferredMode && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.preferredMode.message}
                </p>
              )}
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Interested Countries</Label>
              <Select
                value={form.watch("interestedCountries")}
                onValueChange={(value) =>
                  form.setValue("interestedCountries", [value])
                }
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select countries" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.interestedCountries && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.interestedCountries.message}
                </p>
              )}
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Description</Label>
              <Textarea
                {...form.register("description")}
                disabled={isLoading}
                className="min-h-[100px]"
                placeholder="Please provide details about your consultation request..."
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="mr-2"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Update" : "Create"} Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
