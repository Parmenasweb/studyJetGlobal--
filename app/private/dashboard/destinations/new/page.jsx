import { DestinationForm } from "../components/DestinationForm";

export default function NewDestinationPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">New Destination</h2>
        <p className="text-muted-foreground">
          Add a new study abroad destination to the system
        </p>
      </div>
      <div className="flex-1 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <DestinationForm />
        </div>
      </div>
    </div>
  );
} 