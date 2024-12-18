import { notFound } from "next/navigation";
import { ClientForm } from "../../components/ClientForm";
import { getClient } from "@/actions/client";

export default async function EditClientPage({ params }) {
  const client = await getClient(params.id);

  if (!client) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Edit Client</h2>
        <p className="text-muted-foreground">
          Update client information
        </p>
      </div>
      <ClientForm client={client} />
    </div>
  );
} 