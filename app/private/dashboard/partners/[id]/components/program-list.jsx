"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
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
  GraduationCap,
  Clock,
  Calendar,
  DollarSign,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
} from "lucide-react";

const programSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  level: z.enum([
    "undergraduate",
    "postgraduate",
    "phd",
    "diploma",
    "certificate",
    "other",
  ]),
  duration: z.object({
    value: z.number().min(1, "Duration must be at least 1"),
    unit: z.enum(["months", "years", "semesters"]),
  }),
  tuitionFee: z.object({
    amount: z.number().min(0, "Amount must be at least 0"),
    currency: z.string().min(1, "Currency is required"),
    period: z.enum(["per_year", "per_semester", "total"]),
  }),
  intake: z.array(
    z.object({
      month: z.string().min(1, "Month is required"),
      deadline: z.string().min(1, "Deadline is required"),
    })
  ),
  requirements: z
    .array(z.string())
    .min(1, "At least one requirement is required"),
  isActive: z.boolean().default(true),
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

export function ProgramList({ partner }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [intakes, setIntakes] = useState([{ month: "", deadline: "" }]);
  const [requirements, setRequirements] = useState([""]);

  const form = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: "",
      level: "undergraduate",
      duration: {
        value: 1,
        unit: "years",
      },
      tuitionFee: {
        amount: 0,
        currency: "USD",
        period: "per_year",
      },
      intake: [{ month: "", deadline: "" }],
      requirements: [""],
      isActive: true,
    },
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      updatePartner(partner._id, {
        ...partner,
        programs: [...partner.programs, data],
      }),
    onSuccess: () => {
      toast.success("Program added successfully");
      setIsOpen(false);
      form.reset();
      setIntakes([{ month: "", deadline: "" }]);
      setRequirements([""]);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (programId) =>
      updatePartner(partner._id, {
        ...partner,
        programs: partner.programs.filter((p) => p._id !== programId),
      }),
    onSuccess: () => {
      toast.success("Program deleted successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleDelete = (programId) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      deleteMutation.mutate(programId);
    }
  };

  const addIntake = () => {
    setIntakes([...intakes, { month: "", deadline: "" }]);
  };

  const removeIntake = (index) => {
    const newIntakes = intakes.filter((_, i) => i !== index);
    setIntakes(newIntakes);
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const removeRequirement = (index) => {
    const newRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(newRequirements);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Programs</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Program</DialogTitle>
                <DialogDescription>
                  Add a new program for this partner.
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
                        <FormLabel>Program Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter program name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="undergraduate">
                                Undergraduate
                              </SelectItem>
                              <SelectItem value="postgraduate">
                                Postgraduate
                              </SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="diploma">Diploma</SelectItem>
                              <SelectItem value="certificate">
                                Certificate
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
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
                                min="1"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
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
                            <FormLabel>Unit</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="months">Months</SelectItem>
                                <SelectItem value="years">Years</SelectItem>
                                <SelectItem value="semesters">
                                  Semesters
                                </SelectItem>
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
                          <FormLabel>Tuition Fee</FormLabel>
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
                      name="tuitionFee.currency"
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
                      name="tuitionFee.period"
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
                              <SelectItem value="per_year">Per Year</SelectItem>
                              <SelectItem value="per_semester">
                                Per Semester
                              </SelectItem>
                              <SelectItem value="total">Total</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Intake Periods</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addIntake}
                      >
                        Add Intake
                      </Button>
                    </div>
                    {intakes.map((_, index) => (
                      <div key={index} className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`intake.${index}.month`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Month (e.g., September)"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-2">
                          <FormField
                            control={form.control}
                            name={`intake.${index}.deadline`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeIntake(index)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Requirements</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addRequirement}
                      >
                        Add Requirement
                      </Button>
                    </div>
                    {requirements.map((_, index) => (
                      <div key={index} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`requirements.${index}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="Enter requirement"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRequirement(index)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">Active Program</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit" disabled={mutation.isPending}>
                      {mutation.isPending ? "Adding..." : "Add Program"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {partner.programs.map((program) => (
              <div
                key={program._id}
                className="rounded-lg border p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{program.name}</span>
                  </div>
                  <Badge variant={program.isActive ? "success" : "secondary"}>
                    {program.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {program.duration.value} {program.duration.unit}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {program.tuitionFee.amount.toLocaleString()}{" "}
                    {program.tuitionFee.currency} {program.tuitionFee.period}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Intakes:{" "}
                    {program.intake
                      .map(
                        (intake) =>
                          `${intake.month} (${format(
                            new Date(intake.deadline),
                            "MMM d, yyyy"
                          )})`
                      )
                      .join(", ")}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium">Requirements:</div>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {program.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-destructive"
                    onClick={() => handleDelete(program._id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}

            {partner.programs.length === 0 && (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                No programs added yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
