"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentUploadSection({ form }) {
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState({});

  const onDrop = React.useCallback((acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeFile = (fileToRemove) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const uploadFiles = async () => {
    setUploading(true);
    const applicationId = form.getValues("_id"); // Get the application ID after submission

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: Math.min((prev[file.name] || 0) + 10, 90),
          }));
        }, 100);

        const response = await fetch(
          `/api/applications/${applicationId}/documents`,
          {
            method: "POST",
            body: formData,
          }
        );

        clearInterval(interval);

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 100,
        }));

        // Wait a bit before removing the progress bar
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Clear files after successful upload
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supporting Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/25 hover:border-primary"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          {isDragActive ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Drop the files here...
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Drag &apos;n&apos; drop files here, or click to select files
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Supports: PDF, JPG, PNG (max 5MB)
          </p>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between p-2 border rounded-lg"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-sm font-medium truncate">
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round(file.size / 1024)}KB)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {uploadProgress[file.name] && (
                    <Progress
                      value={uploadProgress[file.name]}
                      className="w-24"
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file)}
                    disabled={uploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <Button onClick={uploadFiles} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Files"}
              </Button>
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p>
            Please upload any relevant documents to support your application:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Passport copy</li>
            <li>Educational certificates</li>
            <li>English test results</li>
            <li>Resume/CV (for work applications)</li>
            <li>Any other supporting documents</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
