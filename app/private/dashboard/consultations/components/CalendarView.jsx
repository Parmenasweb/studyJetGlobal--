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
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

export default function CalendarView({ consultations }) {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  return (
    <div className="h-[700px] p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        eventPropGetter={(event) => ({
          className: `${
            statusColors[event.consultation.status]
          } text-white rounded-md px-2`,
        })}
        views={["month", "week", "day"]}
      />

      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Consultation Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Consultee</p>
                <p>{selectedEvent.consulteeName}</p>
              </div>
              <div>
                <p className="font-semibold">Type</p>
                <Badge variant="outline">
                  {selectedEvent.consultationType.charAt(0).toUpperCase() +
                    selectedEvent.consultationType.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="font-semibold">Mode</p>
                <Badge variant="outline">
                  {selectedEvent.preferredMode === "online"
                    ? "Online"
                    : "In-Person"}
                </Badge>
              </div>
              <div>
                <p className="font-semibold">Status</p>
                <Badge className={statusColors[selectedEvent.status]}>
                  {selectedEvent.status.charAt(0).toUpperCase() +
                    selectedEvent.status.slice(1)}
                </Badge>
              </div>
              {selectedEvent.assignedTo && (
                <div>
                  <p className="font-semibold">Assigned To</p>
                  <p>{`${selectedEvent.assignedTo.firstName} ${selectedEvent.assignedTo.lastName}`}</p>
                </div>
              )}
              <Button onClick={handleViewDetails} className="w-full">
                View Full Details
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
