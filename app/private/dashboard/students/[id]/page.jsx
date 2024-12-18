import { notFound } from "next/navigation";
import { getClient } from "@/actions/client";
import { format } from "date-fns";
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
import {
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  FileText,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default async function ClientDetailsPage({ params }) {
  const client = await getClient(params.id);

  if (!client) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{client.name}</h2>
          <p className="text-muted-foreground">Client Details</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" asChild>
            <Link href={`/private/dashboard/students/${client._id}/edit`}>
              Edit Client
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/private/dashboard/students">Back to Clients</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Client Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Client Overview</CardTitle>
            <CardDescription>Basic information about the client</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Client Type</p>
                <div className="flex items-center space-x-2">
                  {client.clientType === "study" ? (
                    <GraduationCap className="h-4 w-4" />
                  ) : (
                    <Briefcase className="h-4 w-4" />
                  )}
                  <span className="font-medium capitalize">
                    {client.clientType}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  variant={
                    client.status === "active"
                      ? "default"
                      : client.status === "pending"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {client.status}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">{client.email}</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">{client.phone}</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Destination</p>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{client.destination}</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Application Date</p>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">
                    {format(new Date(client.applicationDate), "PPP")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
            <CardDescription>Commission and payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <DollarSign className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Commission Amount</p>
                    <p className="text-2xl font-bold">${client.commissionAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Tabs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <Tabs defaultValue="details" className="w-full">
              <TabsList>
                <TabsTrigger value="details">
                  {client.clientType === "study" ? "Study Details" : "Work Details"}
                </TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                {client.clientType === "study" ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">University</p>
                      <p className="font-medium">{client.studyDetails?.university}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Course</p>
                      <p className="font-medium">{client.studyDetails?.course}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Program Level</p>
                      <p className="font-medium capitalize">
                        {client.studyDetails?.programLevel}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">
                        {client.studyDetails?.startDate
                          ? format(new Date(client.studyDetails.startDate), "PPP")
                          : "Not specified"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{client.workDetails?.company}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Job Title</p>
                      <p className="font-medium">{client.workDetails?.jobTitle}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Contract Duration</p>
                      <p className="font-medium">
                        {client.workDetails?.contractDuration}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Expected Salary</p>
                      <p className="font-medium">
                        ${client.workDetails?.expectedSalary}
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start space-x-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <p className="mt-1">{client.notes || "No notes available"}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Application Started</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(client.applicationDate), "PPP")}
                      </p>
                    </div>
                  </div>
                  {/* Add more timeline items as needed */}
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
} 