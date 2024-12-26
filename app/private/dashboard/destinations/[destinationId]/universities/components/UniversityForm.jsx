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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { universitySchema } from "@/lib/validations/university";
import { addUniversity, updateUniversity } from "@/actions/destination";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function UniversityForm({ destinationId, initialData }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(universitySchema),
    defaultValues: initialData || {
      name: "",
      location: "",
      type: "public",
      ranking: 0,
      description: "",
      website: "",
      contactEmail: "",
      contactPhone: "",
      facilities: [],
      images: [],
      status: "active",
      partnershipDetails: {
        startDate: "",
        endDate: "",
        agreementFile: "",
        commissionRate: 0,
        notes: "",
      },
    },
  });

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      setError(null);

      // Handle image uploads first
      const imagePromises = images.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const response = await fetch(`/api/upload`, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) throw new Error("Failed to upload image");
        return response.json();
      });

      const uploadedImages = await Promise.all(imagePromises);
      data.images = [
        ...form.getValues("images"),
        ...uploadedImages.map((img) => ({
          url: img.url,
          caption: "",
        })),
      ];

      // Create or update university
      if (initialData) {
        await updateUniversity(destinationId, initialData._id, data);
        toast.success("University updated successfully");
      } else {
        await addUniversity(destinationId, data);
        toast.success("University added successfully");
      }

      router.push(`/private/dashboard/destinations/${destinationId}/universities`);
      router.refresh();
    } catch (error) {
      console.error("Form submission error:", error);
      setError(error.message || "Something went wrong");
      toast.error(error.message || "Failed to save university");
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
                <FormLabel>Ranking</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 100"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={isLoading}
                  />
                </FormControl>
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
                  <Input
                    type="tel"
                    placeholder="e.g., +1 416-978-2011"
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
                <Input
                  placeholder="Enter facilities separated by commas"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((item) => item.trim())
                    )
                  }
                  value={field.value?.join(", ") || ""}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Enter facilities separated by commas (e.g., Library, Gym, Labs)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Images</FormLabel>
          <div className="grid grid-cols-3 gap-4">
            {form.watch("images")?.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <Image
                  src={image.url}
                  alt={image.caption || "University image"}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    const images = form.getValues("images");
                    images.splice(index, 1);
                    form.setValue("images", images);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {images.map((file, index) => (
              <div
                key={`preview-${index}`}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <label className={`relative aspect-video rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={isLoading}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <ImagePlus className="h-6 w-6 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Add Image</span>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Partnership Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="partnershipDetails.startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
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
              name="partnershipDetails.endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
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
              name="partnershipDetails.commissionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="partnershipDetails.notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes about the partnership..."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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