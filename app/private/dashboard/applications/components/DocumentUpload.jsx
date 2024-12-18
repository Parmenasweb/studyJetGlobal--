"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function DocumentUpload({ applicationId, documents = [], onUpload }) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload(event) {
    try {
      setIsUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/applications/${applicationId}/documents`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload document");
      }

      const data = await res.json();
      onUpload?.(data);
      toast.success("Document uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>
          Upload and manage application documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              disabled={isUploading}
              onClick={() => document.getElementById("file-upload").click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Document"}
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleUpload}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </div>

          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{doc.name}</span>
                  <Badge variant={
                    doc.status === "approved" ? "success" :
                    doc.status === "rejected" ? "destructive" :
                    "secondary"
                  }>
                    {doc.status}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(doc.url, "_blank")}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 