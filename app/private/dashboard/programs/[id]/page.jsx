import { notFound } from "next/navigation";
import { getProgram } from "@/actions/program";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, FileEdit } from "lucide-react";

export default async function ProgramDetailsPage({ params }) {
  const program = await getProgram(params.id);

  if (!program) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/private/dashboard/programs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">
            Program Details
          </h2>
        </div>
        <Button asChild>
          <Link href={`/private/dashboard/programs/${program._id}/edit`}>
            <FileEdit className="mr-2 h-4 w-4" />
            Edit Program
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-lg">{program.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">University</p>
              <p className="text-lg">{program.university?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Level</p>
              <p className="text-lg">{program.level}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Duration</p>
              <p className="text-lg">{program.duration}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tuition</p>
              <p className="text-lg">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(program.tuition)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Intake</p>
              <p className="text-lg">{program.intake}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={program.status === "active" ? "success" : "secondary"}>
                {program.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{program.description}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {program.requirements.map((requirement, index) => (
                <li key={index} className="text-muted-foreground">
                  {requirement}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 