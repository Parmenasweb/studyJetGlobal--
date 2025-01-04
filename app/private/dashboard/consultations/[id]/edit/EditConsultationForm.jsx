"use client";

import ConsultationForm from "../../components/ConsultationForm";

export default function EditConsultationForm({ consultation, consultationId }) {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6 overflow-y-auto">
      <ConsultationForm 
        initialData={consultation}
        consultationId={consultationId}
      />
    </div>
  );
} 