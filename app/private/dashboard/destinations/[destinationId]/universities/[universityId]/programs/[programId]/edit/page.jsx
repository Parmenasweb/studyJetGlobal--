import { getProgram } from "@/actions/program";
import { getUniversity } from "@/actions/destination";
import { ProgramForm } from "../../components/ProgramForm";
import { Separator } from "@/components/ui/separator";

export default async function EditProgramPage({ params }) {
  const { destinationId, universityId, programId } = params;
  const university = await getUniversity(destinationId, universityId);
  const program = await getProgram(destinationId, universityId, programId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Program</h1>
        <p className="text-muted-foreground">
          Edit program details for {university.name}
        </p>
      </div>
      <Separator />
      <ProgramForm
        destinationId={destinationId}
        universityId={universityId}
        program={program}
      />
    </div>
  );
} 