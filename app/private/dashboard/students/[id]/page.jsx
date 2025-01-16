"use client";

import { getClient } from "@/actions/client";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ImageView from "@/components/ImageView";
import Link from "next/link";
import { 
  Edit, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  School, 
  GraduationCap, 
  FileType,
  Globe,
  User,
  CreditCard,
  Plane,
  Clock,
  Flag,
  AlertCircle,
  UserCircle,
  Heart,
  Home,
  Handshake
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ClientPage({ params }) {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [partners, setPartners] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadClient() {
      try {
        const data = await getClient(params.id);
        if (!data) {
          notFound();
        }
        setClient(data);
      } catch (error) {
        console.error("Error loading client:", error);
        toast.error("Failed to load client data");
      } finally {
        setIsLoading(false);
      }
    }

    loadClient();
  }, [params.id]);

  // Load partners when modal opens
  const loadPartners = async () => {
    try {
      const response = await fetch("/api/partners?status=active");
      const data = await response.json();
      setPartners(data.partners);
    } catch (error) {
      console.error("Error loading partners:", error);
      toast.error("Failed to load partners");
    }
  };

  // Handle partner referral
  const handleRefer = async () => {
    if (!selectedPartnerId) {
      toast.error("Please select a partner");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/partners/${selectedPartnerId}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: params.id,
          program: client.academicInfo.program.name,
          status: "pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to refer student");
      }

      toast.success("Student referred successfully");
      setIsReferModalOpen(false);
    } catch (error) {
      console.error("Error referring student:", error);
      toast.error(error.message || "Failed to refer student");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500";
      case "lead":
        return "bg-blue-500/10 text-blue-500";
      case "inactive":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getVisaStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500";
      case "expired":
        return "bg-red-500/10 text-red-500";
      case "renewal_needed":
        return "bg-yellow-500/10 text-yellow-500";
      case "processing":
        return "bg-blue-500/10 text-blue-500";
      case "rejected":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!client) {
    return null;
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/private/dashboard/students">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{client.personalInfo.fullName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={cn("capitalize", getStatusColor(client.status))}>
                {client.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {client.clientId || "Pending ID"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-medium">Commission</div>
            <div className="text-sm text-muted-foreground">
              ${client.commission?.toFixed(2) || "0.00"}
            </div>
          </div>
          <Dialog open={isReferModalOpen} onOpenChange={setIsReferModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={loadPartners}>
                <Handshake className="mr-2 h-4 w-4" />
                Refer to Partner
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Refer Student to Partner</DialogTitle>
                <DialogDescription>
                  Select a partner to refer this student to.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Select
                  value={selectedPartnerId}
                  onValueChange={setSelectedPartnerId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a partner" />
                  </SelectTrigger>
                  <SelectContent>
                    {partners.map((partner) => (
                      <SelectItem key={partner._id} value={partner._id}>
                        {partner.name} ({partner.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  className="w-full"
                  onClick={handleRefer}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Referring..." : "Refer Student"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button asChild className="shrink-0">
            <Link href={`/private/dashboard/students/${client._id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Client
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">{client.personalInfo.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-sm text-muted-foreground">{client.personalInfo.phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Date of Birth</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(client.personalInfo.dateOfBirth), "PPP")}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Nationality</div>
                  <div className="text-sm text-muted-foreground">{client.personalInfo.nationality}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileType className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Passport</div>
                  <div className="text-sm text-muted-foreground">{client.personalInfo.passportNumber}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Current Residence</div>
                  <div className="text-sm text-muted-foreground">
                    {client.personalInfo.currentResidence.address && (
                      <div>{client.personalInfo.currentResidence.address}</div>
                    )}
                    {client.personalInfo.currentResidence.city && (
                      <div>{client.personalInfo.currentResidence.city}</div>
                    )}
                    <div>{client.personalInfo.currentResidence.country}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span>Emergency Contact</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <UserCircle className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Name</div>
                  <div className="text-sm text-muted-foreground">
                    {client.personalInfo.emergencyContact.name}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Relationship</div>
                  <div className="text-sm text-muted-foreground">
                    {client.personalInfo.emergencyContact.relationship}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-sm text-muted-foreground">
                    {client.personalInfo.emergencyContact.phone}
                  </div>
                </div>
              </div>
              {client.personalInfo.emergencyContact.email && (
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      {client.personalInfo.emergencyContact.email}
                    </div>
                  </div>
                </div>
              )}
              {client.personalInfo.emergencyContact.address && (
                <div className="flex items-start gap-3">
                  <Home className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">
                      {client.personalInfo.emergencyContact.address}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Academic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5" />
              <span>Academic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <School className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">University</div>
                  <div className="text-sm text-muted-foreground">
                    {client.academicInfo.university.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {client.academicInfo.university.country}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Program</div>
                  <div className="text-sm text-muted-foreground">
                    {client.academicInfo.program.name}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {client.academicInfo.program.level} - {client.academicInfo.program.major}
                  </div>
                </div>
              </div>
              {client.academicInfo.enrollmentDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Enrollment Date</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(client.academicInfo.enrollmentDate), "PPP")}
                    </div>
                  </div>
                </div>
              )}
              {client.academicInfo.expectedGraduationDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Expected Graduation</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(client.academicInfo.expectedGraduationDate), "PPP")}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Visa Information Card */}
        {client.visaInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                <span>Visa Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <FileType className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Visa Type</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {client.visaInfo.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Visa Number</div>
                    <div className="text-sm text-muted-foreground">
                      {client.visaInfo.number}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Issue Date</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(client.visaInfo.issueDate), "PPP")}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Expiry Date</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(client.visaInfo.expiryDate), "PPP")}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Flag className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Issuing Country</div>
                    <div className="text-sm text-muted-foreground">
                      {client.visaInfo.issuingCountry}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Status</div>
                    <Badge className={cn("capitalize", getVisaStatusColor(client.visaInfo.status))}>
                      {client.visaInfo.status?.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
                {client.visaInfo.permitNumber && (
                  <div className="flex items-start gap-3">
                    <FileType className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Permit Number</div>
                      <div className="text-sm text-muted-foreground">
                        {client.visaInfo.permitNumber}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents Card */}
        {client.documents && client.documents.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileType className="h-5 w-5" />
                <span>Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {client.documents.map((doc, index) => (
                  <div key={index} className="space-y-2">
                    <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
                      <ImageView
                        src={doc.fileUrl}
                        alt={doc.title}
                        className="h-full w-full object-cover"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-sm text-muted-foreground capitalize">{doc.type}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(doc.uploadDate), "PPP")}
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 