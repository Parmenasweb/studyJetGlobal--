"use client";
import React, { useRef, useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import ImageView from "@/components/ImageView";
import Link from "next/link";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const authenticator = async () => {
  try {
    const response = await fetch(`/api/auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function FileUpload({ onSuccess, onError, existingUrl, onRemove, folder }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const ikUploadRef = useRef(null);

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
    onError?.(error);
    toast.error("Failed to upload document");
  };

  const isImage = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.bmp', '.tiff'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  if (existingUrl) {
    return (
      <div className="space-y-4">
        {isImage(existingUrl) ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <ImageView
              path={existingUrl.split('/').pop()}
              alt="Uploaded document"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href={existingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-sm text-blue-500 hover:underline truncate"
            >
              View Document
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="space-y-4">
        <IKUpload
          className="hidden"
          ref={ikUploadRef}
          fileName="document_upload"
          folder={folder}
          tags={["document"]}
          useUniqueFileName={true}
          responseFields={["tags"]}
          validateFile={(file) => {
            // Validate file type and size
            const validTypes = [
              'application/pdf', 
              'application/msword', 
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
              'image/jpeg', 
              'image/png',
              'image/webp',
              'image/gif',
              'image/avif',
              'image/bmp',
              'image/tiff'
            ];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (!validTypes.includes(file.type)) {
              toast.error("Invalid file type. Please upload PDF, DOC, DOCX, or image files (JPG, PNG, WebP, etc.).");
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
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isUploading}
            onClick={() => ikUploadRef.current?.click()}
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