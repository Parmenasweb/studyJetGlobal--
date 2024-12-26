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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { consultationSchema } from "@/lib/validations/consultation";
import FormError from "@/components/dynamicComps/form-error";
import FormSuccess from "@/components/dynamicComps/form-success";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ConsultationForm({ initialData }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setError("");
    setSuccess("");
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

      router.push("/private/dashboard/consultations");
      router.refresh();
    } catch (error) {
      setError(error.message || "Something went wrong");
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
                error={form.formState.errors.consulteeName?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                error={form.formState.errors.email?.message}
              />
            </div>

            <div className="space-y-2">
              <Label>Contact Number</Label>
              <PhoneInput
                country="us"
                value={form.watch("contactNumber")}
                onChange={(phone) => form.setValue("contactNumber", phone)}
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
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, "0");
                    return (
                      <>
                        <SelectItem value={`${hour}:00`}>{`${hour}:00`}</SelectItem>
                        <SelectItem value={`${hour}:30`}>{`${hour}:30`}</SelectItem>
                      </>
                    );
                  })}
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
                onValueChange={(value) => form.setValue("consultationType", value)}
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

            {initialData && (
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={form.watch("status")}
                  onValueChange={(value) => form.setValue("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.status && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.status.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea
                {...form.register("description")}
                rows={4}
                error={form.formState.errors.description?.message}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center space-y-4">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-1/2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <span>{initialData ? "Update" : "Create"} Consultation</span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
} 