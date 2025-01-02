"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const statusColors = {
  pending: "bg-secondary",
  in_progress: "bg-warning",
  completed: "bg-success",
  overdue: "bg-destructive",
};

const priorityColors = {
  low: "border-secondary",
  medium: "border-warning",
  high: "border-destructive",
  urgent: "border-destructive border-2",
};

export function DeadlineCalendar({ deadlines, onDeadlineClick }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to get deadlines for a specific date
  const getDeadlinesForDate = (date) => {
    return deadlines.filter(
      (deadline) =>
        format(new Date(deadline.dueDate), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );
  };

  // Custom day render function
  const renderDay = (day, modifiers) => {
    const dayDeadlines = getDeadlinesForDate(day);
    if (dayDeadlines.length === 0) return null;

    return (
      <HoverCard>
        <HoverCardTrigger>
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-0.5 pb-1">
              {dayDeadlines.slice(0, 3).map((deadline, index) => (
                <div
                  key={deadline._id}
                  className={`h-1.5 w-1.5 rounded-full ${
                    statusColors[deadline.status]
                  } ${priorityColors[deadline.priority]}`}
                />
              ))}
              {dayDeadlines.length > 3 && (
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              )}
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-80"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {format(day, "MMMM d, yyyy")} · {dayDeadlines.length} deadlines
            </p>
            <div className="space-y-1">
              {dayDeadlines.map((deadline) => (
                <div
                  key={deadline._id}
                  className="flex items-center justify-between gap-2 text-sm"
                  onClick={() => onDeadlineClick?.(deadline)}
                >
                  <span className="truncate flex-1">{deadline.title}</span>
                  <div className="flex items-center gap-1.5">
                    <Badge variant={deadline.priority}>
                      {deadline.priority}
                    </Badge>
                    <Badge variant={deadline.status}>
                      {deadline.status
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      className="rounded-md border"
      components={{
        Day: ({ date, ...props }) => (
          <div {...props} className="relative">
            {props.children}
            {renderDay(date, props.selected)}
          </div>
        ),
      }}
    />
  );
}
