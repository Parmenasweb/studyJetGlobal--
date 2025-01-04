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
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
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

      // Handle main image upload
      if (mainImage) {
        const formData = new FormData();
        formData.append("file", mainImage);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload main image");
        }

        const imageData = await response.json();
        data.media = {
          ...data.media,
          mainImage: {
            url: imageData.secure_url,
            alt: data.name,
          },
        };
      } else if (initialData?.media?.mainImage) {
        // Keep the existing main image if no new one is uploaded
        data.media = {
          ...data.media,
          mainImage: initialData.media.mainImage,
        };
      }

      // Handle gallery images upload
      if (galleryImages.length > 0) {
        const uploadPromises = galleryImages.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("Failed to upload gallery image");
          }

          const imageData = await response.json();
          return {
            url: imageData.secure_url,
            alt: `${data.name} gallery image`,
          };
        });

        const uploadedImages = await Promise.all(uploadPromises);
        data.media.galleryImages = [
          ...(initialData?.media?.galleryImages || []),
          ...uploadedImages,
        ];
      } else if (initialData?.media?.galleryImages) {
        // Keep existing gallery images if no new ones are uploaded
        data.media.galleryImages = initialData.media.galleryImages;
      }

      // Create or update university
      const response = await fetch(
        `/api/destinations/${destinationId}/universities${
          initialData ? `/${initialData._id}` : ""
        }`,
        {
          method: initialData ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save university");
      }

      toast({
        title: "Success",
        description: `University ${initialData ? "updated" : "created"} successfully`,
      });

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

  const handleMainImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleGalleryImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setGalleryImages((prev) => [...prev, ...files]);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

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
          <div>
            <FormLabel>Main Image</FormLabel>
            <div className="mt-2 flex items-center gap-4">
              {(mainImage || initialData?.media?.mainImage) && (
                <div className="relative h-40 w-40 overflow-hidden rounded-lg">
                  <Image
                    src={
                      mainImage
                        ? URL.createObjectURL(mainImage)
                        : initialData.media.mainImage.url
                    }
                    alt="Main university image"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setMainImage(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <label className="cursor-pointer">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                >
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Upload Main Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMainImageUpload}
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>

          <div>
            <FormLabel>Gallery Images</FormLabel>
            <div className="mt-2 grid grid-cols-3 gap-4">
              {initialData?.media?.galleryImages?.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden bg-muted"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const images = form.getValues("media.galleryImages");
                      images.splice(index, 1);
                      form.setValue("media.galleryImages", images);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {galleryImages.map((file, index) => (
                <div
                  key={`new-${index}`}
                  className="relative aspect-video rounded-lg overflow-hidden bg-muted"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`New gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="cursor-pointer">
                <div className="flex items-center justify-center aspect-video rounded-lg border-2 border-dashed hover:border-primary transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Add Image
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryImageUpload}
                    disabled={isLoading}
                  />
                </div>
              </label>
            </div>
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