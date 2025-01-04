"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const DOCUMENT_TYPES = [
  { value: "passport", label: "Passport" },
  { value: "visa", label: "Visa" },
  { value: "admission_letter", label: "Admission Letter" },
  { value: "academic_transcript", label: "Academic Transcript" },
  { value: "english_proficiency", label: "English Proficiency" },
  { value: "financial_statement", label: "Financial Statement" },
  { value: "accommodation_proof", label: "Accommodation Proof" },
  { value: "health_insurance", label: "Health Insurance" },
  { value: "other", label: "Other" }
];

export function DocumentUpload({ onUpload, isUploading = false }) {
  const [selectedType, setSelectedType] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Create previews for images
    const newPreviews = selectedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (!selectedType || !title || files.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("type", selectedType);
    formData.append("title", title);
    files.forEach(file => {
      formData.append("files", file);
    });

    await onUpload(formData);

    // Reset form
    setSelectedType("");
    setTitle("");
    setFiles([]);
    setPreviews([]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Document Type</Label>
          <Select
            value={selectedType}
            onValueChange={setSelectedType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {DOCUMENT_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            placeholder="Document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Files</Label>
        <div className="border-2 border-dashed rounded-lg p-4">
          <Input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept="image/*,.pdf"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              Supported formats: Images, PDF
            </span>
          </label>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative rounded-lg overflow-hidden border">
                {preview.file.type.startsWith("image/") ? (
                  <Image
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <span className="text-sm text-muted-foreground">
                      {preview.file.name}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={!selectedType || !title || files.length === 0 || isUploading}
        className="w-full mt-4"
      >
        {isUploading ? "Uploading..." : "Upload Documents"}
      </Button>
    </div>
  );
} 