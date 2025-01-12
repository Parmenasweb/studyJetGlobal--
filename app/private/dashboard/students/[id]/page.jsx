import { getClient } from "@/actions/client";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageView } from "@/components/ImageView";
import Link from "next/link";
import { Edit, ArrowLeft } from "lucide-react";

// Mark as async Server Component
async function ClientPage({ params }) {
  try {
    const client = await getClient(params.id);

    if (!client) {
      notFound();
    }

    const getStatusColor = (status) => {
      switch (status) {
        case "active":
          return "bg-green-500";
        case "lead":
          return "bg-blue-500";
        case "inactive":
          return "bg-gray-500";
        default:
          return "bg-gray-500";
      }
    };

    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/private/dashboard/students">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{client.personalInfo.fullName}</h1>
              <p className="text-gray-500">{client.clientId}</p>
            </div>
          </div>
          <Button asChild>
            <Link href={`/private/dashboard/students/${client._id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Client
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Commission</p>
                  <p className="font-medium">${client.commission.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{client.personalInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{client.personalInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p>{format(new Date(client.personalInfo.dateOfBirth), "PPP")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nationality</p>
                  <p>{client.personalInfo.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Passport Number</p>
                  <p>{client.personalInfo.passportNumber}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Current Residence</p>
                <p>{client.personalInfo.currentResidence.country}</p>
                {client.personalInfo.currentResidence.city && (
                  <p className="text-sm text-gray-500">
                    {client.personalInfo.currentResidence.city}
                  </p>
                )}
                {client.personalInfo.currentResidence.address && (
                  <p className="text-sm text-gray-500">
                    {client.personalInfo.currentResidence.address}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Emergency Contact</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p>{client.personalInfo.emergencyContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Relationship</p>
                    <p>{client.personalInfo.emergencyContact.relationship}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{client.personalInfo.emergencyContact.phone}</p>
                  </div>
                  {client.personalInfo.emergencyContact.email && (
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{client.personalInfo.emergencyContact.email}</p>
                    </div>
                  )}
                </div>
                {client.personalInfo.emergencyContact.address && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p>{client.personalInfo.emergencyContact.address}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">University</p>
                <p>{client.academicInfo.university.name}</p>
                <p className="text-sm text-gray-500">
                  {client.academicInfo.university.country}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Program</p>
                <p>{client.academicInfo.program.name}</p>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="capitalize">{client.academicInfo.program.level}</span>
                  <span>•</span>
                  <span>{client.academicInfo.program.major}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {client.academicInfo.enrollmentDate && (
                  <div>
                    <p className="text-sm text-gray-500">Enrollment Date</p>
                    <p>
                      {format(new Date(client.academicInfo.enrollmentDate), "PPP")}
                    </p>
                  </div>
                )}
                {client.academicInfo.expectedGraduationDate && (
                  <div>
                    <p className="text-sm text-gray-500">Expected Graduation</p>
                    <p>
                      {format(
                        new Date(client.academicInfo.expectedGraduationDate),
                        "PPP"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {client.visaInfo && (
            <Card>
              <CardHeader>
                <CardTitle>Visa Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Visa Type</p>
                    <p>{client.visaInfo.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Visa Number</p>
                    <p>{client.visaInfo.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Issue Date</p>
                    <p>{format(new Date(client.visaInfo.issueDate), "PPP")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p>{format(new Date(client.visaInfo.expiryDate), "PPP")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Issuing Country</p>
                    <p>{client.visaInfo.issuingCountry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge
                      variant={
                        client.visaInfo.status === "active" ? "success" : "warning"
                      }
                    >
                      {client.visaInfo.status}
                    </Badge>
                  </div>
                  {client.visaInfo.permitNumber && (
                    <div>
                      <p className="text-sm text-gray-500">Permit Number</p>
                      <p>{client.visaInfo.permitNumber}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {client.documents?.map((doc, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-sm text-gray-500 capitalize">
                          {doc.type.replace("_", " ")}
                        </p>
                      </div>
                      <Badge
                        variant={
                          doc.status === "approved"
                            ? "success"
                            : doc.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </div>
                    <ImageView
                      src={doc.fileUrl}
                      alt={doc.title}
                      className="w-full max-w-md rounded-lg shadow-sm"
                      width={300}
                      height={200}
                    />
                    <p className="text-xs text-gray-500">
                      Uploaded on {format(new Date(doc.uploadDate), "PPP")}
                    </p>
                  </div>
                ))}
                {(!client.documents || client.documents.length === 0) && (
                  <p className="text-sm text-gray-500">No documents uploaded yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading client:", error);
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Error Loading Client</h1>
          <p className="text-gray-500">{error.message}</p>
          <Button asChild>
            <Link href="/private/dashboard/students">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Students
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default ClientPage; 