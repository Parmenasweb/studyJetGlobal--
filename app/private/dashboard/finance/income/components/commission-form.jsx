"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery } from "@tanstack/react-query";
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
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

async function getPartners() {
  try {
    const response = await fetch("/api/partners?status=active");
    if (!response.ok) throw new Error("Failed to fetch partners");
    const data = await response.json();
    return data.partners || []; // Ensure we return an array
  } catch (error) {
    console.error("Error fetching partners:", error);
    return []; // Return empty array on error
  }
}

async function getClients() {
  try {
    const response = await fetch("/api/clients");
    if (!response.ok) throw new Error("Failed to fetch clients");
    const data = await response.json();
    return data || []; // Ensure we return an array
  } catch (error) {
    console.error("Error fetching clients:", error);
    return []; // Return empty array on error
  }
}

const commissionSchema = z.object({
  // Basic Information
  amount: z.coerce
    .number()
    .min(0.01, "Amount must be greater than 0")
    .max(1000000, "Amount must be less than 1,000,000"),
  currency: z.enum(["USD", "EUR", "GBP", "CAD", "AUD"], {
    required_error: "Please select a currency",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  
  // Partner Information
  partnerId: z.string({
    required_error: "Please select a partner",
  }),
  partnerType: z.enum(["university", "agency"], {
    required_error: "Please select partner type",
  }),
  agreementReference: z.string().min(2, "Agreement reference is required"),
  
  // Commission Details
  commissionType: z.enum(["enrollment", "tuition", "visa", "accommodation", "other"], {
    required_error: "Please select commission type",
  }),
  commissionRate: z.coerce
    .number()
    .min(0, "Rate cannot be negative")
    .max(100, "Rate cannot exceed 100"),
  baseAmount: z.coerce
    .number()
    .min(0, "Base amount cannot be negative"),
  
  // Student Information
  clientId: z.string({
    required_error: "Please select a student",
  }),
  enrollmentPeriod: z.string().min(2, "Please specify enrollment period"),
  programLevel: z.string().min(2, "Please specify program level"),
  
  // Payment Details
  paymentMethod: z.enum(["bank-transfer", "wire-transfer", "check", "other"], {
    required_error: "Please select payment method",
  }),
  bankName: z.string().min(2, "Bank name is required"),
  accountName: z.string().min(2, "Account name is required"),
  transactionReference: z.string().min(2, "Transaction reference is required"),
  
  // Verification
  invoiceNumber: z.string().min(2, "Invoice number is required"),
  verificationStatus: z.enum(["pending", "verified", "rejected"], {
    required_error: "Please select verification status",
  }),
  verificationDate: z.date().optional(),
  verificationNotes: z.string().max(500).optional(),
  
  // Supporting Documents
  hasInvoice: z.boolean().default(false),
  hasAgreement: z.boolean().default(false),
  hasPaymentProof: z.boolean().default(false),
  
  // Additional Information
  reference: z.string().optional(),
  notes: z.string().max(1000, "Notes must be less than 1000 characters").optional(),
});

export function CommissionForm({ onSubmit, onCancel }) {
  const form = useForm({
    resolver: zodResolver(commissionSchema),
    defaultValues: {
      currency: "USD",
      date: new Date(),
      paymentMethod: "bank-transfer",
      verificationStatus: "pending",
      hasInvoice: false,
      hasAgreement: false,
      hasPaymentProof: false,
    },
  });

  const { data: partners = [], isLoading: isLoadingPartners, error: partnersError } = useQuery({
    queryKey: ["partners", "active"],
    queryFn: getPartners,
  });

  const { data: clients = [], isLoading: isLoadingClients, error: clientsError } = useQuery({
    queryKey: ["clients", "enrolled"],
    queryFn: getClients,
  });

  const handleSubmit = async (data) => {
    await onSubmit({
      ...data,
      type: "income",
      category: "commission",
    });
  };

  if (isLoadingPartners || isLoadingClients) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please wait while we load the form data...</p>
        </CardContent>
      </Card>
    );
  }

  if (partnersError || clientsError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {partnersError ? "Failed to load partners. " : ""}
              {clientsError ? "Failed to load clients. " : ""}
              Please try again later.
            </AlertDescription>
          </Alert>
          <Button onClick={onCancel} className="mt-4">Go Back</Button>
        </CardContent>
      </Card>
    );
  }

  if (partners.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There are no active partners in the system. Please add partners before creating commission entries.
            </AlertDescription>
          </Alert>
          <Button onClick={onCancel} className="mt-4">Go Back</Button>
        </CardContent>
      </Card>
    );
  }

  if (clients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Enrolled Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There are no enrolled clients in the system. Please add enrolled clients before creating commission entries.
            </AlertDescription>
          </Alert>
          <Button onClick={onCancel} className="mt-4">Go Back</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Income Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            All commission entries require proper documentation and verification before being marked as completed.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Commission Receipt Date</FormLabel>
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
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Partner Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="partnerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select partner type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="university">University Partner</SelectItem>
                        <SelectItem value="agency">Agency Partner</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select partner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {partners
                          .filter(partner => partner.type === form.watch("partnerType"))
                          .map((partner) => (
                            <SelectItem key={partner._id} value={partner._id}>
                              {partner.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreementReference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agreement Reference</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter agreement reference" {...field} />
                    </FormControl>
                    <FormDescription>
                      Reference number from the commission agreement
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Commission Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="commissionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select commission type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="enrollment">Enrollment Commission</SelectItem>
                        <SelectItem value="tuition">Tuition Commission</SelectItem>
                        <SelectItem value="visa">Visa Success Commission</SelectItem>
                        <SelectItem value="accommodation">Accommodation Commission</SelectItem>
                        <SelectItem value="other">Other Commission</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commissionRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="e.g., 15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="baseAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="Amount commission is calculated on" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients?.map((client) => (
                          <SelectItem key={client._id} value={client._id}>
                            {`${client.personalInfo.fullName} (${client.personalInfo.phone})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enrollmentPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enrollment Period</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Fall 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="programLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Level</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Undergraduate, Masters" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="wire-transfer">Wire Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter bank name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter account name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transactionReference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Reference</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter transaction reference" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Verification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter invoice number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="verificationStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending Verification</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Supporting Documents */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="hasInvoice"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Invoice Attached</FormLabel>
                      <FormDescription>
                        Commission invoice from partner
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasAgreement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Agreement Attached</FormLabel>
                      <FormDescription>
                        Commission agreement document
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasPaymentProof"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Payment Proof</FormLabel>
                      <FormDescription>
                        Payment receipt or transfer proof
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="verificationNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add verification notes or comments"
                        className="resize-none"
                        {...field}
                      />
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
                      <Textarea
                        placeholder="Add any additional notes here"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Commission Entry
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 