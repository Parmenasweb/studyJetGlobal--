"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { destinationSchema } from "@/lib/validations/destination";
import { Loader2, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { createDestination, updateDestination, uploadDestinationImage, deleteDestinationImage } from "@/actions/destination";

export default function DestinationForm({ initialData, onSuccess, onError }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [flagImageFile, setFlagImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const form = useForm({
    resolver: zodResolver(destinationSchema),
    defaultValues: initialData || {
      name: "",
      countryCode: "",
      capital: "",
      description: "",
      quickFacts: {
        population: "",
        language: "",
        currency: "",
        internationalStudents: "",
        averageCostOfLiving: 0,
        climateInfo: "",
      },
      studyInfo: {
        averageTuitionFee: 0,
        academicYear: "",
        majorCities: [],
        popularPrograms: [],
        admissionRequirements: [],
        visaRequirements: [],
      },
      media: {
        mainImage: "",
        flagImage: "",
        galleryImages: [],
        videoUrl: "",
      },
      statistics: {
        studentSatisfactionRate: 0,
        employmentRate: 0,
        internationalStudentRatio: 0,
      },
      status: "draft",
    },
  });

  const handleImageUpload = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("type", type);

      const response = await fetch(
        initialData 
          ? `/api/destinations/${initialData._id}/images` 
          : "/api/destinations/images",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.destination.media[type === "gallery" ? "galleryImages" : type === "banner" ? "mainImage" : "flagImage"];
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  async function onSubmit(data) {
    try {
      setIsLoading(true);

      // First create/update the destination without images
      const savedDestination = initialData
        ? await updateDestination(initialData._id, data)
        : await createDestination(data);

      // Then handle image uploads if any
      if (mainImageFile) {
        await uploadDestinationImage(savedDestination._id, mainImageFile, "banner");
      }
      if (flagImageFile) {
        await uploadDestinationImage(savedDestination._id, flagImageFile, "thumbnail");
      }
      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          await uploadDestinationImage(savedDestination._id, file, "gallery");
        }
      }

      onSuccess?.();
    } catch (error) {
      console.error("Form submission error:", error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleImageDelete(type, index) {
    try {
      if (!initialData?._id) return;

      await deleteDestinationImage(initialData._id, type, index);
      
      // Update the form state
      if (type === "banner") {
        setMainImageFile(null);
        form.setValue("media.mainImage", "");
      } else if (type === "thumbnail") {
        setFlagImageFile(null);
        form.setValue("media.flagImage", "");
      } else if (type === "gallery" && typeof index === "number") {
        const newGalleryFiles = [...galleryFiles];
        newGalleryFiles.splice(index, 1);
        setGalleryFiles(newGalleryFiles);
        
        const newUrls = [...form.getValues("media.galleryImages")];
        newUrls.splice(index, 1);
        form.setValue("media.galleryImages", newUrls);
      }

      toast({
        title: "Success",
        description: "Image deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      onError?.(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <Input placeholder="e.g., CA" maxLength={2} {...field} />
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
                <FormControl>
                  <Input
                    placeholder="Enter programs separated by commas"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((program) => program.trim())
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
            name="studyInfo.admissionRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admission Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter requirements separated by new lines"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .split("\n")
                          .map((req) => req.trim())
                          .filter(Boolean)
                      )
                    }
                    value={field.value?.join("\n") || ""}
                  />
                </FormControl>
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
                <FormControl>
                  <Textarea
                    placeholder="Enter requirements separated by new lines"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .split("\n")
                          .map((req) => req.trim())
                          .filter(Boolean)
                      )
                    }
                    value={field.value?.join("\n") || ""}
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
            <FormField
              control={form.control}
              name="media.mainImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Image (Banner)</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setMainImageFile(file);
                              field.onChange(URL.createObjectURL(file));
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => document.querySelector('input[name="media.mainImage"]').click()}
                        >
                          <ImagePlus className="h-4 w-4" />
                        </Button>
                        {field.value && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => handleImageDelete("banner")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {field.value && (
                        <div className="relative h-40 w-full overflow-hidden rounded-lg">
                          <Image
                            src={field.value}
                            alt="Main image preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Recommended size: 1920x1080px. Max size: 5MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="media.flagImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flag Image (Thumbnail)</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFlagImageFile(file);
                              field.onChange(URL.createObjectURL(file));
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => document.querySelector('input[name="media.flagImage"]').click()}
                        >
                          <ImagePlus className="h-4 w-4" />
                        </Button>
                        {field.value && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => handleImageDelete("thumbnail")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {field.value && (
                        <div className="relative h-40 w-full overflow-hidden rounded-lg">
                          <Image
                            src={field.value}
                            alt="Flag image preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Recommended size: 256x256px. Max size: 5MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="media.galleryImages"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Gallery Images</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            setGalleryFiles(prev => [...prev, ...files]);
                            field.onChange([
                              ...(field.value || []),
                              ...files.map(file => URL.createObjectURL(file))
                            ]);
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => document.querySelector('input[name="media.galleryImages"]').click()}
                        >
                          <ImagePlus className="h-4 w-4" />
                        </Button>
                      </div>
                      {field.value && field.value.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {field.value.map((url, index) => (
                            <div key={index} className="relative h-40 w-full overflow-hidden rounded-lg group">
                              <Image
                                src={url}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleImageDelete("gallery", index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Add multiple images to the destination gallery. Each image should be max 5MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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