"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockApplications } from "../data/mock-applications";
import { formatDate } from "@/lib/utils";

export default function ApplicationDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const application = mockApplications.find((app) => app._id === params.id);

  if (!application) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Application Not Found</h1>
          <p className="text-muted-foreground">
            The application you are looking for does not exist.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Application Details
          </h2>
          <p className="text-muted-foreground">
            View and manage application information
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Overview</CardTitle>
            <CardDescription>
              Basic information about the application
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex flex-wrap gap-4">
              <Badge variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Submitted: {formatDate(application.submissionDate)}
              </Badge>
              <Badge
                variant={
                  application.status === "approved"
                    ? "success"
                    : application.status === "rejected"
                    ? "destructive"
                    : application.status === "processing"
                    ? "warning"
                    : "default"
                }
              >
                Status: {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </Badge>
              <Badge variant="outline">Progress: {application.progress}%</Badge>
              <Badge
                variant={
                  application.priority === "high"
                    ? "destructive"
                    : application.priority === "medium"
                    ? "warning"
                    : "default"
                }
              >
                Priority: {application.priority.charAt(0).toUpperCase() + application.priority.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="academic">Academic Background</TabsTrigger>
            <TabsTrigger value="study">Study Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes & Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Applicant's personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">Full Name:</span>
                    </div>
                    <p>{application.personalInfo.fullName}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="font-medium">Email:</span>
                    </div>
                    <p>{application.personalInfo.email}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">Phone:</span>
                    </div>
                    <p>{application.personalInfo.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Date of Birth:</span>
                    </div>
                    <p>{formatDate(application.personalInfo.dateOfBirth)}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="font-medium">Nationality:</span>
                    <p>{application.personalInfo.nationality}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Current Country:</span>
                    <p>{application.personalInfo.currentCountry}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Passport Number:</span>
                    <p>{application.personalInfo.passportNumber}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Passport Expiry:</span>
                    <p>{formatDate(application.personalInfo.passportExpiry)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Background</CardTitle>
                <CardDescription>
                  Previous education and qualifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {application.academicBackground.map((academic, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg mb-4"
                  >
                    <div className="space-y-2">
                      <span className="font-medium">Institution:</span>
                      <p>{academic.institution}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="font-medium">Qualification:</span>
                      <p>{academic.qualification}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="font-medium">Field of Study:</span>
                      <p>{academic.fieldOfStudy}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="font-medium">Grade:</span>
                      <p>{academic.grade}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="font-medium">Year Completed:</span>
                      <p>{academic.yearCompleted}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="study">
            <Card>
              <CardHeader>
                <CardTitle>Study Details</CardTitle>
                <CardDescription>
                  Information about the intended study program
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="font-medium">Destination Country:</span>
                    <p>{application.studyDetails.destinationCountry}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">University:</span>
                    <p>{application.studyDetails.university}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Course:</span>
                    <p>{application.studyDetails.course}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Program Level:</span>
                    <p>{application.studyDetails.programLevel}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Major Subject:</span>
                    <p>{application.studyDetails.majorSubject}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Start Date:</span>
                    <p>{formatDate(application.studyDetails.startDate)}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Duration:</span>
                    <p>{application.studyDetails.duration}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Tuition Fee:</span>
                    <p>${application.studyDetails.tuitionFee.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Scholarship Amount:</span>
                    <p>
                      ${application.studyDetails.scholarshipAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  Uploaded documents and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {application.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded on {formatDate(doc.uploadDate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            doc.status === "approved"
                              ? "success"
                              : doc.status === "rejected"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                  <CardDescription>
                    Application notes and comments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {application.notes.map((note, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{note.author}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(note.createdAt)}
                          </span>
                        </div>
                        <p>{note.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                  <CardDescription>
                    Application progress timeline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {application.timeline.map((event, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{event.title}</span>
                          <Badge
                            variant={
                              event.status === "completed"
                                ? "success"
                                : event.status === "failed"
                                ? "destructive"
                                : "default"
                            }
                          >
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </Badge>
                        </div>
                        <p>{event.description}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Updated by: {event.updatedBy}</span>
                          <span>{formatDate(event.date)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 