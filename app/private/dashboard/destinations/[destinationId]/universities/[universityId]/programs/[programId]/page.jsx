import Link from "next/link";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProgram } from "@/actions/program";
import { getUniversity } from "@/actions/destination";

export default async function ProgramPage({ params }) {
  const { destinationId, universityId, programId } = params;
  const university = await getUniversity(destinationId, universityId);
  const program = await getProgram(destinationId, universityId, programId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{program.name}</h1>
          <p className="text-muted-foreground">
            Program details for {university.name}
          </p>
        </div>
        <Link
          href={`/private/dashboard/destinations/${destinationId}/universities/${universityId}/programs/${programId}/edit`}
        >
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Program
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-medium">Level</p>
                <p className="text-sm text-muted-foreground">{program.level}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">{program.duration}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Tuition Fee</p>
                <p className="text-sm text-muted-foreground">{program.tuitionFee}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Credits</p>
                <p className="text-sm text-muted-foreground">{program.credits}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Language</p>
                <p className="text-sm text-muted-foreground">{program.language}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge
                  variant={program.status === "active" ? "default" : "secondary"}
                  className="mt-1"
                >
                  {program.status}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Academic Information</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-medium">Faculty</p>
                <p className="text-sm text-muted-foreground">{program.faculty}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Department</p>
                <p className="text-sm text-muted-foreground">{program.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Campus</p>
                <p className="text-sm text-muted-foreground">{program.campus}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
              {program.description}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Intakes</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {program.intakes.map((intake, index) => (
                <Badge key={index} variant="secondary">
                  {intake}
                </Badge>
              ))}
              {program.intakes.length === 0 && (
                <p className="text-sm text-muted-foreground">No intakes specified</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Requirements</h2>
            <div className="mt-2">
              {program.requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span>•</span>
                  <span>{requirement}</span>
                </div>
              ))}
              {program.requirements.length === 0 && (
                <p className="text-sm text-muted-foreground">No requirements specified</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Specializations</h2>
            <div className="mt-2">
              {program.specializations.map((specialization, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span>•</span>
                  <span>{specialization}</span>
                </div>
              ))}
              {program.specializations.length === 0 && (
                <p className="text-sm text-muted-foreground">No specializations specified</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Career Opportunities</h2>
            <div className="mt-2">
              {program.careerOpportunities.map((career, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span>•</span>
                  <span>{career}</span>
                </div>
              ))}
              {program.careerOpportunities.length === 0 && (
                <p className="text-sm text-muted-foreground">No career opportunities specified</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Research Areas</h2>
            <div className="mt-2">
              {program.researchAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span>•</span>
                  <span>{area}</span>
                </div>
              ))}
              {program.researchAreas.length === 0 && (
                <p className="text-sm text-muted-foreground">No research areas specified</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Application Deadlines</h2>
            <div className="mt-4 space-y-4">
              {program.applicationDeadlines.fall && (
                <div>
                  <p className="text-sm font-medium">Fall Intake</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(program.applicationDeadlines.fall), "PPP")}
                  </p>
                </div>
              )}
              {program.applicationDeadlines.spring && (
                <div>
                  <p className="text-sm font-medium">Spring Intake</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(program.applicationDeadlines.spring), "PPP")}
                  </p>
                </div>
              )}
              {program.applicationDeadlines.summer && (
                <div>
                  <p className="text-sm font-medium">Summer Intake</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(program.applicationDeadlines.summer), "PPP")}
                  </p>
                </div>
              )}
              {!program.applicationDeadlines.fall &&
                !program.applicationDeadlines.spring &&
                !program.applicationDeadlines.summer && (
                  <p className="text-sm text-muted-foreground">No deadlines specified</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 