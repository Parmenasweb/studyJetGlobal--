"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  FileText,
  Upload,
  Download,
  Trash,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
];

const documentFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(
    ["mou", "fee_structure", "accommodation", "insurance", "other"],
    {
      required_error: "Please select a document type",
    }
  ),
  file: z
    .custom((file) => file instanceof File, "Please upload a file")
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "File size must be less than 10MB"
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Invalid file type. Please upload a PDF, Word, Excel, or image file."
    ),
  expiryDate: z.date().optional(),
});

export function Documents({ partner }) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      title: "",
      type: undefined,
      file: undefined,
      expiryDate: undefined,
    },
  });

  const uploadDocument = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("file", data.file);
    if (data.expiryDate) {
      formData.append("expiryDate", data.expiryDate.toISOString());
    }

    const res = await fetch(`/api/partners/${partner._id}/documents`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to upload document");
    }

    return res.json();
  };

  const deleteDocument = async (documentId) => {
    const res = await fetch(
      `/api/partners/${partner._id}/documents?documentId=${documentId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to delete document");
    }

    return res.json();
  };

  const uploadMutation = useMutation({
    mutationFn: uploadDocument,
    onSuccess: () => {
      toast.success("Document uploaded successfully");
      setIsOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      toast.success("Document deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values) => {
    uploadMutation.mutate(values);
  };

  const handleDelete = (documentId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      deleteMutation.mutate(documentId);
    }
  };

  const getDocumentStatus = (document) => {
    if (!document.expiryDate) return null;

    const now = new Date();
    const expiryDate = new Date(document.expiryDate);
    const daysUntilExpiry = Math.ceil(
      (expiryDate - now) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry < 0) {
      return {
        label: "Expired",
        variant: "destructive",
        icon: AlertTriangle,
      };
    }

    if (daysUntilExpiry <= 30) {
      return {
        label: "Expiring Soon",
        variant: "warning",
        icon: AlertTriangle,
      };
    }

    return {
      label: "Valid",
      variant: "success",
      icon: CheckCircle,
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Documents</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload a new document for this partner. Supported file types:
                PDF, Word, Excel, and images.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mou">MOU</SelectItem>
                          <SelectItem value="fee_structure">
                            Fee Structure
                          </SelectItem>
                          <SelectItem value="accommodation">
                            Accommodation
                          </SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange }, ...field }) => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept={ACCEPTED_FILE_TYPES.join(",")}
                          onChange={(e) => onChange(e.target.files[0])}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? new Date(e.target.value)
                                : undefined
                            )
                          }
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploadMutation.isPending}>
                    {uploadMutation.isPending ? "Uploading..." : "Upload"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {partner.documents?.map((document) => {
          const status = getDocumentStatus(document);
          const StatusIcon = status?.icon;

          return (
            <Card key={document._id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>{document.title}</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(document._id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {document.type
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Badge>
                  {status && (
                    <Badge variant={status.variant}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Uploaded on{" "}
                    {format(new Date(document.uploadedAt), "MMM d, yyyy")}
                  </span>
                </div>
                {document.expiryDate && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Expires on{" "}
                      {format(new Date(document.expiryDate), "MMM d, yyyy")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {(!partner.documents || partner.documents.length === 0) && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No documents uploaded yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
