import { getConsultationById } from "@/actions/consultation";
import { notFound } from "next/navigation";
import EditConsultationForm from "./EditConsultationForm";

export default async function EditConsultationPage({ params }) {
  const [consultation, error] = await getConsultationById(params.id);

  if (error || !consultation) {
    notFound();
  }

  // Properly serialize the Mongoose document
  const serializedConsultation = {
    _id: consultation._id.toString(),
    consulteeName: consultation.consulteeName,
    email: consultation.email,
    contactNumber: consultation.contactNumber,
    whatsAppNumber: consultation.whatsAppNumber,
    selectedDate: consultation.selectedDate ? new Date(consultation.selectedDate).toISOString() : null,
    selectedTime: consultation.selectedTime,
    consultationType: consultation.consultationType,
    preferredMode: consultation.preferredMode,
    interestedCountries: Array.isArray(consultation.interestedCountries) 
      ? [...consultation.interestedCountries]
      : [],
    description: consultation.description,
    status: consultation.status,
    assignedTo: consultation.assignedTo ? {
      _id: consultation.assignedTo._id.toString(),
      firstName: consultation.assignedTo.firstName,
      lastName: consultation.assignedTo.lastName,
      email: consultation.assignedTo.email
    } : null,
    notes: consultation.notes ? consultation.notes.map(note => ({
      _id: note._id.toString(),
      content: note.content,
      createdAt: new Date(note.createdAt).toISOString(),
      author: note.author ? {
        _id: note.author._id.toString(),
        firstName: note.author.firstName,
        lastName: note.author.lastName
      } : null
    })) : [],
    createdAt: new Date(consultation.createdAt).toISOString(),
    updatedAt: new Date(consultation.updatedAt).toISOString()
  };

  return <EditConsultationForm consultation={serializedConsultation} consultationId={params.id} />;
} 