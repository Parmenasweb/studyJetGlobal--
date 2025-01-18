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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";

const documentSchema = z.object({
  type: z.enum(["mou", "agreement", "license", "certificate", "other"]),
  title: z.string().min(2, "Title must be at least 2 characters"),
  expiryDate: z.string().optional(),
  notes: z.string().optional(),
});

async function uploadDocument(partnerId, data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });

  const res = await fetch(`/api/partners/${partnerId}/documents`, {
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
    `/api/partners/${partnerId}/documents?documentId=${documentId}`,
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

export function DocumentList({ partner }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      type: "mou",
      title: "",
      expiryDate: "",
      notes: "",
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (data) => uploadDocument(partner._id, data),
    onSuccess: () => {
      toast.success("Document uploaded successfully");
      setIsOpen(false);
      form.reset();
      setSelectedFile(null);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
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

    uploadMutation.mutate({
      ...data,
      file: selectedFile,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("title", file.name.split(".")[0]);
    }
  };

  const handleDelete = (documentId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      deleteMutation.mutate(documentId);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "valid":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "expiring":
        return <Clock className="h-4 w-4 text-warning" />;
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
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
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload a new document for this partner. Supported file types:
                  PDF, Word, Excel, PowerPoint, and images.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Type</FormLabel>
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
                            <SelectItem value="agreement">Agreement</SelectItem>
                            <SelectItem value="license">License</SelectItem>
                            <SelectItem value="certificate">
                              Certificate
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter document title"
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
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter any notes about this document"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel>File</FormLabel>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp"
                    />
                  </div>

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
          <div className="grid gap-4 md:grid-cols-2">
            {partner.documents.map((document) => (
              <div
                key={document._id}
                className="rounded-lg border p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{document.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(document.status)}
                    <Badge
                      variant={
                        document.status === "valid"
                          ? "success"
                          : document.status === "expiring"
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {document.status.charAt(0).toUpperCase() +
                        document.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Type:{" "}
                  {document.type.charAt(0).toUpperCase() +
                    document.type.slice(1)}
                </div>

                {document.expiryDate && (
                  <div className="text-sm text-muted-foreground">
                    Expires: {format(new Date(document.expiryDate), "PPP")}
                  </div>
                )}

                {document.notes && (
                  <div className="text-sm text-muted-foreground">
                    Notes: {document.notes}
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <Link
                      href={document.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-destructive"
                    onClick={() => handleDelete(document._id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}

            {partner.documents.length === 0 && (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                No documents uploaded yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
