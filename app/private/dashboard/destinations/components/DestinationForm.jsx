"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { destinationSchema, commonPrograms, commonAdmissionRequirements, commonVisaRequirements } from "@/lib/validations/destination";
import { Loader2, ImagePlus, X, AlertCircle, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { 
  createDestination, 
  updateDestination, 
  uploadDestinationImage, 
  deleteDestinationImage 
} from "@/actions/destination";
import FileUpload from "@/components/fileUpload";
import dynamic from "next/dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_GALLERY_IMAGES = 10;

// Dynamically import ImageView with SSR disabled
const ImageView = dynamic(() => import("@/components/ImageView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-muted">
      <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
    </div>
  ),
});

export default function DestinationForm({ initialData }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUploads, setImageUploads] = useState({
    mainImage: null,
    flagImage: null,
    galleryImages: [],
  });

  const form = useForm({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: initialData?.name || "",
      countryCode: initialData?.countryCode || "",
      capital: initialData?.capital || "",
      description: initialData?.description || "",
      quickFacts: initialData?.quickFacts || {
        population: "",
        language: "",
        currency: "",
        internationalStudents: "",
        averageCostOfLiving: 0,
        climateInfo: "",
        timeZone: "",
        visaProcessingTime: "",
      },
      studyInfo: initialData?.studyInfo || {
        averageTuitionFee: 0,
        academicYear: "",
        majorCities: [],
        popularPrograms: [],
        admissionRequirements: [],
        visaRequirements: [],
        workPermitInfo: "",
        prEligibility: "",
      },
      media: {
        mainImage: initialData?.media?.mainImage || null,
        flagImage: initialData?.media?.flagImage || null,
        galleryImages: initialData?.media?.galleryImages || [],
        videoUrl: initialData?.media?.videoUrl || "",
      },
      statistics: initialData?.statistics || {
        studentSatisfactionRate: 0,
        employmentRate: 0,
        internationalStudentRatio: 0,
        visaSuccessRate: 0,
      },
      status: initialData?.status || "draft",
    },
  });

  const validateFile = useCallback((file, type) => {
    if (!file) return "No file selected";
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Invalid file type. Only JPEG, PNG, and WebP images are allowed.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size too large. Maximum size is 5MB.";
    }
    if (type === "gallery" && imageUploads.galleryImages.length >= MAX_GALLERY_IMAGES) {
      return `Maximum ${MAX_GALLERY_IMAGES} gallery images allowed.`;
    }
    return null;
  }, [imageUploads.galleryImages.length]);

  const handleImageChange = useCallback(async (e, type) => {
    try {
      const files = Array.from(e.target.files);
      
      if (type === "gallery") {
        for (const file of files) {
          const error = validateFile(file, type);
          if (error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: error,
            });
            return;
          }
        }
        
        setImageUploads(prev => ({
          ...prev,
          galleryImages: [...prev.galleryImages, ...files].slice(0, MAX_GALLERY_IMAGES),
        }));
      } else {
        const file = files[0];
        const error = validateFile(file, type);
        if (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error,
          });
          return;
        }

        setImageUploads(prev => ({
          ...prev,
          [type]: file,
        }));
      }
    } catch (error) {
      console.error("Error handling image:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process image",
      });
    }
  }, [validateFile, toast]);

  const handleImageDelete = useCallback(async (type, index) => {
    try {
      if (!initialData?._id) {
        // Just remove from local state if destination hasn't been created yet
        if (type === "gallery") {
          setImageUploads(prev => ({
            ...prev,
            galleryImages: prev.galleryImages.filter((_, i) => i !== index),
          }));
        } else {
          setImageUploads(prev => ({
            ...prev,
            [type]: null,
          }));
        }
        return;
      }

      // Delete from server
      const url = new URL(`/api/destinations/${initialData._id}/images`, window.location.origin);
      url.searchParams.set('type', type);
      if (type === 'gallery' && typeof index === 'number') {
        url.searchParams.set('index', index.toString());
      }

      const response = await fetch(url.toString(), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }
      
      if (type === "gallery") {
        setImageUploads(prev => ({
          ...prev,
          galleryImages: prev.galleryImages.filter((_, i) => i !== index),
        }));
        const newUrls = form.getValues("media.galleryImages").filter((_, i) => i !== index);
        form.setValue("media.galleryImages", newUrls);
      } else {
        setImageUploads(prev => ({
          ...prev,
          [type]: null,
        }));
        form.setValue(`media.${type}`, null);
      }

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete image",
      });
    }
  }, [initialData?._id, form, toast]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      // Handle image uploads first
      let updatedMedia = {
        mainImage: data.media?.mainImage || null,
        flagImage: data.media?.flagImage || null,
        galleryImages: data.media?.galleryImages || [],
        videoUrl: data.media?.videoUrl || null,
      };

      // Upload main image if exists
      if (imageUploads.mainImage) {
        const formData = new FormData();
        formData.append('images', imageUploads.mainImage);
        formData.append('type', 'mainImage');

        const response = await fetch('/api/destinations/images', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload main image');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error || 'Failed to upload main image');
        }

        updatedMedia.mainImage = result.destination.media.mainImage;
      }

      // Upload flag image if exists
      if (imageUploads.flagImage) {
        const formData = new FormData();
        formData.append('images', imageUploads.flagImage);
        formData.append('type', 'flagImage');

        const response = await fetch('/api/destinations/images', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload flag image');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error || 'Failed to upload flag image');
        }

        updatedMedia.flagImage = result.destination.media.flagImage;
      }

      // Upload gallery images if exist
      if (imageUploads.galleryImages.length > 0) {
        const formData = new FormData();
        imageUploads.galleryImages.forEach(image => {
          formData.append('images', image);
        });
        formData.append('type', 'gallery');

        const response = await fetch('/api/destinations/images', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload gallery images');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error || 'Failed to upload gallery images');
        }

        updatedMedia.galleryImages = [
          ...data.media.galleryImages || [],
          ...result.destination.media.galleryImages
        ];
      }

      // Update the form data with the new media URLs
      const formattedData = {
        ...data,
        media: updatedMedia,
      };

      // Create or update the destination
      let result;
      if (initialData?._id) {
        result = await updateDestination(initialData._id, formattedData);
      } else {
        result = await createDestination(formattedData);
      }

      if (!result?.success) {
        throw new Error(result?.error || 'Failed to save destination');
      }

      toast({
        title: "Success",
        description: `Destination ${initialData?._id ? 'updated' : 'created'} successfully`,
      });

      router.push('/private/dashboard/destinations');
      router.refresh();

    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message || "Failed to save destination");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save destination",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Basic Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Canada" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code</FormLabel>
                <FormControl>
                    <Input 
                      placeholder="e.g., CA" 
                      maxLength={2} 
                      {...field} 
                      onChange={e => {
                        const value = e.target.value.toUpperCase();
                        field.onChange(value);
                      }}
                    />
                </FormControl>
                <FormDescription>2-letter ISO country code</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capital"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capital City</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Ottawa" {...field} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of the destination..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Quick Facts</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="quickFacts.population"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Population</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 38 million" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quickFacts.language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., English, French" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quickFacts.currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Canadian Dollar (CAD)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quickFacts.averageCostOfLiving"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Cost of Living (USD/year)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="15000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quickFacts.climateInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Climate Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description of the climate..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quickFacts.timeZone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Zone</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., GMT-5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quickFacts.visaProcessingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visa Processing Time</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 4-6 weeks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Study Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="studyInfo.averageTuitionFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Tuition Fee (USD/year)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="25000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studyInfo.academicYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Year</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., September to May" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="studyInfo.majorCities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major Cities</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter cities separated by commas"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((city) => city.trim())
                      )
                    }
                    value={field.value?.join(", ") || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studyInfo.popularPrograms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Popular Programs</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value?.length && "text-muted-foreground"
                        )}
                      >
                        {field.value?.length
                          ? `${field.value.length} programs selected`
                          : "Select programs"}
                        <ImagePlus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search programs..." />
                      <CommandEmpty>No program found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {commonPrograms.map((program) => (
                          <CommandItem
                            value={program}
                            key={program}
                            onSelect={() => {
                              const current = field.value || [];
                              const updated = current.includes(program)
                                ? current.filter((p) => p !== program)
                                : [...current, program];
                              field.onChange(updated);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value?.includes(program)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {program}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {field.value?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((program) => (
                      <Badge
                        key={program}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {program}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() =>
                            field.onChange(field.value.filter((p) => p !== program))
                          }
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studyInfo.admissionRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admission Requirements</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value?.length && "text-muted-foreground"
                        )}
                      >
                        {field.value?.length
                          ? `${field.value.length} requirements selected`
                          : "Select requirements"}
                        <ImagePlus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search requirements..." />
                      <CommandEmpty>No requirement found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {commonAdmissionRequirements.map((req) => (
                          <CommandItem
                            value={req}
                            key={req}
                            onSelect={() => {
                              const current = field.value || [];
                              const updated = current.includes(req)
                                ? current.filter((r) => r !== req)
                                : [...current, req];
                              field.onChange(updated);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value?.includes(req)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {req}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {field.value?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((req) => (
                      <Badge
                        key={req}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {req}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() =>
                            field.onChange(field.value.filter((r) => r !== req))
                          }
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studyInfo.visaRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visa Requirements</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value?.length && "text-muted-foreground"
                        )}
                      >
                        {field.value?.length
                          ? `${field.value.length} requirements selected`
                          : "Select requirements"}
                        <ImagePlus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search requirements..." />
                      <CommandEmpty>No requirement found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {commonVisaRequirements.map((req) => (
                          <CommandItem
                            value={req}
                            key={req}
                            onSelect={() => {
                              const current = field.value || [];
                              const updated = current.includes(req)
                                ? current.filter((r) => r !== req)
                                : [...current, req];
                              field.onChange(updated);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value?.includes(req)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {req}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {field.value?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((req) => (
                      <Badge
                        key={req}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {req}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() =>
                            field.onChange(field.value.filter((r) => r !== req))
                          }
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studyInfo.workPermitInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Permit Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Details about work permit policies..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studyInfo.prEligibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PR Eligibility Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Details about permanent residency eligibility..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Media</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Main Image</Label>
              <FileUpload
                folder="/destinations/main"
                onSuccess={(response) => {
                  form.setValue("media.mainImage", { url: response.url });
                }}
                onError={(error) => {
                  toast.error(error.message || "Failed to upload main image");
                }}
                existingUrl={form.watch("media.mainImage")?.url}
                onRemove={() => {
                  form.setValue("media.mainImage", { url: "" });
                }}
              />
              {form.watch("media.mainImage")?.url && (
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
              )}
            </div>
            <div className="space-y-2">
              <Label>Flag Image</Label>
              <FileUpload
                folder="/destinations/flags"
                onSuccess={(response) => {
                  form.setValue("media.flagImage", { url: response.url });
                }}
                onError={(error) => {
                  toast.error(error.message || "Failed to upload flag image");
                }}
                existingUrl={form.watch("media.flagImage")?.url}
                onRemove={() => {
                  form.setValue("media.flagImage", { url: "" });
                }}
              />
              {form.watch("media.flagImage")?.url && (
                <div className="mt-2">
                  <ImageView
                    src={form.watch("media.flagImage")?.url}
                    alt="Flag image preview"
                    className="w-full rounded-lg shadow-sm"
                    width={150}
                    height={100}
                    quality={100}
                    loading="lazy"
                    lo="true"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gallery Images</Label>
            <FileUpload
              folder="/destinations/gallery"
              onSuccess={(response) => {
                const currentGallery = form.watch("media.galleryImages") || [];
                form.setValue("media.galleryImages", [...currentGallery, { url: response.url }]);
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
                  <div key={index} className="relative group">
                    <ImageView
                      src={image.url}
                      alt={`Gallery image ${index + 1}`}
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
                ))}
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name="media.videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., https://youtube.com/watch?v=..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Statistics</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="statistics.studentSatisfactionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Satisfaction Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="85"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="statistics.employmentRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="90"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="statistics.internationalStudentRatio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>International Student Ratio (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="25"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="statistics.visaSuccessRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visa Success Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="95"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
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
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update" : "Create"} Destination
          </Button>
        </div>
      </form>
    </Form>
  );
} 