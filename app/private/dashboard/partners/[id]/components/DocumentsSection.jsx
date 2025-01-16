"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { FileIcon, Eye, Download, CheckCircle, XCircle, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function DocumentsSection({ partnerId, documents }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function updateDocumentStatus(documentId, newStatus) {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/partners/${partnerId}/documents/${documentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update document status");
      }

      toast.success("Document status updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  }

  if (!documents?.length) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <FileIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">No Documents Yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              No documents have been uploaded for this partner. Documents like MOUs, agreements, and licenses can be uploaded using the partner form.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {documents.map((doc) => (
        <Card key={doc._id || doc.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <FileIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium leading-none">{doc.title}</h4>
                    <p className="text-sm text-muted-foreground">{doc.type}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Open menu</span>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => window.open(doc.fileUrl, "_blank")}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Document
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = doc.fileUrl;
                          link.download = doc.title;
                          link.click();
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateDocumentStatus(doc._id || doc.id, "approved")}
                        disabled={isUpdating || doc.status === "approved"}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateDocumentStatus(doc._id || doc.id, "rejected")}
                        disabled={isUpdating || doc.status === "rejected"}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      doc.status === "approved"
                        ? "success"
                        : doc.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {doc.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Uploaded on {format(new Date(doc.uploadDate), "PPP")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 