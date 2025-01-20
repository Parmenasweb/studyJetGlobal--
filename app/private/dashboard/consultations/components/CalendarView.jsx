"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Clock, MapPin, User, Calendar as CalendarIcon } from "lucide-react";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const statusColors = {
  pending: {
    bg: "bg-yellow-500",
    text: "text-yellow-500",
    border: "border-yellow-500",
    light: "bg-yellow-50",
  },
  confirmed: {
    bg: "bg-blue-500",
    text: "text-blue-500",
    border: "border-blue-500",
    light: "bg-blue-50",
  },
  completed: {
    bg: "bg-green-500",
    text: "text-green-500",
    border: "border-green-500",
    light: "bg-green-50",
  },
  cancelled: {
    bg: "bg-red-500",
    text: "text-red-500",
    border: "border-red-500",
    light: "bg-red-50",
  },
};

export default function CalendarView({ consultations }) {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

  const events = consultations.map((consultation) => ({
    id: consultation._id,
    title: consultation.consulteeName,
    start: new Date(
      `${consultation.selectedDate.split("T")[0]}T${consultation.selectedTime}`
    ),
    end: new Date(
      `${consultation.selectedDate.split("T")[0]}T${consultation.selectedTime}`
    ),
    consultation: consultation,
  }));

  const handleEventClick = (event) => {
    setSelectedEvent(event.consultation);
  };

  const handleViewDetails = () => {
    router.push(`/private/dashboard/consultations/${selectedEvent._id}`);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="h-[700px] p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        eventPropGetter={(event) => ({
          className: `${
            statusColors[event.consultation.status].bg
          } text-white rounded-md px-2 border ${
            statusColors[event.consultation.status].border
          }`,
        })}
        views={["month", "week", "day"]}
        popup
        selectable
        className="rounded-md border bg-background"
      />

      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Consultation Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{selectedEvent.consulteeName}</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm">
                    {format(new Date(selectedEvent.selectedDate), "PPP")} at{" "}
                    {selectedEvent.selectedTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Badge variant="outline">
                    {selectedEvent.preferredMode === "online"
                      ? "Online"
                      : "In-Person"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Badge 
                    className={`${statusColors[selectedEvent.status].bg} text-white`}
                  >
                    {selectedEvent.status.charAt(0).toUpperCase() +
                      selectedEvent.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {selectedEvent.assignedTo && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{`${selectedEvent.assignedTo.firstName} ${selectedEvent.assignedTo.lastName}`}</p>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
                <Button onClick={handleViewDetails}>
                  View Full Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
