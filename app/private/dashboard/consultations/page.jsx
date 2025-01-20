import { Suspense } from "react";
import { getConsultations } from "@/actions/consultation";
import ConsultationActions from "./components/ConsultationActions";
import ConsultationStats from "./components/ConsultationStats";
import ConsultationContent from "./components/ConsultationContent";
import Loading from "./loading";
import Error from "./error";
import { isWithinInterval, parseISO, format } from "date-fns";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

// Helper function to serialize MongoDB documents
function serializeConsultation(consultation) {
  if (!consultation) return null;
  
  // Ensure date is valid before formatting
  const selectedDate = consultation.selectedDate 
    ? new Date(consultation.selectedDate)
    : null;

  // Format time to ensure consistent display
  const selectedTime = consultation.selectedTime 
    ? format(parseISO(`2000-01-01T${consultation.selectedTime}`), "HH:mm")
    : "";

  // Create a plain object with only the data we need
  const serialized = {
    id: consultation._id?.toString() || "",
    consulteeName: consultation.consulteeName || "",
    email: consultation.email || "",
    contactNumber: consultation.contactNumber || "",
    whatsAppNumber: consultation.whatsAppNumber || "",
    selectedDate: selectedDate ? selectedDate.toISOString() : null,
    selectedTime: selectedTime,
    consultationType: (consultation.consultationType || "").toLowerCase(),
    preferredMode: (consultation.preferredMode || "online").toLowerCase(),
    interestedCountries: Array.isArray(consultation.interestedCountries) 
      ? [...consultation.interestedCountries] 
      : [],
    description: consultation.description || "",
    status: (consultation.status || "pending").toLowerCase(),
    createdAt: consultation.createdAt 
      ? new Date(consultation.createdAt).toISOString() 
      : new Date().toISOString(),
    updatedAt: consultation.updatedAt 
      ? new Date(consultation.updatedAt).toISOString() 
      : new Date().toISOString()
  };

  // Serialize notes if they exist
  if (Array.isArray(consultation.notes)) {
    serialized.notes = consultation.notes.map(note => ({
      id: note?._id?.toString() || "",
      content: note?.content || "",
      createdAt: note?.createdAt 
        ? new Date(note.createdAt).toISOString() 
        : new Date().toISOString(),
      author: note?.author 
        ? {
            id: note.author._id?.toString() || "",
            firstName: note.author.firstName || "",
            lastName: note.author.lastName || "",
            email: note.author.email || ""
          } 
        : null
    }));
  } else {
    serialized.notes = [];
  }

  // Serialize assignedTo if it exists
  if (consultation.assignedTo) {
    serialized.assignedTo = {
      id: consultation.assignedTo._id?.toString() || "",
      firstName: consultation.assignedTo.firstName || "",
      lastName: consultation.assignedTo.lastName || "",
      email: consultation.assignedTo.email || "",
      role: consultation.assignedTo.role || "staff"
    };
  } else {
    serialized.assignedTo = null;
  }

  return serialized;
}

export default async function ConsultationsPage({ searchParams }) {
  try {
    const [consultations, error] = await getConsultations();

    if (error) {
      console.error("Error fetching consultations:", error);
      return <Error message="Failed to load consultations. Please try again." />;
    }

    if (!consultations) {
      return <Error message="No consultations found." />;
    }

    // Serialize the consultations before filtering
    let serializedConsultations = consultations.map(serializeConsultation);

    // Apply date filtering if date range is provided
    if (searchParams.from || searchParams.to) {
      const fromDate = searchParams.from ? parseISO(searchParams.from) : new Date(0);
      const toDate = searchParams.to ? parseISO(searchParams.to) : new Date();

      serializedConsultations = serializedConsultations.filter((consultation) => {
        if (!consultation.selectedDate) return false;
        const consultationDate = parseISO(consultation.selectedDate);
        return isWithinInterval(consultationDate, { start: fromDate, end: toDate });
      });
    }

    // Sort consultations by date (most recent first)
    serializedConsultations.sort((a, b) => {
      if (!a.selectedDate) return 1;
      if (!b.selectedDate) return -1;
      return new Date(b.selectedDate) - new Date(a.selectedDate);
    });

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
            <h2 className="text-3xl font-bold tracking-tight">Studyjet Global Consultations</h2>
            <p className="text-muted-foreground">
              Manage and track students&apos; consultation requests
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
