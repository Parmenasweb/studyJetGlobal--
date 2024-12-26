"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { addProgram, updateProgram } from "@/actions/destination";
import { programSchema } from "@/lib/validations/destination";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function ProgramForm({ destinationId, universityId, program }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: program?.name || "",
      level: program?.level || "",
      duration: program?.duration || "",
      tuitionFee: program?.tuitionFee || "",
      description: program?.description || "",
      intakes: program?.intakes || [],
      requirements: program?.requirements || [],
      status: program?.status || "active",
      language: program?.language || "",
      credits: program?.credits || "",
      campus: program?.campus || "",
      faculty: program?.faculty || "",
      department: program?.department || "",
      specializations: program?.specializations || [],
      careerOpportunities: program?.careerOpportunities || [],
      researchAreas: program?.researchAreas || [],
      applicationDeadlines: {
        fall: program?.applicationDeadlines?.fall ? new Date(program.applicationDeadlines.fall) : undefined,
        spring: program?.applicationDeadlines?.spring ? new Date(program.applicationDeadlines.spring) : undefined,
        summer: program?.applicationDeadlines?.summer ? new Date(program.applicationDeadlines.summer) : undefined,
      },
    },
  });

  // Handle array inputs
  const [intakeInput, setIntakeInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");
  const [specializationInput, setSpecializationInput] = useState("");
  const [careerInput, setCareerInput] = useState("");
  const [researchInput, setResearchInput] = useState("");

  const intakes = form.watch("intakes") || [];
  const requirements = form.watch("requirements") || [];
  const specializations = form.watch("specializations") || [];
  const careerOpportunities = form.watch("careerOpportunities") || [];
  const researchAreas = form.watch("researchAreas") || [];

  const handleArrayInput = (value, setValue, field) => {
    if (value.trim()) {
      const currentValues = form.watch(field) || [];
      form.setValue(field, [...currentValues, value.trim()]);
      setValue("");
    }
  };

  const removeArrayItem = (index, field) => {
    const currentValues = form.watch(field) || [];
    const newValues = currentValues.filter((_, i) => i !== index);
    form.setValue(field, newValues);
  };

  async function onSubmit(data) {
    try {
      setLoading(true);

      if (program) {
        await updateProgram(destinationId, universityId, program._id, data);
        toast({
          title: "Success",
          description: "Program updated successfully",
        });
      } else {
        await addProgram(destinationId, universityId, data);
        toast({
          title: "Success",
          description: "Program added successfully",
        });
      }

      router.push(`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs`);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Program name" {...field} />
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
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelors">Bachelor's</SelectItem>
                    <SelectItem value="masters">Master's</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="foundation">Foundation</SelectItem>
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
            name="tuitionFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tuition Fee</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Annual tuition fee"
                    {...field}
                  />
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
            name="credits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Credits</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Number of credits"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="campus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campus</FormLabel>
                <FormControl>
                  <Input placeholder="Campus location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty</FormLabel>
                <FormControl>
                  <Input placeholder="Faculty name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="Department name" {...field} />
                </FormControl>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Program description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Intakes</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add intake (e.g., September 2024)"
              value={intakeInput}
              onChange={(e) => setIntakeInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleArrayInput(intakeInput, setIntakeInput, "intakes"))}
            />
            <Button
              type="button"
              onClick={() => handleArrayInput(intakeInput, setIntakeInput, "intakes")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {intakes.map((intake, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {intake}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeArrayItem(index, "intakes")}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <FormLabel>Requirements</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add requirement"
              value={requirementInput}
              onChange={(e) => setRequirementInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleArrayInput(requirementInput, setRequirementInput, "requirements"))}
            />
            <Button
              type="button"
              onClick={() => handleArrayInput(requirementInput, setRequirementInput, "requirements")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {requirements.map((requirement, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {requirement}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeArrayItem(index, "requirements")}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <FormLabel>Specializations</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add specialization"
              value={specializationInput}
              onChange={(e) => setSpecializationInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleArrayInput(specializationInput, setSpecializationInput, "specializations"))}
            />
            <Button
              type="button"
              onClick={() => handleArrayInput(specializationInput, setSpecializationInput, "specializations")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {specializations.map((specialization, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {specialization}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeArrayItem(index, "specializations")}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <FormLabel>Career Opportunities</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add career opportunity"
              value={careerInput}
              onChange={(e) => setCareerInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleArrayInput(careerInput, setCareerInput, "careerOpportunities"))}
            />
            <Button
              type="button"
              onClick={() => handleArrayInput(careerInput, setCareerInput, "careerOpportunities")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {careerOpportunities.map((career, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {career}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeArrayItem(index, "careerOpportunities")}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <FormLabel>Research Areas</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add research area"
              value={researchInput}
              onChange={(e) => setResearchInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleArrayInput(researchInput, setResearchInput, "researchAreas"))}
            />
            <Button
              type="button"
              onClick={() => handleArrayInput(researchInput, setResearchInput, "researchAreas")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {researchAreas.map((area, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {area}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeArrayItem(index, "researchAreas")}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Application Deadlines</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FormField
              control={form.control}
              name="applicationDeadlines.fall"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fall Intake</FormLabel>
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
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
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
              name="applicationDeadlines.spring"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Spring Intake</FormLabel>
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
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
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
              name="applicationDeadlines.summer"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Summer Intake</FormLabel>
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
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {program ? "Update" : "Create"} Program
          </Button>
        </div>
      </form>
    </Form>
  );
} 