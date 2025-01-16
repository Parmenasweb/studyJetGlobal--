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
import { Loader2, ImagePlus, X, Check } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { universitySchema } from "@/lib/validations/university";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import FileUpload from "@/components/fileUpload";
import dynamic from "next/dynamic";
import { addUniversity, updateUniversity } from "@/actions/destination";

// Dynamically import ImageView with SSR disabled
const ImageView = dynamic(() => import("@/components/ImageView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-muted">
      <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
    </div>
  ),
});

// Common university facilities
const COMMON_FACILITIES = [
  "Library",
  "Computer Labs",
  "Research Centers",
  "Sports Complex",
  "Student Housing",
  "Cafeteria",
  "Health Center",
  "Career Center",
  "Study Rooms",
  "Auditorium",
  "Laboratories",
  "Parking",
  "WiFi",
  "Student Lounge",
  "Gym",
  "Swimming Pool",
  "Art Studio",
  "Music Room",
  "Theater",
  "International Student Office",
];

export default function UniversityForm({ destinationId, initialData }) {
  const router = useRouter();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openFacilities, setOpenFacilities] = useState(false);

  const form = useForm({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      type: initialData?.type || "public",
      ranking: initialData?.ranking || null,
      description: initialData?.description || "",
      website: initialData?.website || "",
      contactEmail: initialData?.contactEmail || "",
      contactPhone: initialData?.contactPhone || "",
      facilities: initialData?.facilities || [],
      media: initialData?.media || {
        mainImage: null,
        galleryImages: [],
      },
      status: initialData?.status || "active",
    },
  });

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      setError(null);

      if (initialData) {
        await updateUniversity(destinationId, initialData._id, data);
        toast({
          title: "Success",
          description: "University updated successfully",
        });
      } else {
        await addUniversity(destinationId, data);
        toast({
          title: "Success",
          description: "University created successfully",
        });
      }

      router.push(`/private/dashboard/destinations/${destinationId}/universities`);
      router.refresh();
    } catch (error) {
      console.error("Form submission error:", error);
      setError(error.message || "Something went wrong");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save university",
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
                <FormLabel>University Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., University of Toronto" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Toronto, Ontario" 
                    {...field} 
                    disabled={isLoading}
                  />
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
                <FormLabel>Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ranking"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ranking (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 100"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Leave empty if ranking is not available
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="e.g., https://www.utoronto.ca"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="e.g., admissions@utoronto.ca"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    country={"us"}
                    value={field.value}
                    onChange={(phone) => field.onChange(phone)}
                    inputStyle={{
                      width: "100%",
                      height: "40px",
                      fontSize: "16px",
                      borderRadius: "6px",
                      backgroundColor: theme === "dark" ? "hsl(var(--background))" : "white",
                      color: theme === "dark" ? "hsl(var(--foreground))" : "black",
                      borderColor: theme === "dark" ? "hsl(var(--border))" : "#e2e8f0",
                    }}
                    dropdownStyle={{
                      backgroundColor: theme === "dark" ? "hsl(var(--background))" : "white",
                      color: theme === "dark" ? "hsl(var(--foreground))" : "black",
                    }}
                    buttonStyle={{
                      backgroundColor: theme === "dark" ? "hsl(var(--background))" : "white",
                      borderColor: theme === "dark" ? "hsl(var(--border))" : "#e2e8f0",
                    }}
                    disabled={isLoading}
                  />
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
                  disabled={isLoading}
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
                  placeholder="Detailed description of the university..."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="facilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facilities</FormLabel>
              <FormControl>
                <Popover open={openFacilities} onOpenChange={setOpenFacilities}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openFacilities}
                      className="w-full justify-between"
                      disabled={isLoading}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} facilities selected`
                        : "Select facilities..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search facilities..." />
                      <CommandEmpty>No facility found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {COMMON_FACILITIES.map((facility) => (
                          <CommandItem
                            key={facility}
                            onSelect={() => {
                              const currentValue = field.value || [];
                              const newValue = currentValue.includes(facility)
                                ? currentValue.filter((f) => f !== facility)
                                : [...currentValue, facility];
                              field.onChange(newValue);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value?.includes(facility)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {facility}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Select all available facilities at the university
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Media</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Main Image</Label>
              <FileUpload
                folder={`/universities/${destinationId}/main`}
                onSuccess={(response) => {
                  form.setValue("media.mainImage", { 
                    url: response.url,
                    alt: "",
                    caption: "",
                    width: response.width,
                    height: response.height,
                    size: response.size
                  });
                }}
                onError={(error) => {
                  toast.error(error.message || "Failed to upload main image");
                }}
                existingUrl={form.watch("media.mainImage")?.url}
                onRemove={() => {
                  form.setValue("media.mainImage", null);
                }}
              />
              {form.watch("media.mainImage")?.url && (
                <div className="space-y-2">
                  <div className="mt-2">
                    <ImageView
                      src={form.watch("media.mainImage")?.url}
                      alt="Main image preview"
                      className="w-full rounded-lg shadow-sm"
                      width={300}
                      height={200}
                      quality={100}
                      loading="lazy"
                      lo="true"
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="media.mainImage.caption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Caption</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter image caption" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="media.mainImage.alt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alt Text</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter alt text for accessibility" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gallery Images</Label>
            <FileUpload
              folder={`/universities/${destinationId}/gallery`}
              onSuccess={(response) => {
                const currentGallery = form.watch("media.galleryImages") || [];
                form.setValue("media.galleryImages", [
                  ...currentGallery, 
                  { 
                    url: response.url,
                    alt: "",
                    caption: "",
                    width: response.width,
                    height: response.height,
                    size: response.size
                  }
                ]);
              }}
              onError={(error) => {
                toast.error(error.message || "Failed to upload gallery image");
              }}
              onRemove={() => {
                form.setValue("media.galleryImages", []);
              }}
            />
            {form.watch("media.galleryImages")?.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-4">
                {form.watch("media.galleryImages").map((image, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative group">
                      <ImageView
                    src={image.url}
                    alt={image.alt || `Gallery image ${index + 1}`}
                        className="w-full rounded-lg shadow-sm"
                        width={200}
                        height={150}
                        quality={100}
                        loading="lazy"
                        lo="true"
                      />
                      <Button
                    type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                          const currentGallery = form.watch("media.galleryImages");
                          form.setValue(
                            "media.galleryImages",
                            currentGallery.filter((_, i) => i !== index)
                          );
                        }}
                  >
                    <X className="h-4 w-4" />
                      </Button>
                </div>
                    <FormField
                      control={form.control}
                      name={`media.galleryImages.${index}.caption`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Caption</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter image caption" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`media.galleryImages.${index}.alt`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alt Text</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter alt text for accessibility" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                </div>
            )}
          </div>
        </div>

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
            {initialData ? "Update University" : "Add University"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 