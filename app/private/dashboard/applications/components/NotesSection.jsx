"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";

export function NotesSection({ applicationId, notes = [], onAddNote }) {
  const [newNote, setNewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddNote() {
    if (!newNote.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/applications/${applicationId}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newNote }),
      });

      if (!res.ok) {
        throw new Error("Failed to add note");
      }

      const data = await res.json();
      onAddNote?.(data);
      setNewNote("");
      toast.success("Note added successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardDescription>
          Add and view notes for this application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Add a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <Button
              onClick={handleAddNote}
              disabled={isSubmitting || !newNote.trim()}
            >
              {isSubmitting ? "Adding..." : "Add Note"}
            </Button>
          </div>

          <div className="space-y-4">
            {notes.map((note, index) => (
              <div
                key={note._id || index}
                className="p-4 border rounded-lg space-y-2"
              >
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {note.content}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{note.author}</span>
                  <span>{format(new Date(note.createdAt), "PPp")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 