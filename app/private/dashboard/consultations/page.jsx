import { Suspense } from "react";
import { getConsultations } from "@/actions/consultation";
import ConsultationActions from "./components/ConsultationActions";
import ConsultationStats from "./components/ConsultationStats";
import ConsultationContent from "./components/ConsultationContent";
import Loading from "./loading";
import Error from "./error";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

// Helper function to serialize MongoDB documents
function serializeConsultation(consultation) {
  if (!consultation) return null;
  
  return {
    id: consultation._id?.toString() || "",
    consulteeName: consultation.consulteeName || "",
    email: consultation.email || "",
    contactNumber: consultation.contactNumber || "",
    whatsAppNumber: consultation.whatsAppNumber || "",
    selectedDate: consultation.selectedDate ? new Date(consultation.selectedDate).toISOString() : null,
    selectedTime: consultation.selectedTime || "",
    consultationType: consultation.consultationType || "",
    preferredMode: consultation.preferredMode || "",
    interestedCountries: Array.isArray(consultation.interestedCountries) ? consultation.interestedCountries : [],
    description: consultation.description || "",
    status: consultation.status || "pending",
    createdAt: consultation.createdAt ? new Date(consultation.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: consultation.updatedAt ? new Date(consultation.updatedAt).toISOString() : new Date().toISOString(),
    notes: Array.isArray(consultation.notes) ? consultation.notes.map(note => ({
      id: note?._id?.toString() || "",
      content: note?.content || "",
      createdAt: note?.createdAt ? new Date(note.createdAt).toISOString() : new Date().toISOString(),
      author: note?.author ? {
        id: note.author._id?.toString() || "",
        firstName: note.author.firstName || "",
        lastName: note.author.lastName || ""
      } : null
    })) : [],
    assignedTo: consultation.assignedTo ? {
      id: consultation.assignedTo._id?.toString() || "",
      firstName: consultation.assignedTo.firstName || "",
      lastName: consultation.assignedTo.lastName || "",
      email: consultation.assignedTo.email || ""
    } : null
  };
}

export default async function ConsultationsPage() {
  try {
    const [consultations, error] = await getConsultations();

    if (error) {
      console.error("Error fetching consultations:", error);
      return <Error message="Failed to load consultations. Please try again." />;
    }

    if (!consultations) {
      return <Error message="No consultations found." />;
    }

    // Serialize the consultations before passing to client components
    const serializedConsultations = consultations.map(serializeConsultation);

    const stats = {
      total: serializedConsultations.length,
      pending: serializedConsultations.filter((cons) => cons.status === "pending").length,
      confirmed: serializedConsultations.filter((cons) => cons.status === "confirmed").length,
      completed: serializedConsultations.filter((cons) => cons.status === "completed").length,
      cancelled: serializedConsultations.filter((cons) => cons.status === "cancelled").length,
    };

    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 overflow-y-auto">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Consultations</h2>
            <p className="text-muted-foreground">
              Manage and track consultation requests
            </p>
          </div>
          <ConsultationActions />
        </div>

        <ConsultationStats stats={stats} />
        
        <Suspense fallback={<Loading />}>
          <ConsultationContent consultations={serializedConsultations} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Unexpected error in ConsultationsPage:", error);
    return <Error message="An unexpected error occurred. Please try again later." />;
  }
}
