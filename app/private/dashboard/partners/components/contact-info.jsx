"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Plus,
  Pencil,
  Trash,
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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  isMainContact: z.boolean().default(false),
});

export function ContactInfo({ partner }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      phone: "",
      isMainContact: false,
    },
  });

  const updatePartner = async (data) => {
    const res = await fetch(`/api/partners?id=${partner._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to update partner");
    }

    return res.json();
  };

  const mutation = useMutation({
    mutationFn: updatePartner,
    onSuccess: () => {
      toast.success("Contact information updated successfully");
      setIsOpen(false);
      form.reset();
      setEditingContact(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values) => {
    const updatedContacts = editingContact
      ? partner.contactPersons.map((contact, index) =>
          index === editingContact ? values : contact
        )
      : [...partner.contactPersons, values];

    // Ensure only one main contact
    if (values.isMainContact) {
      updatedContacts.forEach((contact, index) => {
        if (
          index !== (editingContact ?? updatedContacts.length - 1) &&
          contact.isMainContact
        ) {
          contact.isMainContact = false;
        }
      });
    }

    mutation.mutate({
      ...partner,
      contactPersons: updatedContacts,
    });
  };

  const handleEdit = (contact, index) => {
    form.reset(contact);
    setEditingContact(index);
    setIsOpen(true);
  };

  const handleDelete = (index) => {
    const updatedContacts = partner.contactPersons.filter(
      (_, i) => i !== index
    );
    mutation.mutate({
      ...partner,
      contactPersons: updatedContacts,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                form.reset({
                  name: "",
                  position: "",
                  email: "",
                  phone: "",
                  isMainContact: false,
                });
                setEditingContact(null);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingContact !== null ? "Edit Contact" : "Add New Contact"}
              </DialogTitle>
              <DialogDescription>
                Add or edit contact information for this partner.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isMainContact"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Set as main contact</FormLabel>
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
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving..." : "Save"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {partner.contactPersons.map((contact, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{contact.name}</span>
                {contact.isMainContact && (
                  <Badge variant="secondary">Main Contact</Badge>
                )}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(contact, index)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {contact.position && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>{contact.position}</span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <Link
                  href={`mailto:${contact.email}`}
                  className="text-primary hover:underline"
                >
                  {contact.email}
                </Link>
              </div>
              {contact.phone && (
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <Link
                    href={`tel:${contact.phone}`}
                    className="text-primary hover:underline"
                  >
                    {contact.phone}
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {partner.location && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {partner.location.address && (
              <p className="text-sm">{partner.location.address}</p>
            )}
            <p className="text-sm">
              {[
                partner.location.city,
                partner.location.state,
                partner.location.postalCode,
                partner.location.country,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
