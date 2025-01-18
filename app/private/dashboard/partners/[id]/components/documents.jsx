"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FileText,
  Upload,
  Download,
  Trash,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const documentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["MOU", "Fee Structure", "Agreement", "License", "Certificate", "Other"], {
    required_error: "Document type is required",
  }),
  expiryDate: z.string().optional(),
  file: z.any(),
});

async function uploadDocument(id, formData) {
  const res = await fetch(`/api/partners/${id}/documents`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to upload document");
  }

  return res.json();
}

async function deleteDocument(partnerId, documentId) {
  const res = await fetch(
    `/api/partners/${partnerId}/documents/${documentId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to delete document");
  }

  return res.json();
}

export function Documents({ partner }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      title: "",
      type: "",
      expiryDate: "",
      file: null,
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("type", data.type);
      if (data.expiryDate) {
        formData.append("expiryDate", data.expiryDate);
      }
      formData.append("file", selectedFile);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      try {
        const result = await uploadDocument(partner._id, formData);
        clearInterval(interval);
        setUploadProgress(100);
        return result;
      } catch (error) {
        clearInterval(interval);
        setUploadProgress(0);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Document uploaded successfully");
      setIsOpen(false);
      setSelectedFile(null);
      setUploadProgress(0);
      form.reset();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
      setUploadProgress(0);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (documentId) => deleteDocument(partner._id, documentId),
    onSuccess: () => {
      toast.success("Document deleted successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    uploadMutation.mutate(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const getDocumentStatus = (document) => {
    if (!document.expiryDate) return null;

    const expiryDate = new Date(document.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiryDate - today) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry < 0) {
      return {
        label: "Expired",
        color: "destructive",
        icon: AlertTriangle,
      };
    } else if (daysUntilExpiry <= 30) {
      return {
        label: `Expires in ${daysUntilExpiry} days`,
        color: "warning",
        icon: Clock,
      };
    } else {
      return {
        label: "Valid",
        color: "success",
        icon: CheckCircle,
      };
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Documents</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload a new document for this partner.
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
                          <Input placeholder="Document title" {...field} />
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
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select type</option>
                            <option value="MOU">MOU</option>
                            <option value="Fee Structure">Fee Structure</option>
                            <option value="Agreement">Agreement</option>
                            <option value="License">License</option>
                            <option value="Certificate">Certificate</option>
                            <option value="Other">Other</option>
                          </select>
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
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {uploadProgress > 0 && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} />
                      <p className="text-sm text-muted-foreground">
                        Uploading: {uploadProgress}%
                      </p>
                    </div>
                  )}

                  <DialogFooter>
                    <Button type="submit" disabled={uploadMutation.isPending}>
                      {uploadMutation.isPending ? "Uploading..." : "Upload"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {partner.documents && partner.documents.length > 0 ? (
            <div className="space-y-4">
              {partner.documents.map((document) => {
                const status = getDocumentStatus(document);
                const StatusIcon = status?.icon;

                return (
                  <Card key={document._id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div className="space-y-1">
                        <CardTitle className="text-base font-medium">
                          {document.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{document.type}</Badge>
                          {status && (
                            <Badge
                              variant={status.color}
                              className="flex items-center gap-1"
                            >
                              <StatusIcon className="h-3 w-3" />
                              {status.label}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link
                            href={document.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <Download className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Document</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this document? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(document._id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        Uploaded on{" "}
                        {format(new Date(document.uploadDate), "PPP")}
                        {document.expiryDate &&
                          ` · Expires on ${format(
                            new Date(document.expiryDate),
                            "PPP"
                          )}`}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No documents uploaded yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
