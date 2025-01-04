"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { ClipboardList } from "lucide-react";

export default function ConsultationNotes({ notes = [], consultationId }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ClipboardList className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Consultation Notes</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] mt-4">
          {notes && notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map((note, index) => (
                <div
                  key={note.id || index}
                  className="bg-muted p-4 rounded-lg space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {note.author
                        ? `${note.author.firstName} ${note.author.lastName}`
                        : "System"}
                    </span>
                    <span>
                      {formatDistanceToNow(new Date(note.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No notes available
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
} 