"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function PersonalInformation({ form }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="personalInfo.fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <input
                {...field}
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="personalInfo.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <input
                {...field}
                type="email"
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="personalInfo.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <div className="phone-input-container">
                <PhoneInput
                  country={"ae"}
                  value={field.value}
                  onChange={field.onChange}
                  inputClass="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 !ml-2"
                  containerClass="w-full flex"
                  buttonClass="!border !border-input !rounded-l-md !h-10 !bg-background hover:!bg-accent hover:!text-accent-foreground"
                  dropdownClass="!bg-background !border !border-input"
                  searchClass="!bg-background !border !border-input"
                  enableSearch
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="personalInfo.whatsapp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp Number</FormLabel>
            <FormControl>
              <div className="phone-input-container">
                <PhoneInput
                  country={"ae"}
                  value={field.value}
                  onChange={field.onChange}
                  inputClass="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 !ml-2"
                  containerClass="w-full flex"
                  buttonClass="!border !border-input !rounded-l-md !h-10 !bg-background hover:!bg-accent hover:!text-accent-foreground"
                  dropdownClass="!bg-background !border !border-input"
                  searchClass="!bg-background !border !border-input"
                  enableSearch
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Add other personal information fields here */}
    </div>
  );
}
