"use client";

import { useState, useRef } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { imagekitClient } from "@/lib/imagekit-client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";

export function DocumentUpload({ onSuccess, onError, existingUrl, onRemove }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
  };

  const handleUploadProgress = (progress) => {
    setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  const handleUploadSuccess = (response) => {
    setIsUploading(false);
    setUploadProgress(100);
    onSuccess({
      url: response.url,
      fileId: response.fileId,
      filePath: response.filePath,
    });
    toast.success("Document uploaded successfully");
  };

  const handleUploadError = (error) => {
    setIsUploading(false);
    setUploadProgress(0);
    onError(error);
    toast.error("Failed to upload document");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (existingUrl) {
    return (
      <div className="flex items-center gap-2">
        <a
          href={existingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-sm text-blue-500 hover:underline truncate"
        >
          View Document
        </a>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <ImageKitProvider
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      authenticator={imagekitClient.authenticator}
    >
      <div className="space-y-4">
        <IKUpload
          className="hidden"
          id="document-upload"
          fileName="document_upload"
          folder="/documents"
          tags={["document"]}
          useUniqueFileName={true}
          responseFields={["tags"]}
          validateFile={(file) => {
            // Validate file type and size
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (!validTypes.includes(file.type)) {
              toast.error("Invalid file type. Please upload PDF, DOC, DOCX, JPG, or PNG files.");
              return false;
            }
            
            if (file.size > maxSize) {
              toast.error("File size exceeds 5MB limit.");
              return false;
            }
            
            return true;
          }}
          onError={handleUploadError}
          onSuccess={handleUploadSuccess}
          onUploadStart={handleUploadStart}
          onUploadProgress={handleUploadProgress}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="document-upload">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Choose Document"
              )}
            </Button>
          </label>

          {isUploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                {Math.round(uploadProgress)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </ImageKitProvider>
  );
} 