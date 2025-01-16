"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  scholarshipSchema, 
  SCHOLARSHIP_TYPES, 
  SCHOLARSHIP_COVERAGE,
  COMMON_ELIGIBILITY_REQUIREMENTS,
  COMMON_APPLICATION_STEPS
} from "@/lib/validations/university";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { addScholarship, updateScholarship } from "@/actions/scholarship";

export default function ScholarshipForm({ destinationId, universityId, initialData }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openType, setOpenType] = useState(false);
  const [openCoverage, setOpenCoverage] = useState(false);
  const [openEligibility, setOpenEligibility] = useState(false);
  const [openApplicationProcess, setOpenApplicationProcess] = useState(false);

  const form = useForm({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type || "",
      coverage: initialData?.coverage || [],
      amount: initialData?.amount || {
        type: "fixed",
        value: 0,
      currency: "USD",
        period: "per_year",
      },
      description: initialData?.description || "",
      eligibility: initialData?.eligibility || [],
      deadline: initialData?.deadline || "",
      applicationProcess: initialData?.applicationProcess || [],
      status: initialData?.status || "active",
    },
  });

  const amountType = form.watch("amount.type");

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      setError(null);

      if (initialData) {
        await updateScholarship(destinationId, universityId, initialData._id, data);
      } else {
        await addScholarship(destinationId, universityId, data);
      }

        toast({
          title: "Success",
        description: `Scholarship ${initialData ? "updated" : "created"} successfully`,
      });

      router.push(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/scholarships`);
      router.refresh();
    } catch (error) {
      console.error("Form submission error:", error);
      setError(error.message || "Something went wrong");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save scholarship",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scholarship Name</FormLabel>
                  <FormControl>
                  <Input placeholder="e.g., Merit Scholarship" {...field} />
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
                <FormLabel>Scholarship Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scholarship type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SCHOLARSHIP_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="coverage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coverage</FormLabel>
              <Popover open={openCoverage} onOpenChange={setOpenCoverage}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value?.length && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length
                        ? `${field.value.length} items selected`
                        : "Select coverage items"}
                    </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search coverage..." />
                    <CommandEmpty>No coverage found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {SCHOLARSHIP_COVERAGE.map((item) => (
                        <CommandItem
                          key={item}
                          onSelect={() => {
                            const currentValue = field.value || [];
                            const newValue = currentValue.includes(item)
                              ? currentValue.filter((i) => i !== item)
                              : [...currentValue, item];
                            form.setValue("coverage", newValue);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value?.includes(item)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((item) => (
                    <Badge 
                      key={item} 
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {item}
                      <button
                        type="button"
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onClick={() => {
                          const newValue = field.value.filter((i) => i !== item);
                          form.setValue("coverage", newValue);
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
                    <FormMessage />
                  </FormItem>
                )}
              />

        <div className="space-y-4">
              <FormField
                control={form.control}
            name="amount.type"
                render={({ field }) => (
                  <FormItem>
                <FormLabel>Amount Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select amount type" />
                    </SelectTrigger>
                    </FormControl>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                  </SelectContent>
                </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

          <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
              name="amount.value"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel>
                    {amountType === "fixed" ? "Amount" : "Percentage"}
                  </FormLabel>
                    <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={amountType === "percentage" ? 100 : undefined}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            {amountType === "fixed" && (
              <FormField
                control={form.control}
                name="amount.currency"
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
            )}

            <FormField
              control={form.control}
              name="amount.period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Period</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="per_year">Per Year</SelectItem>
                      <SelectItem value="per_semester">Per Semester</SelectItem>
                      <SelectItem value="total">Total</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                <Textarea
                  placeholder="Enter scholarship description"
                  className="min-h-[100px]"
                  {...field}
                />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eligibility"
              render={({ field }) => (
                <FormItem>
              <FormLabel>Eligibility Requirements</FormLabel>
              <Popover open={openEligibility} onOpenChange={setOpenEligibility}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value?.length && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length
                        ? `${field.value.length} requirements selected`
                        : "Select eligibility requirements"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search requirements or add custom..." />
                    <CommandEmpty>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          const input = document.querySelector('[cmdk-input]').value;
                          if (input) {
                            const currentValue = field.value || [];
                            form.setValue("eligibility", [...currentValue, input]);
                            document.querySelector('[cmdk-input]').value = '';
                          }
                        }}
                      >
                        Add custom requirement
                      </Button>
                    </CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {COMMON_ELIGIBILITY_REQUIREMENTS.map((requirement) => (
                        <CommandItem
                          key={requirement}
                          onSelect={() => {
                            const currentValue = field.value || [];
                            const newValue = currentValue.includes(requirement)
                              ? currentValue.filter((r) => r !== requirement)
                              : [...currentValue, requirement];
                            form.setValue("eligibility", newValue);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value?.includes(requirement)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {requirement}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((requirement) => (
                    <Badge 
                      key={requirement} 
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {requirement}
                      <button
                        type="button"
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onClick={() => {
                          const newValue = field.value.filter((r) => r !== requirement);
                          form.setValue("eligibility", newValue);
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <FormDescription>
                Select from common requirements or add custom ones
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Deadline</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        <FormField
          control={form.control}
          name="applicationProcess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Process</FormLabel>
              <Popover open={openApplicationProcess} onOpenChange={setOpenApplicationProcess}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value?.length && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length
                        ? `${field.value.length} steps selected`
                        : "Select application steps"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search steps or add custom..." />
                    <CommandEmpty>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          const input = document.querySelector('[cmdk-input]').value;
                          if (input) {
                            const currentValue = field.value || [];
                            form.setValue("applicationProcess", [...currentValue, input]);
                            document.querySelector('[cmdk-input]').value = '';
                          }
                        }}
                      >
                        Add custom step
                      </Button>
                    </CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {COMMON_APPLICATION_STEPS.map((step) => (
                        <CommandItem
                          key={step}
                          onSelect={() => {
                            const currentValue = field.value || [];
                            const newValue = currentValue.includes(step)
                              ? currentValue.filter((s) => s !== step)
                              : [...currentValue, step];
                            form.setValue("applicationProcess", newValue);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value?.includes(step)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {step}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((step) => (
                    <Badge 
                      key={step} 
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {step}
                      <button
                        type="button"
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onClick={() => {
                          const newValue = field.value.filter((s) => s !== step);
                          form.setValue("applicationProcess", newValue);
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <FormDescription>
                Select from common steps or add custom ones
              </FormDescription>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
              >
                Cancel
              </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Scholarship" : "Add Scholarship"}
              </Button>
            </div>
          </form>
        </Form>
  );
} 