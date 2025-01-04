"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileEdit, ArrowLeft, Clock, User, Mail, Phone, Globe, MapPin, School, BookOpen, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

async function getApplication(id) {
  const res = await fetch(`/api/applications/${id}`);
  if (!res.ok) throw new Error("Failed to fetch application");
  return res.json();
}

function ApplicationSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "N/A";
  return format(new Date(date), "PPP");
}

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: application, isLoading, error } = useQuery({
    queryKey: ["application", params.id],
    queryFn: () => getApplication(params.id),
  });

  if (error) {
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2">
        <p className="text-sm text-muted-foreground">
          {error.message || "Something went wrong"}
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  if (isLoading) return <ApplicationSkeleton />;

  const statusVariants = {
    draft: "secondary",
    submitted: "warning",
    under_review: "secondary",
    approved: "success",
    rejected: "destructive",
    pending_documents: "warning",
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-semibold tracking-tight">Application Details</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            View and manage application information
          </p>
        </div>
        <Button
          onClick={() => router.push(`/private/dashboard/applications/${params.id}/edit`)}
        >
          <FileEdit className="mr-2 h-4 w-4" />
          Edit Application
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {application.personalInfo?.fullName || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{application.personalInfo?.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{application.personalInfo?.phone || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{application.personalInfo?.nationality || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>
                {application.personalInfo?.currentCity}, {application.personalInfo?.currentCountry}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Application Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant={statusVariants[application.status]}>
                {application.status?.split("_")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Type</span>
              <Badge variant="outline">
                {application.applicationType?.charAt(0).toUpperCase() + 
                  application.applicationType?.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Priority</span>
              <Badge variant="outline">{application.priority}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Submitted</span>
              <span className="text-sm">
                {application.submittedAt ? formatDate(application.submittedAt) : "Not submitted"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Application Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          {application.applicationType === "study" ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Study Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Destination Country</span>
                    <p className="text-sm">{application.studyDetails?.destinationCountry || "N/A"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Program Level</span>
                    <p className="text-sm">{application.studyDetails?.programLevel || "N/A"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Field of Study</span>
                    <p className="text-sm">{application.studyDetails?.fieldOfStudy || "N/A"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Intake Date</span>
                    <p className="text-sm">{application.studyDetails?.intakeDate || "N/A"}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Academic Background</h4>
                  {application.studyDetails?.academicBackground?.map((academic, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="grid gap-2 md:grid-cols-2">
                        <div>
                          <span className="text-sm font-medium">Institution</span>
                          <p className="text-sm">{academic.institution}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Qualification</span>
                          <p className="text-sm">{academic.qualification}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Field of Study</span>
                          <p className="text-sm">{academic.fieldOfStudy}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Grade</span>
                          <p className="text-sm">{academic.grade}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Work Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Destination Country</span>
                    <p className="text-sm">{application.workDetails?.destinationCountry || "N/A"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Job Category</span>
                    <p className="text-sm">{application.workDetails?.jobCategory || "N/A"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Preferred Position</span>
                    <p className="text-sm">{application.workDetails?.preferredPosition || "N/A"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Years of Experience</span>
                    <p className="text-sm">{application.workDetails?.yearsOfExperience || "N/A"}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Work Experience</h4>
                  {application.workDetails?.workExperience?.map((work, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="grid gap-2 md:grid-cols-2">
                        <div>
                          <span className="text-sm font-medium">Company</span>
                          <p className="text-sm">{work.company}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Position</span>
                          <p className="text-sm">{work.position}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Duration</span>
                          <p className="text-sm">{work.duration}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm font-medium">Responsibilities</span>
                        <p className="text-sm">{work.responsibilities}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {application.documents?.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded on {formatDate(doc.uploadedAt)}
                        </p>
                      </div>
                      <Badge variant={doc.status === "approved" ? "success" : 
                        doc.status === "rejected" ? "destructive" : "secondary"}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {application.timeline?.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {index !== application.timeline.length - 1 && (
                          <div className="h-full w-px bg-border" />
                        )}
                      </div>
                      <div className="space-y-1 pb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{event.status}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(event.date)}
                          </span>
                        </div>
                        {event.note && (
                          <p className="text-sm text-muted-foreground">{event.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 