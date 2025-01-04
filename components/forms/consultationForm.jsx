"use client";

import { useState, useEffect } from "react";
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
import ReactConfetti from 'react-confetti';
import { useTheme } from "next-themes";

export default function ConsultationForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { theme } = useTheme();
  
  // Update window dimensions state for confetti
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Update window dimensions on mount and resize
  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    updateWindowDimensions();

    // Add event listener
    window.addEventListener("resize", updateWindowDimensions);

    // Cleanup
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  // Scroll to top when showing confetti
  useEffect(() => {
    if (showConfetti) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

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
      setShowConfetti(true); // Trigger confetti
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <ReactConfetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
          />
        </div>
      )}
      <Card className="w-[90%] mb-7 mx-auto bg-card shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader className="space-y-4 text-center pb-6 border-b">
              <CardTitle className="text-xl md:text-3xl flex items-center justify-center font-bold tracking-tight">
                Schedule Your Free Consultation with StudyJetGlobal
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Take the first step towards your international journey
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="consulteeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} className="h-11" />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} className="h-11" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="required">Contact Number</Label>
                  <PhoneInput
                    country="us"
                    value={form.watch("contactNumber")}
                    onChange={(phone) => form.setValue("contactNumber", phone)}
                    inputProps={{
                      required: true,
                    }}
                    containerClass="phone-input-container"
                    inputClass={cn(
                      "!w-full !h-11 !text-base !rounded-md",
                      theme === "dark" && "!bg-background !text-foreground"
                    )}
                    buttonClass={cn(
                      "!h-11 !rounded-l-md",
                      theme === "dark" && "!bg-background"
                    )}
                    dropdownClass={theme === "dark" ? "dark-dropdown" : ""}
                  />
                  {form.formState.errors.contactNumber && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.contactNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>WhatsApp Number (Optional)</Label>
                  <PhoneInput
                    country="us"
                    value={form.watch("whatsAppNumber")}
                    onChange={(phone) => form.setValue("whatsAppNumber", phone)}
                    containerClass="phone-input-container"
                    inputClass={cn(
                      "!w-full !h-11 !text-base !rounded-md",
                      theme === "dark" && "!bg-background !text-foreground"
                    )}
                    buttonClass={cn(
                      "!h-11 !rounded-l-md",
                      theme === "dark" && "!bg-background"
                    )}
                    dropdownClass={theme === "dark" ? "dark-dropdown" : ""}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="selectedDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "h-11 w-full pl-3 text-left font-normal",
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
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select preferred time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, "0");
                            return (
                              <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                {`${hour}:00`}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="consultationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultation Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="study">Study Abroad</SelectItem>
                          <SelectItem value="work">Work Visa</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
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
                      <FormLabel>Consultation Mode</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="online">Online Meeting</SelectItem>
                          <SelectItem value="in-person">In-Person</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="interestedCountries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Countries of Interest</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const currentValues = field.value || [];
                        if (!currentValues.includes(value)) {
                          field.onChange([...currentValues, value]);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Add countries" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USA">India</SelectItem>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Canada">France</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="New Zealand">New Zealand</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="Ireland">Ireland</SelectItem>
                      </SelectContent>
                    </Select>
                    {field.value?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((country) => (
                          <div
                            key={country}
                            className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2"
                          >
                            {country}
                            <button
                              type="button"
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((c) => c !== country)
                                );
                              }}
                              className="hover:text-destructive transition-colors"
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
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your study abroad goals and any specific questions you have..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto min-w-[200px] h-11"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Schedule Consultation"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
