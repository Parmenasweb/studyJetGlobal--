import { getConsultationById } from "@/actions/consultation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultationNotes from "../components/ConsultationNotes";

const statusVariants = {
  pending: "warning",
  confirmed: "secondary",
  completed: "success",
  cancelled: "destructive",
};

export default async function ConsultationDetailsPage({ params }) {
  const [consultation, error] = await getConsultationById(params.id);

  if (error || !consultation) {
    notFound();
  }

  return (
    <div className="flex-1 h-full space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/private/dashboard/consultations">
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">
            Consultation Details
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/private/dashboard/consultations/${consultation._id}/edit`}>
            <Button>Edit Consultation</Button>
          </Link>
          <Link href={`/private/dashboard/consultations/${consultation._id}/notes`}>
            <Button variant="outline">View Notes</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 p-6">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p>{consultation.consulteeName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{consultation.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p>{consultation.contactNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
                <p>{consultation.whatsAppNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Consultation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p>{format(new Date(consultation.selectedDate), "PPP")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time</p>
                <p>{consultation.selectedTime}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <p className="capitalize">{consultation.consultationType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mode</p>
                <p className="capitalize">{consultation.preferredMode}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 p-4">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Interested Countries
              </p>
              <div className="flex flex-wrap gap-2">
                {consultation.interestedCountries.map((country) => (
                  <span
                    key={country}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Description
              </p>
              <p className="text-sm">{consultation.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 p-4">
          <CardHeader>
            <CardTitle>Status Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant={statusVariants[consultation.status]}>
                  {consultation.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                <p>{format(new Date(consultation.createdAt), "PPP")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Updated At</p>
                <p>{format(new Date(consultation.updatedAt), "PPP")}</p>
              </div>
              {consultation.assignedTo && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                  <p>{`${consultation.assignedTo.firstName} ${consultation.assignedTo.lastName}`}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Notes</h3>
          <ConsultationNotes 
            notes={consultation.notes} 
            consultationId={consultation.id}
          />
        </div>
        
        {consultation.notes && consultation.notes.length > 0 ? (
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm whitespace-pre-wrap">
              {consultation.notes[consultation.notes.length - 1].content}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Latest note from{" "}
              {consultation.notes[consultation.notes.length - 1].author
                ? `${consultation.notes[consultation.notes.length - 1].author.firstName} ${
                    consultation.notes[consultation.notes.length - 1].author.lastName
                  }`
                : "System"}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">No notes available</p>
        )}
      </div>
    </div>
  );
} 