"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockApplications } from "../../data/mock-applications";
import { formatDate } from "@/lib/utils";

export default function ApplicationNotesPage() {
  const params = useParams();
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const application = mockApplications.find((app) => app._id === params.id);

  if (!application) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Application Not Found</h1>
          <p className="text-muted-foreground">
            The application you are looking for does not exist.
          </p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      console.log("Adding note:", newNote);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Application Notes</h2>
          <p className="text-muted-foreground">
            View and manage notes for {application.personalInfo.fullName}
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Note</CardTitle>
            <CardDescription>
              Add a new note to this application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddNote} className="space-y-4">
              <Textarea
                placeholder="Type your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[100px]"
              />
              <Button type="submit" disabled={isLoading || !newNote.trim()}>
                Add Note
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes History</CardTitle>
            <CardDescription>
              Previous notes and comments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {application.notes.length === 0 ? (
                <p className="text-muted-foreground">No notes yet</p>
              ) : (
                application.notes.map((note, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{note.author}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>
              Application progress timeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {application.timeline.map((event, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-2 p-4 border rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{event.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  <p className="text-sm">{event.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Updated by: {event.updatedBy}</span>
                    <span className="capitalize">Status: {event.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 