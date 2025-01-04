"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function ImageUpload({ 
  onUpload, 
  value, 
  folder = "studyjet/general",
  className = "",
  disabled = false,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      onUpload(data);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {value?.url && (
        <div className="relative aspect-square w-32 overflow-hidden rounded-lg">
          <Image
            src={value.url}
            alt={value.alt || "Uploaded image"}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={isLoading || disabled}
        />
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
      </div>
    </div>
  );
} 