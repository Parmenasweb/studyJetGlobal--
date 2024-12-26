"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { consultationSchema } from "@/lib/validations/consultation";
import FormError from "../dynamicComps/form-error";
import FormSuccess from "../dynamicComps/form-success";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ConsultationForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
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

  async function onSubmit(data) {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await fetch(`/api/consultations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit consultation request");
      }

      const result = await res.json();
      form.reset();
      setSuccess("🎉 Your consultation request has been submitted successfully! We'll contact you shortly.");
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="sm:w-[90%] lg:w-[50%] bg-primary-foreground p-4 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-center text-xl font-semibold my-3">
              Consultation Form
            </CardTitle>
            <CardDescription className="flex text-lg text-center my-3 items-center justify-center font-bold">
              Fill out the form below to schedule a consultation with our study
              abroad experts.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="consulteeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="selectedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="selectedTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consultationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consultation Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select consultation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="study">Study</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Mode</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interestedCountries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interested Countries</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const currentValues = field.value || [];
                      if (!currentValues.includes(value)) {
                        field.onChange([...currentValues, value]);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select countries" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="New Zealand">New Zealand</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Ireland">Ireland</SelectItem>
                      <SelectItem value="Netherlands">Netherlands</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((country) => (
                        <div
                          key={country}
                          className="bg-primary text-primary-foreground px-2 py-1 rounded-md flex items-center gap-2"
                        >
                          {country}
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(
                                field.value.filter((c) => c !== country)
                              );
                            }}
                            className="text-xs hover:text-red-500"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
                      placeholder="Briefly describe what you'd like to discuss during the consultation"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <div className="flex flex-col w-full items-center space-y-4">
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-1/2 py-6"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Schedule Consultation"
                )}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
