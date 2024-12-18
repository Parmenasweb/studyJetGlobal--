import { ClientForm } from "../components/ClientForm";

export default function NewClientPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">New Client</h2>
        <p className="text-muted-foreground">
          Add a new client to your dashboard
        </p>
      </div>
      <ClientForm />
    </div>
  );
} 