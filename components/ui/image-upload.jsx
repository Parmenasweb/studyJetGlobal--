"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";

export function ImageUpload({ 
  onUpload, 
  value,
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

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload image");
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
          <img
            src={value.url}
            alt="Uploaded image"
            className="h-full w-full object-cover"
          />
          <button
            onClick={() => onUpload(null)}
            className="absolute right-1 top-1 rounded-full bg-background/80 p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
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