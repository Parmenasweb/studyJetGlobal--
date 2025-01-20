import { getConsultationById } from "@/actions/consultation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultationNotes from "../components/ConsultationNotes";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: {
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    label: "Pending"
  },
  confirmed: {
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    label: "Confirmed"
  },
  completed: {
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    label: "Completed"
  },
  cancelled: {
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    label: "Cancelled"
  }
};

const consultationTypeConfig = {
  study: {
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    label: "Study"
  },
  work: {
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    label: "Work"
  },
  other: {
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    label: "Other"
  }
};

const preferredModeConfig = {
  online: {
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    label: "Online"
  },
  phone: {
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    label: "Phone"
  }
};

export default async function ConsultationDetailsPage({ params }) {
  const [consultation, error] = await getConsultationById(params.id);

  if (error || !consultation) {
    notFound();
  }

  const type = consultation.consultationType?.toLowerCase() || "other";
  const mode = consultation.preferredMode?.toLowerCase() || "online";
  const status = consultation.status?.toLowerCase() || "pending";

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
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    consultationTypeConfig[type].color
                  )}>
                    <span className={cn(
                      "h-2 w-2 rounded-full",
                      consultationTypeConfig[type].bgColor
                    )} />
                    {consultationTypeConfig[type].label}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mode</p>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    preferredModeConfig[mode].color
                  )}>
                    <span className={cn(
                      "h-2 w-2 rounded-full",
                      preferredModeConfig[mode].bgColor
                    )} />
                    {preferredModeConfig[mode].label}
                  </span>
                </div>
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
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    statusConfig[status].color
                  )}>
                    <span className={cn(
                      "h-2 w-2 rounded-full",
                      statusConfig[status].bgColor
                    )} />
                    {statusConfig[status].label}
                  </span>
                </div>
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