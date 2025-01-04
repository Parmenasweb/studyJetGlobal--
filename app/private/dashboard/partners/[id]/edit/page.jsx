import { notFound } from "next/navigation";
import Partner from "@/models/Partner";
import { PartnerForm } from "../../components/partner-form";
import connectDB from "@/lib/db";

async function getPartner(id) {
  await connectDB();
  const partner = await Partner.findById(id)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email");

  if (!partner) {
    notFound();
  }

  return partner;
}

export default async function EditPartnerPage({ params }) {
  const partner = await getPartner(params.id);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Edit Partner: {partner.name}
        </h2>
      </div>

      <div className="grid gap-4">
        <PartnerForm partner={JSON.parse(JSON.stringify(partner))} />
      </div>
    </div>
  );
}
