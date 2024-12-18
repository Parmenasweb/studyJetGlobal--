"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function Timeline({ timeline = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {timeline.map((event, index) => (
            <div
              key={index}
              className="flex gap-4 items-start relative"
            >
              <div className="flex flex-col items-center">
                <div className="h-2 w-2 rounded-full bg-primary" />
                {index !== timeline.length - 1 && (
                  <div className="w-0.5 h-full bg-border absolute top-2" />
                )}
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant={
                    event.status === "approved" ? "success" :
                    event.status === "rejected" ? "destructive" :
                    event.status === "processing" ? "warning" :
                    "secondary"
                  }>
                    {event.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(event.date), "PPp")}
                  </span>
                </div>
                <p className="text-sm">{event.description}</p>
                <p className="text-xs text-muted-foreground">
                  Updated by {event.updatedBy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 