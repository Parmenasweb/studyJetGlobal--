"use client";

import { PartnerForm } from "../components/PartnerForm";

export default function NewPartnerPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Add New Partner</h2>
      </div>

      <div className="grid gap-4">
        <PartnerForm />
      </div>
    </div>
  );
}
