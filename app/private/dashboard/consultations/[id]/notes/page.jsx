import { getConsultationById } from "@/actions/consultation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddNoteForm from "./AddNoteForm";

export default async function ConsultationNotesPage({ params }) {
  const [consultation, error] = await getConsultationById(params.id);

  if (error || !consultation) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href={`/private/dashboard/consultations/${params.id}`}>
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Consultation
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Consultation Notes</h2>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Add New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <AddNoteForm consultationId={params.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes History</CardTitle>
          </CardHeader>
          <CardContent>
            {consultation.notes && consultation.notes.length > 0 ? (
              <div className="space-y-4">
                {consultation.notes.map((note, index) => (
                  <div
                    key={note._id.toString()}
                    className="bg-muted p-4 rounded-lg space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="space-x-2">
                        <span>
                          By:{" "}
                          {note.author
                            ? `${note.author.firstName} ${note.author.lastName}`
                            : "System"}
                        </span>
                        <span>•</span>
                        <span>
                          {format(new Date(note.createdAt), "PPP 'at' pp")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No notes available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 