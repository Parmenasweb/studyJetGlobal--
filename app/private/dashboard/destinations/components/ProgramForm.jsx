"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { programSchema } from "@/lib/validations/destination";

export default function ProgramForm({ 
  destinationId, 
  initialData = null, 
  onSuccess, 
  onCancel 
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: initialData || {
      name: "",
      type: "undergraduate",
      duration: "",
      tuitionFee: "",
      currency: "USD",
      language: "English",
      description: "",
      requirements: [],
      intakes: [],
      status: "active",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/destinations/${destinationId}/programs${initialData ? `/${initialData._id}` : ''}`, {
        method: initialData ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save program');
      }

      toast({
        title: "Success",
        description: `Program ${initialData ? "updated" : "added"} successfully`,
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error saving program:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save program",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 4 years" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language of Instruction</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., English" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tuitionFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tuition Fee</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 20000" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                  />
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
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter requirements separated by commas"
                  {...field}
                  value={field.value?.join(", ") || ""}
                  onChange={(e) => {
                    const requirements = e.target.value
                      .split(",")
                      .map((r) => r.trim())
                      .filter(Boolean);
                    field.onChange(requirements);
                  }}
                />
              </FormControl>
              <FormDescription>
                List the requirements for this program
              </FormDescription>
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
              <FormControl>
                <Input
                  placeholder="Enter intakes separated by commas"
                  {...field}
                  value={field.value?.join(", ") || ""}
                  onChange={(e) => {
                    const intakes = e.target.value
                      .split(",")
                      .map((i) => i.trim())
                      .filter(Boolean);
                    field.onChange(intakes);
                  }}
                />
              </FormControl>
              <FormDescription>
                List available intake periods (e.g., September 2024, January 2025)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update" : "Add"} Program
          </Button>
        </div>
      </form>
    </Form>
  );
} 