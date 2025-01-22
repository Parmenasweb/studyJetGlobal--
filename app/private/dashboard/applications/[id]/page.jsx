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
import { 
  FileEdit, 
  ArrowLeft, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  School, 
  BookOpen, 
  Calendar, 
  ChevronLeft, 
  GraduationCap, 
  Briefcase, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  FileText,
  MessageSquare,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Passport,
  Users,
  Languages,
  Building,
  GraduationCap2,
  Wallet,
  Plane
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// Color variants for different types of badges
const typeVariants = {
  study: {
    variant: "default",
    icon: <GraduationCap className="mr-2 h-4 w-4 text-blue-500" />,
    label: "Study Application"
  },
  work: {
    variant: "default",
    icon: <Briefcase className="mr-2 h-4 w-4 text-purple-500" />,
    label: "Work Application"
  },
};

const statusVariants = {
  draft: {
    variant: "secondary",
    label: "Draft",
    icon: <FileText className="mr-2 h-4 w-4 text-gray-500" />
  },
  submitted: {
    variant: "info",
    label: "Submitted",
    icon: <Clock className="mr-2 h-4 w-4 text-blue-500" />
  },
  under_review: {
    variant: "warning",
    label: "Under Review",
    icon: <Clock className="mr-2 h-4 w-4 text-yellow-500" />
  },
  approved: {
    variant: "success",
    label: "Approved",
    icon: <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
  },
  rejected: {
    variant: "destructive",
    label: "Rejected",
    icon: <XCircle className="mr-2 h-4 w-4 text-red-500" />
  },
  pending_documents: {
    variant: "warning",
    label: "Pending Documents",
    icon: <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
  },
};

const priorityVariants = {
  low: {
    variant: "secondary",
    label: "Low Priority",
    icon: <ArrowDown className="mr-2 h-4 w-4 text-gray-500" />
  },
  medium: {
    variant: "warning",
    label: "Medium Priority",
    icon: <ArrowRight className="mr-2 h-4 w-4 text-yellow-500" />
  },
  high: {
    variant: "destructive",
    label: "High Priority",
    icon: <ArrowUp className="mr-2 h-4 w-4 text-red-500" />
  },
};

async function getApplication(id) {
  try {
  const res = await fetch(`/api/applications/${id}`);
  if (!res.ok) throw new Error("Failed to fetch application");
    return await res.json();
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
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
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch (error) {
    console.error("Date formatting error:", error);
    return "N/A";
  }
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

  const typeVariant = typeVariants[application.applicationType] || { variant: "secondary", icon: null, label: "Unknown" };
  const statusVariant = statusVariants[application.status] || { variant: "secondary", icon: null, label: "Unknown" };
  const priorityVariant = priorityVariants[application.priority] || { variant: "secondary", label: "None" };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
            size="icon"
              onClick={() => router.back()}
            >
            <ChevronLeft className="h-4 w-4" />
            </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Application Details</h2>
          <p className="text-sm text-muted-foreground">
            View and manage application information
          </p>
        </div>
      </div>
        <div className="flex items-center space-x-2">
          <Badge variant={typeVariant.variant} className="flex items-center gap-1">
            {typeVariant.icon}
            <span>{typeVariant.label}</span>
          </Badge>
          <Badge variant={statusVariant.variant} className="flex items-center gap-1">
            {statusVariant.icon}
            <span>{statusVariant.label}</span>
              </Badge>
          <Badge variant={priorityVariant.variant} className="flex items-center gap-1">
            {priorityVariant.icon}
            <span>{priorityVariant.label}</span>
              </Badge>
            </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
    
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <p className="text-md font-medium">Full Name</p>
                    <p className="text-sm text-muted-foreground">{application.personalInfo.fullName}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-md font-medium">Contact Details</p>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-muted-foreground">{application.personalInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">{application.personalInfo.phone}</span>
                      </div>
                  </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-md font-medium">Personal Details</p>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(application.personalInfo.dateOfBirth)}
                        </span>
                  </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm text-muted-foreground  ">{application.personalInfo.nationality}</span>
                </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-muted-foreground">
                          {application.personalInfo.currentCity}, {application.personalInfo.currentCountry}
                        </span>
                        </div>
                        </div>
                        </div>
                  {application.personalInfo.languages?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-md font-medium">Languages</p>
                      <div className="flex flex-wrap gap-2">
                        {application.personalInfo.languages.map((lang, index) => (
                          <Badge key={index} variant="secondary">
                            {lang.language} - {lang.proficiencyLevel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {application.applicationType === "study" ? (
              <>
            <Card>
              <CardHeader>
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-blue-500" />
                      Study Details
                    </CardTitle>
              </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    <div className="grid gap-4">
                  <div className="space-y-2">
                        <p className="text-md font-medium">Destination</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-muted-foreground">{application.studyDetails.destinationCountry}</span>
                  </div>
                  </div>
                  <div className="space-y-2">
                        <p className="text-md font-medium">Program Details</p>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <School className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-muted-foreground">{application.studyDetails.programLevel}</span>
                  </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-muted-foreground">{application.studyDetails.fieldOfStudy}</span>
                </div>
                        </div>
                      </div>
                      {application.studyDetails.preferredUniversities?.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-md font-medium">Preferred Universities</p>
                          <div className="flex flex-wrap gap-2">
                            {application.studyDetails.preferredUniversities.map((uni, index) => (
                              <Badge key={index} variant="outline">
                                {uni}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <School className="h-5 w-5 text-blue-500" />
                      Education History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-6">
                        {application.studyDetails.academicBackground?.map((edu, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="grid gap-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{edu.institution}</h4>
                                <Badge variant="outline">{edu.yearCompleted}</Badge>
                              </div>
                              <div className="grid gap-1 text-sm">
                                <div className="flex items-center gap-2">
                                  <GraduationCap className="h-4 w-4 text-blue-500" />
                                  <span>{edu.qualification}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-green-500" />
                                  <span>{edu.fieldOfStudy}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-purple-500" />
                                  <span>Grade: {edu.grade}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-purple-500" />
                      Work Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <p className="text-md font-medium">Job Details</p>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-muted-foreground">{application.workDetails.jobCategory}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-purple-500" />
                            <span className="text-sm text-muted-foreground">{application.workDetails.preferredPosition}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-muted-foreground">{application.workDetails.yearsOfExperience} years of experience</span>
                          </div>
                        </div>
                      </div>
                      {application.workDetails.skills?.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {application.workDetails.skills.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-purple-500" />
                      Work Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-6">
                        {application.workDetails.workExperience?.map((exp, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="grid gap-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{exp.company}</h4>
                                <Badge variant="outline">{exp.duration}</Badge>
                              </div>
                              <div className="grid gap-1 text-sm">
                                <div className="flex items-center gap-2">
                                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                                  <span>{exp.position}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <p className="text-muted-foreground">{exp.responsibilities}</p>
                                </div>
                              </div>
                      </div>
                    </div>
                  ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-green-500" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Funding Source</span>
                    <Badge variant="outline">{application.financialInfo.fundingSource}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Annual Family Income</span>
                    <span className="text-sm">${application.financialInfo.annualFamilyIncome?.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          <Card>
            <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Plane className="h-5 w-5 text-blue-500" />
                  Travel History
                </CardTitle>
            </CardHeader>
              <CardContent className="p-4">
                {application.travelHistory?.length > 0 ? (
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-4">
                      {application.travelHistory.map((travel, index) => (
                        <div key={index} className="flex items-start space-x-2 border-b pb-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                          <div>
                            <p className="text-sm font-medium">{travel.country}</p>
                            <p className="text-xs text-muted-foreground">{travel.purpose}</p>
                        <p className="text-xs text-muted-foreground">
                              {travel.year} {travel.duration && `- ${travel.duration}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                  </ScrollArea>
              ) : (
                  <p className="text-sm text-muted-foreground">No travel history</p>
              )}
            </CardContent>
          </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Application Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {application.timeline?.map((event, index) => (
                    <div key={index} className="flex items-center space-x-4 border-l-2 border-muted pl-4 pb-4">
                      <div className="absolute -left-2 h-4 w-4 rounded-full bg-background border-2 border-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant={statusVariants[event.status]?.variant || "secondary"}>
                            {statusVariants[event.status]?.icon}
                            <span>{event.title}</span>
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(event.date)}
                          </span>
                        </div>
                        <p className="text-sm">{event.description}</p>
                        <p className="text-xs text-muted-foreground">Updated by: {event.updatedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

       

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Document management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 