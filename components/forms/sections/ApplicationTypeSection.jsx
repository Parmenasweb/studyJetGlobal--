"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ApplicationTypeSection({ form }) {
  return (
    <FormField
      control={form.control}
      name="applicationType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>What would you like to apply for?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <FormItem>
                <FormControl>
                  <Card
                    className={cn(
                      "relative flex items-center space-x-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                      field.value === "study" &&
                        "border-primary hover:bg-accent"
                    )}
                    onClick={() => field.onChange("study")}
                  >
                    <RadioGroupItem
                      value="study"
                      id="study"
                      className="absolute right-4"
                    />
                    <div className="space-y-1">
                      <p className="text-base font-medium leading-none">
                        Study Abroad
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Apply for studying at universities abroad
                      </p>
                    </div>
                  </Card>
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <Card
                    className={cn(
                      "relative flex items-center space-x-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                      field.value === "work" && "border-primary hover:bg-accent"
                    )}
                    onClick={() => field.onChange("work")}
                  >
                    <RadioGroupItem
                      value="work"
                      id="work"
                      className="absolute right-4"
                    />
                    <div className="space-y-1">
                      <p className="text-base font-medium leading-none">
                        Work Abroad
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Apply for job opportunities abroad
                      </p>
                    </div>
                  </Card>
                </FormControl>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
