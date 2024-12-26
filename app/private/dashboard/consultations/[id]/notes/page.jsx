"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { mockConsultations } from "../../data/mock-consultations";

export default function ConsultationNotesPage() {
  const params = useParams();
  const router = useRouter();
  const [consultation, setConsultation] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const found = mockConsultations.find((c) => c._id === params.id);
    setConsultation(found);
  }, [params.id]);

  if (!consultation) {
    return <div>Loading...</div>;
  }

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const note = {
        content: newNote,
        author: "Admin",
        createdAt: new Date(),
      };
      consultation.notes.push(note);
      setNewNote("");
      // Refresh the page to show the new note
      router.refresh();
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">
            Consultation Notes
          </h2>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Note</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddNote} className="space-y-4">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Type your note here..."
                rows={4}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading || !newNote.trim()}>
                  Add Note
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultation.notes.map((note, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <p>{note.content}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{note.author}</span>
                    <span>{format(new Date(note.createdAt), "PPP")}</span>
                  </div>
                </div>
              ))}
              {consultation.notes.length === 0 && (
                <p className="text-muted-foreground">No notes yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 