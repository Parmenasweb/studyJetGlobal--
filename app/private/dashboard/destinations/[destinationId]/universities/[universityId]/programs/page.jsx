import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPrograms } from "@/actions/program";
import { getUniversity } from "@/actions/university";
import CardProgramOverview from "./components/CardProgramOverview";
import { Separator } from "@/components/ui/separator";

export default async function ProgramsPage({ params }) {
  const { destinationId, universityId } = params;
  const university = await getUniversity(destinationId, universityId);
  const programs = await getPrograms(destinationId, universityId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Programs</h1>
          <p className="text-muted-foreground">
            Manage programs for {university.name}
          </p>
        </div>
        <Link
          href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs/new`}
        >
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Program
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <CardProgramOverview
            key={program._id}
            program={program}
            destinationId={destinationId}
            universityId={universityId}
          />
        ))}
        {programs.length === 0 && (
          <div className="col-span-full">
            <p className="text-center text-muted-foreground">
              No programs found. Add your first program to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 