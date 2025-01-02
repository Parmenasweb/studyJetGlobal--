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
  GraduationCap,
  Clock,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Edit,
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

const programSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  description: z.string().min(1, "Program description is required"),
  level: z.string().min(1, "Program level is required"),
  duration: z.object({
    value: z.number().min(1, "Duration value is required"),
    unit: z.string().min(1, "Duration unit is required"),
  }),
  startDates: z.array(z.string()).min(1, "At least one start date is required"),
  fees: z.object({
    amount: z.number().min(0, "Fee amount must be non-negative"),
    currency: z.string().min(1, "Currency is required"),
    period: z.string().min(1, "Fee period is required"),
  }),
  requirements: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
});

async function updatePrograms(data) {
  const res = await fetch(`/api/partners/programs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update programs");
  }

  return res.json();
}

export function Programs({ partner }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [startDates, setStartDates] = useState([
    new Date().toISOString().split("T")[0],
  ]);

  const form = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: "",
      description: "",
      level: "",
      duration: {
        value: 1,
        unit: "years",
      },
      startDates: [],
      fees: {
        amount: 0,
        currency: "USD",
        period: "per year",
      },
      requirements: [],
      isActive: true,
    },
  });

  const mutation = useMutation({
    mutationFn: updatePrograms,
    onSuccess: () => {
      toast.success(
        selectedProgram
          ? "Program updated successfully"
          : "Program added successfully"
      );
      setIsOpen(false);
      setSelectedProgram(null);
      form.reset();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      partnerId: partner._id,
      programId: selectedProgram?._id,
      ...data,
      startDates,
    });
  };

  const handleDeleteProgram = async (programId) => {
    try {
      const res = await fetch(
        `/api/partners/programs?partnerId=${partner._id}&programId=${programId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete program");
      }

      toast.success("Program deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete program");
    }
  };

  const handleEditProgram = (program) => {
    setSelectedProgram(program);
    setStartDates(program.startDates);
    form.reset({
      name: program.name,
      description: program.description,
      level: program.level,
      duration: program.duration,
      startDates: program.startDates,
      fees: program.fees,
      requirements: program.requirements,
      isActive: program.isActive,
    });
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Programs</CardTitle>
          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
              if (!open) {
                setSelectedProgram(null);
                form.reset();
                setStartDates([new Date().toISOString().split("T")[0]]);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedProgram ? "Edit Program" : "Add Program"}
                </DialogTitle>
                <DialogDescription>
                  {selectedProgram
                    ? "Edit program details for this partner."
                    : "Add a new program for this partner."}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Bachelor of Science"
                              {...field}
                            />
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
                          <FormControl>
                            <Input
                              placeholder="Undergraduate/Graduate"
                              {...field}
                            />
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
                            placeholder="Program description..."
                            {...field}
                          />
                        </FormControl>
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
                          <FormLabel>Duration Value</FormLabel>
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
                          <FormLabel>Duration Unit</FormLabel>
                          <FormControl>
                            <Input placeholder="years/months" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Start Dates</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setStartDates([
                            ...startDates,
                            new Date().toISOString().split("T")[0],
                          ])
                        }
                      >
                        Add Date
                      </Button>
                    </div>
                    {startDates.map((date, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => {
                            const newDates = [...startDates];
                            newDates[index] = e.target.value;
                            setStartDates(newDates);
                          }}
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newDates = startDates.filter(
                                (_, i) => i !== index
                              );
                              setStartDates(newDates);
                            }}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="fees.amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fee Amount</FormLabel>
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
                      name="fees.currency"
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
                      name="fees.period"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Period</FormLabel>
                          <FormControl>
                            <Input placeholder="per year" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button type="submit" disabled={mutation.isPending}>
                      {mutation.isPending
                        ? selectedProgram
                          ? "Updating..."
                          : "Adding..."
                        : selectedProgram
                        ? "Update Program"
                        : "Add Program"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {partner.programs && partner.programs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {partner.programs.map((program) => (
                <Card key={program._id}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-base font-medium">
                        {program.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{program.level}</Badge>
                        {program.isActive ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProgram(program)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Program</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this program? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteProgram(program._id)}
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
                        {program.description}
                      </p>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {program.duration.value} {program.duration.unit}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {program.startDates
                              .map((date) =>
                                new Date(date).toLocaleDateString("en-US", {
                                  month: "short",
                                  year: "numeric",
                                })
                              )
                              .join(", ")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {program.fees.amount.toLocaleString()}{" "}
                            {program.fees.currency} {program.fees.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No programs added yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
