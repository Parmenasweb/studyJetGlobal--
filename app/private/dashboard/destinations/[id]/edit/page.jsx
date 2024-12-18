import { notFound } from "next/navigation";
import { DestinationForm } from "../../components/DestinationForm";
import { getDestination } from "@/actions/destination";

export default async function EditDestinationPage({ params }) {
  const { data: destination, error } = await getDestination(params.id);

  if (error || !destination) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Edit Destination</h2>
        <p className="text-muted-foreground">
          Make changes to {destination.name}
        </p>
      </div>
      <div className="flex-1 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <DestinationForm initialData={destination} />
        </div>
      </div>
    </div>
  );
} 