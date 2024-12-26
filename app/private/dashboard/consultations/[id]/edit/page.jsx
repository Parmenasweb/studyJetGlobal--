"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ConsultationForm from "../../components/ConsultationForm";
import { mockConsultations } from "../../data/mock-consultations";

export default function EditConsultationPage() {
  const params = useParams();
  const router = useRouter();
  const [consultation, setConsultation] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const found = mockConsultations.find((c) => c._id === params.id);
    setConsultation(found);
  }, [params.id]);

  if (!consultation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">
            Edit Consultation
          </h2>
        </div>
      </div>

      <ConsultationForm initialData={consultation} />
    </div>
  );
} 