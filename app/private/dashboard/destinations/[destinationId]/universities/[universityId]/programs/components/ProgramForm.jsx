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
import { programSchema, PROGRAM_LEVELS, PROGRAM_FIELDS, COMMON_INTAKES, COMMON_PROGRAM_REQUIREMENTS } from "@/lib/validations/university";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { addProgram, updateProgram } from "@/actions/program";

export default function ProgramForm({ destinationId, universityId, initialData }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openField, setOpenField] = useState(false);
  const [openIntakes, setOpenIntakes] = useState(false);
  const [openRequirements, setOpenRequirements] = useState(false);

  const form = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: initialData?.name || "",
      field: initialData?.field || "",
      level: initialData?.level || "",
      duration: initialData?.duration || {
        value: 1,
        unit: "years",
      },
      tuitionFee: initialData?.tuitionFee || {
        amount: 0,
        currency: "USD",
        period: "per_year",
      },
      description: initialData?.description || "",
      intakes: initialData?.intakes || [],
      requirements: initialData?.requirements || [],
      language: initialData?.language || {
        name: "English",
        level: "B2",
      },
      status: initialData?.status || "active",
    },
  });

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      setError(null);

      const formattedData = {
        ...data,
        requirements: Array.isArray(data.requirements) 
          ? data.requirements.map(req => String(req).trim()).filter(Boolean)
          : []
      };

      console.log('Submitting program data:', formattedData);

      if (initialData) {
        await updateProgram(destinationId, universityId, initialData._id, formattedData);
      } else {
        await addProgram(destinationId, universityId, formattedData);
      }

      toast({
        title: "Success",
        description: `Program ${initialData ? "updated" : "created"} successfully`,
      });

      router.push(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`);
      router.refresh();
    } catch (error) {
      console.error("Form submission error:", error);
      setError(error.message || "Something went wrong");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save program",
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
                <FormLabel>Program Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Bachelor of Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROGRAM_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
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
            name="field"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <Popover open={openField} onOpenChange={setOpenField}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? PROGRAM_FIELDS.find(
                              (programField) => programField === field.value
                            )
                          : "Select field of study"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search fields..." />
                      <CommandEmpty>No field found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {PROGRAM_FIELDS.map((programField) => (
                          <CommandItem
                            key={programField}
                            onSelect={() => {
                              form.setValue("field", programField);
                              setOpenField(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === programField
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {programField}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="duration.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration.unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="years">Years</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="semesters">Semesters</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="tuitionFee.amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tuition Fee Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tuitionFee.currency"
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
            name="tuitionFee.period"
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
                    <SelectItem value="total">Total Program</SelectItem>
                  </SelectContent>
                </Select>
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
                  placeholder="Enter program description"
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
          name="intakes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intakes</FormLabel>
              <Popover open={openIntakes} onOpenChange={setOpenIntakes}>
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
                        ? `${field.value.length} intakes selected`
                        : "Select intakes"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search intakes..." />
                    <CommandEmpty>No intake found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {COMMON_INTAKES.map((intake) => (
                        <CommandItem
                          key={intake}
                          onSelect={() => {
                            const currentValue = field.value || [];
                            const newValue = currentValue.includes(intake)
                              ? currentValue.filter((i) => i !== intake)
                              : [...currentValue, intake];
                            form.setValue("intakes", newValue);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value?.includes(intake)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {intake}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((intake) => (
                    <Badge key={intake} variant="secondary">
                      {intake}
                    </Badge>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="language.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language of Instruction</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language.level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Language Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A1">A1 (Beginner)</SelectItem>
                    <SelectItem value="A2">A2 (Elementary)</SelectItem>
                    <SelectItem value="B1">B1 (Intermediate)</SelectItem>
                    <SelectItem value="B2">B2 (Upper Intermediate)</SelectItem>
                    <SelectItem value="C1">C1 (Advanced)</SelectItem>
                    <SelectItem value="C2">C2 (Mastery)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <Popover open={openRequirements} onOpenChange={setOpenRequirements}>
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
                        : "Select requirements"}
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
                            form.setValue("requirements", [...currentValue, input]);
                            document.querySelector('[cmdk-input]').value = '';
                          }
                        }}
                      >
                        Add custom requirement
                      </Button>
                    </CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {COMMON_PROGRAM_REQUIREMENTS.map((requirement) => (
                        <CommandItem
                          key={requirement}
                          onSelect={() => {
                            const currentValue = field.value || [];
                            const newValue = currentValue.includes(requirement)
                              ? currentValue.filter((r) => r !== requirement)
                              : [...currentValue, requirement];
                            form.setValue("requirements", newValue);
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
                          form.setValue("requirements", newValue);
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
            {initialData ? "Update Program" : "Add Program"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 