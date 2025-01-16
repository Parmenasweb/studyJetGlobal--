import { getPartner } from "@/actions/partner";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { Edit, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentsSection } from "./components/DocumentsSection";
import { ReferredStudents } from "./components/ReferredStudents";
import { PartnerMetrics } from "./components/PartnerMetrics";

export default async function PartnerPage({ params }) {
  const partner = await getPartner(params.id);

  if (!partner) {
    notFound();
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500";
      case "inactive":
        return "bg-gray-500/10 text-gray-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/private/dashboard/partners">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{partner.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={cn("capitalize", getStatusColor(partner.status))}>
                {partner.status}
              </Badge>
              <span className="text-sm text-muted-foreground capitalize">
                {partner.type}
              </span>
            </div>
          </div>
        </div>
        <Button asChild className="shrink-0">
          <Link href={`/private/dashboard/partners/${partner._id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Partner
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Partner Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Partner Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">{partner.email}</div>
              </div>
              <div>
                <div className="font-medium">Phone</div>
                <div className="text-sm text-muted-foreground">{partner.phone}</div>
              </div>
              <div>
                <div className="font-medium">Website</div>
                <div className="text-sm text-muted-foreground">
                  {partner.website || "Not provided"}
                </div>
              </div>
              <div>
                <div className="font-medium">Partnership Date</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(partner.partnershipDate), "PPP")}
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="font-medium">Address</div>
                <div className="text-sm text-muted-foreground">
                  {partner.address.street && (
                    <div>{partner.address.street}</div>
                  )}
                  <div>
                    {partner.address.city}, {partner.address.state || ""}{" "}
                    {partner.address.postalCode || ""}
                  </div>
                  <div>{partner.address.country}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Persons Card */}
          {partner.contactPersons && partner.contactPersons.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Persons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {partner.contactPersons.map((contact, index) => (
                    <div key={index} className="space-y-2">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">
                        <div>{contact.position}</div>
                        <div>{contact.email}</div>
                        <div>{contact.phone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* University Details Card */}
          {partner.type === "university" && partner.universityDetails && (
            <Card>
              <CardHeader>
                <CardTitle>University Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="font-medium">Ranking</div>
                  <div className="text-sm text-muted-foreground">
                    {partner.universityDetails.ranking || "Not provided"}
                  </div>
                </div>
                {partner.universityDetails.accreditation && (
                  <div>
                    <div className="font-medium">Accreditation</div>
                    <div className="text-sm text-muted-foreground">
                      {partner.universityDetails.accreditation.join(", ")}
                    </div>
                  </div>
                )}
                {partner.universityDetails.facilities && (
                  <div>
                    <div className="font-medium">Facilities</div>
                    <div className="text-sm text-muted-foreground">
                      {partner.universityDetails.facilities.join(", ")}
                    </div>
                  </div>
                )}
                {partner.universityDetails.studentServices && (
                  <div>
                    <div className="font-medium">Student Services</div>
                    <div className="text-sm text-muted-foreground">
                      {partner.universityDetails.studentServices.join(", ")}
                    </div>
                  </div>
                )}
                {partner.universityDetails.academicCalendar && (
                  <div>
                    <div className="font-medium">Academic Calendar</div>
                    <div className="text-sm text-muted-foreground">
                      {partner.universityDetails.academicCalendar}
                    </div>
                  </div>
                )}
                {partner.universityDetails.accommodationDetails && (
                  <div>
                    <div className="font-medium">Accommodation Details</div>
                    <div className="text-sm text-muted-foreground">
                      {partner.universityDetails.accommodationDetails}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Agency Details Card */}
          {partner.type === "agency" && partner.agencyDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Agency Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {partner.agencyDetails.services && (
                  <div>
                    <div className="font-medium">Services</div>
                    <div className="text-sm text-muted-foreground">
                      {partner.agencyDetails.services.join(", ")}
                    </div>
                  </div>
                )}
                {partner.agencyDetails.specialization && (
                  <div>
                    <div className="font-medium">Specialization</div>
                    <div className="text-sm text-muted-foreground">
                      {partner.agencyDetails.specialization.join(", ")}
                    </div>
                  </div>
                )}
                {partner.agencyDetails.commission && (
                  <div>
                    <div className="font-medium">Commission Range</div>
                    <div className="text-sm text-muted-foreground">
                      ${partner.agencyDetails.commission.minimum} - ${partner.agencyDetails.commission.maximum} USD
                    </div>
                  </div>
                )}
                {partner.agencyDetails.coverage && (
                  <div>
                    <div className="font-medium">Coverage</div>
                    <div className="text-sm text-muted-foreground">
                      {partner.agencyDetails.coverage.join(", ")}
                    </div>
                  </div>
                )}
                {partner.agencyDetails.license && (
                  <div>
                    <div className="font-medium">License</div>
                    <div className="text-sm text-muted-foreground">
                      <div>Number: {partner.agencyDetails.license.number}</div>
                      {partner.agencyDetails.license.expiryDate && (
                        <div>
                          Expiry: {format(new Date(partner.agencyDetails.license.expiryDate), "PPP")}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="students">
          <ReferredStudents partnerId={partner._id} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsSection partnerId={partner._id} documents={partner.documents} />
        </TabsContent>

        <TabsContent value="metrics">
          <PartnerMetrics partnerId={partner._id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
