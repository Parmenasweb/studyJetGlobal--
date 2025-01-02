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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Users,
  GraduationCap,
  Clock,
  Star,
  Plus,
  MessageSquare,
} from "lucide-react";

const performanceSchema = z.object({
  activeStudents: z.number().min(0, "Active students must be at least 0"),
  totalStudents: z.number().min(0, "Total students must be at least 0"),
  successRate: z
    .number()
    .min(0, "Success rate must be at least 0")
    .max(100, "Success rate cannot exceed 100"),
  averageProcessingTime: z
    .number()
    .min(0, "Average processing time must be at least 0"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  feedback: z.array(
    z.object({
      date: z.string(),
      content: z.string().min(1, "Feedback content is required"),
    })
  ),
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

export function PerformanceMetrics({ partner }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState(
    partner.performance?.feedback || [
      { date: new Date().toISOString(), content: "" },
    ]
  );

  const form = useForm({
    resolver: zodResolver(performanceSchema),
    defaultValues: partner.performance || {
      activeStudents: 0,
      totalStudents: 0,
      successRate: 0,
      averageProcessingTime: 0,
      rating: 3,
      feedback: [{ date: new Date().toISOString(), content: "" }],
    },
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      updatePartner(partner._id, {
        ...partner,
        performance: data,
      }),
    onSuccess: () => {
      toast.success("Performance metrics updated successfully");
      setIsOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const addFeedback = () => {
    setFeedback([...feedback, { date: new Date().toISOString(), content: "" }]);
  };

  const removeFeedback = (index) => {
    const newFeedback = feedback.filter((_, i) => i !== index);
    setFeedback(newFeedback);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Performance Metrics</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Update Metrics
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Update Performance Metrics</DialogTitle>
                <DialogDescription>
                  Update performance metrics for this partner.
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
                      name="activeStudents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Active Students</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
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
                      name="totalStudents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Students</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
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
                      name="successRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Success Rate (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
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
                      name="averageProcessingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Average Processing Time (days)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
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
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating (1-5)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              step="0.1"
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
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Feedback</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addFeedback}
                      >
                        Add Feedback
                      </Button>
                    </div>
                    {feedback.map((_, index) => (
                      <div
                        key={index}
                        className="rounded-lg border p-4 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Feedback Entry {index + 1}
                          </h4>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFeedback(index)}
                              className="text-destructive"
                            >
                              Remove
                            </Button>
                          )}
                        </div>

                        <FormField
                          control={form.control}
                          name={`feedback.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`feedback.${index}.content`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter feedback"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <DialogFooter>
                    <Button type="submit" disabled={mutation.isPending}>
                      {mutation.isPending ? "Updating..." : "Update"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {partner.performance ? (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Students
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {partner.performance.activeStudents}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Students
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {partner.performance.totalStudents}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Success Rate
                    </CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {partner.performance.successRate.toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Processing Time
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {partner.performance.averageProcessingTime} days
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < Math.floor(partner.performance.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {partner.performance.rating.toFixed(1)} / 5.0
                  </div>
                </CardContent>
              </Card>

              {partner.performance.feedback &&
                partner.performance.feedback.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Feedback History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {partner.performance.feedback.map((entry, index) => (
                          <div
                            key={index}
                            className="rounded-lg border p-4 space-y-2"
                          >
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(entry.date), "PPP")}
                            </div>
                            <p>{entry.content}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No performance metrics available.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
