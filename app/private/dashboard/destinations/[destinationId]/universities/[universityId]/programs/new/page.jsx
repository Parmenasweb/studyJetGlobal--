import { getUniversity } from "@/actions/university";
import ProgramForm from "../components/ProgramForm";
import { Separator } from "@/components/ui/separator";

export default async function NewProgramPage({ params }) {
  const { destinationId, universityId } = params;
  const university = await getUniversity(destinationId, universityId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Program</h1>
        <p className="text-muted-foreground">
          Add a new program to {university.name}
        </p>
      </div>
      <Separator />
      <ProgramForm
        destinationId={destinationId}
        universityId={universityId}
      />
    </div>
  );
} 