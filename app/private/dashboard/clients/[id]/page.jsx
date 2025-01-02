"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileEdit, Upload, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DocumentUpload } from "../components/document-upload";
import { DocumentList } from "../components/document-list";

async function getClient(id) {
  const res = await fetch(`/api/clients/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch client");
  }
  return res.json();
}

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("overview");
  const queryClient = useQueryClient();

  const {
    data: client,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client", params.id],
    queryFn: () => getClient(params.id),
  });

  if (isLoading) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2">
        <p className="text-sm text-muted-foreground">
          {error.message || "Something went wrong"}
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {client.personalInfo.fullName}
          </h2>
          <p className="text-muted-foreground">
            Student ID: {client.academicInfo.studentId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/private/dashboard/clients/${params.id}/edit`)
            }
          >
            <FileEdit className="mr-2 h-4 w-4" />
            Edit Client
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant={
                client.status === "active"
                  ? "success"
                  : client.status === "graduated"
                  ? "secondary"
                  : "warning"
              }
              className="text-lg"
            >
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">University</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {client.academicInfo.university.name}
            </div>
            <p className="text-xs text-muted-foreground">
              {client.academicInfo.university.country}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {client.academicInfo.program.name}
            </div>
            <p className="text-xs text-muted-foreground">
              {client.academicInfo.program.level}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {format(new Date(client.academicInfo.enrollmentDate), "MMM yyyy")}
            </div>
            <p className="text-xs text-muted-foreground">
              Expected Graduation:{" "}
              {format(
                new Date(client.academicInfo.expectedGraduationDate),
                "MMM yyyy"
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="academic">Academic Progress</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Full Name</p>
                  <p className="text-sm text-muted-foreground">
                    {client.personalInfo.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {client.personalInfo.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {client.personalInfo.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(client.personalInfo.dateOfBirth), "PPP")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Nationality</p>
                  <p className="text-sm text-muted-foreground">
                    {client.personalInfo.nationality}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Passport Number</p>
                  <p className="text-sm text-muted-foreground">
                    {client.personalInfo.passportNumber}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">Emergency Contact</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">
                      {client.personalInfo.emergencyContact.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Relationship</p>
                    <p className="text-sm text-muted-foreground">
                      {client.personalInfo.emergencyContact.relationship}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      {client.personalInfo.emergencyContact.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {client.personalInfo.emergencyContact.email}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visa Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Visa Type</p>
                  <p className="text-sm text-muted-foreground">
                    {client.visaInfo.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Visa Number</p>
                  <p className="text-sm text-muted-foreground">
                    {client.visaInfo.number}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Issue Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(client.visaInfo.issueDate), "PPP")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Expiry Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(client.visaInfo.expiryDate), "PPP")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge
                    variant={
                      client.visaInfo.status === "active"
                        ? "success"
                        : client.visaInfo.status === "expired"
                        ? "destructive"
                        : "warning"
                    }
                  >
                    {client.visaInfo.status
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Documents</CardTitle>
                <DocumentUpload clientId={params.id} />
              </div>
            </CardHeader>
            <CardContent>
              <DocumentList clientId={params.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {client.academicInfo.academicProgress.map((semester, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">{semester.semester}</h4>
                    <Badge
                      variant={
                        semester.status === "completed"
                          ? "success"
                          : semester.status === "ongoing"
                          ? "secondary"
                          : "warning"
                      }
                    >
                      {semester.status.charAt(0).toUpperCase() +
                        semester.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {semester.courses.map((course, courseIndex) => (
                      <div
                        key={courseIndex}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{course.name}</span>
                        <span className="text-muted-foreground">
                          {course.credits} credits | Grade: {course.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                  {semester.gpa && (
                    <div className="mt-2 text-sm text-right">
                      GPA: <span className="font-medium">{semester.gpa}</span>
                    </div>
                  )}
                  {semester.notes && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {semester.notes}
                    </p>
                  )}
                  {index < client.academicInfo.academicProgress.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              {client.payments.map((payment, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium">
                        {payment.type.charAt(0).toUpperCase() +
                          payment.type.slice(1)}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Due: {format(new Date(payment.dueDate), "PPP")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {payment.amount} {payment.currency}
                      </p>
                      <Badge
                        variant={
                          payment.status === "paid"
                            ? "success"
                            : payment.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  {payment.paidDate && (
                    <p className="text-sm text-muted-foreground">
                      Paid on: {format(new Date(payment.paidDate), "PPP")}
                    </p>
                  )}
                  {payment.notes && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {payment.notes}
                    </p>
                  )}
                  {index < client.payments.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
