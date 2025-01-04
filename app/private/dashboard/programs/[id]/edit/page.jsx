import { notFound } from "next/navigation";
import { ProgramForm } from "../../components/ProgramForm";
import { getProgram } from "@/actions/program";
import { getUniversities } from "@/actions/destination";

export default async function EditProgramPage({ params }) {
  const [program, universities] = await Promise.all([
    getProgram(params.id),
    getUniversities(),
  ]);

  if (!program) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Edit Program</h2>
        <p className="text-muted-foreground">
          Update program information
        </p>
      </div>
      <ProgramForm program={program} universities={universities} />
    </div>
  );
} 