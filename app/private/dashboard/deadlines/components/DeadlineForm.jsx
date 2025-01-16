"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { deadlineSchema } from "@/lib/validations/deadline";
import { toast } from "sonner";

const typeOptions = [
  { value: "application", label: "Application" },
  { value: "document_submission", label: "Document Submission" },
  { value: "payment", label: "Payment" },
  { value: "visa", label: "Visa" },
  { value: "enrollment", label: "Enrollment" },
  { value: "accommodation", label: "Accommodation" },
  { value: "other", label: "Other" },
];

const priorityOptions = [
  { value: "low", label: "Low", class: "bg-secondary" },
  { value: "medium", label: "Medium", class: "bg-yellow-500" },
  { value: "high", label: "High", class: "bg-orange-500" },
  { value: "urgent", label: "Urgent", class: "bg-destructive" },
];

const statusOptions = [
  { value: "pending", label: "Pending", class: "bg-secondary" },
  { value: "in_progress", label: "In Progress", class: "bg-blue-500" },
  { value: "completed", label: "Completed", class: "bg-green-500" },
  { value: "overdue", label: "Overdue", class: "bg-destructive" },
];

export function DeadlineForm({ deadline, onSuccess }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const form = useForm({
    resolver: zodResolver(deadlineSchema),
    defaultValues: {
      title: deadline?.title || "",
      description: deadline?.description || "",
      type: deadline?.type || "",
      priority: deadline?.priority || "medium",
      status: deadline?.status || "pending",
      progress: deadline?.progress || 0,
      dueDate: deadline?.dueDate || new Date().toISOString(),
      reminderDate: deadline?.reminderDate || null,
      assignedTo: deadline?.assignedTo || null,
      relatedTo: deadline?.relatedTo || { type: "", id: "" },
      subtasks: deadline?.subtasks || [],
      tags: deadline?.tags || [],
    },
  });

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);
      const url = deadline
        ? `/api/deadlines?id=${deadline._id}`
        : "/api/deadlines";
      const method = deadline ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      toast.success(
        deadline
          ? "Deadline updated successfully"
          : "Deadline created successfully"
      );
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/private/dashboard/deadlines");
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleAddSubtask = () => {
    if (!subtaskInput.trim()) return;
    const currentSubtasks = form.getValues("subtasks");
    form.setValue("subtasks", [
      ...currentSubtasks,
      {
        title: subtaskInput,
        completed: false,
        dueDate: null,
      },
    ]);
    setSubtaskInput("");
  };

  const handleRemoveSubtask = (index) => {
    const currentSubtasks = form.getValues("subtasks");
    form.setValue(
      "subtasks",
      currentSubtasks.filter((_, i) => i !== index)
    );
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const currentTags = form.getValues("tags");
    if (!currentTags.includes(tagInput)) {
      form.setValue("tags", [...currentTags, tagInput]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter deadline title" {...field} />
              </FormControl>
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
                  placeholder="Enter deadline description"
                  className="min-h-[100px]"
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
            name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                <FormControl>
                  <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className={option.class}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                        variant="outline"
                        className={!field.value && "text-muted-foreground"}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                          format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                      selected={new Date(field.value)}
                      onSelect={(date) =>
                        field.onChange(date?.toISOString())
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
            name="reminderDate"
          render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Reminder Date (Optional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
              <FormControl>
                      <Button
                        variant="outline"
                        className={!field.value && "text-muted-foreground"}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Set reminder</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : null}
                      onSelect={(date) =>
                        field.onChange(date?.toISOString())
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

        <div className="space-y-4">
          <FormLabel>Subtasks</FormLabel>
          <div className="flex gap-2">
                <Input
              placeholder="Add a subtask"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSubtask();
                }
              }}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddSubtask}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {form.watch("subtasks").map((subtask, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span>{subtask.title}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSubtask(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <FormLabel>Tags</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddTag}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.watch("tags").map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {tag}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              "Saving..."
            ) : deadline ? (
              "Update Deadline"
            ) : (
              "Create Deadline"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
} 