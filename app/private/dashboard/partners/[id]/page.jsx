"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Building2,
  Users,
  FileText,
  Home,
  DollarSign,
  ChartBar,
  ArrowLeft,
} from "lucide-react";
import { ContactInfo } from "./components/contact-info";
import { Documents } from "./components/documents";
import { Programs } from "./components/programs";
import { Accommodation } from "./components/accommodation";
import { Commission } from "./components/commission";
import { PerformanceMetrics } from "./components/performance-metrics";

async function getPartner(id) {
  const res = await fetch(`/api/partners?id=${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch partner");
  }

  return res.json();
}

export default function PartnerPage({ params }) {
  const router = useRouter();
  const [partner, setPartner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useState(() => {
    getPartner(params.id)
      .then((data) => {
        setPartner(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
        toast.error(err.message);
      });
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-muted-foreground">Partner not found</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{partner.name}</h1>
          <Badge variant="outline">{partner.type}</Badge>
          <Badge
            variant={partner.status === "active" ? "success" : "secondary"}
          >
            {partner.status}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="space-x-2">
            <ChartBar className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="space-x-2">
            <Users className="h-4 w-4" />
            <span>Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="space-x-2">
            <FileText className="h-4 w-4" />
            <span>Documents</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Programs</span>
          </TabsTrigger>
          <TabsTrigger value="accommodation" className="space-x-2">
            <Home className="h-4 w-4" />
            <span>Accommodation</span>
          </TabsTrigger>
          <TabsTrigger value="commission" className="space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Commission</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span> {partner.name}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {partner.type}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>{" "}
                    {partner.status}
                  </div>
                  {partner.website && (
                    <div>
                      <span className="font-medium">Website:</span>{" "}
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {partner.website}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <PerformanceMetrics partner={partner} />
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <ContactInfo partner={partner} />
        </TabsContent>

        <TabsContent value="documents">
          <Documents partner={partner} />
        </TabsContent>

        <TabsContent value="programs">
          <Programs partner={partner} />
        </TabsContent>

        <TabsContent value="accommodation">
          <Accommodation partner={partner} />
        </TabsContent>

        <TabsContent value="commission">
          <Commission partner={partner} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
