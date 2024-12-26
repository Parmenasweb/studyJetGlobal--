"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeadlineForm } from "./DeadlineForm";
import { getDeadlines, deleteDeadline } from "@/actions/deadline";

export default function DeadlinesSection() {
  const params = useParams();
  const { toast } = useToast();
  const [deadlines, setDeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState(null);

  useEffect(() => {
    if (params.destinationId) {
      fetchDeadlines();
    }
  }, [params.destinationId]);

  async function fetchDeadlines() {
    try {
      setIsLoading(true);
      const data = await getDeadlines(params.destinationId);
      setDeadlines(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch deadlines",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleEdit = (deadline) => {
    setSelectedDeadline(deadline);
    setIsDialogOpen(true);
  };

  const handleDelete = async (deadlineId) => {
    try {
      await deleteDeadline(params.destinationId, deadlineId);
      toast({
        title: "Success",
        description: "Deadline deleted successfully",
      });
      fetchDeadlines();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete deadline",
        variant: "destructive",
      });
    }
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setSelectedDeadline(null);
    fetchDeadlines();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-slate-500";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Deadlines</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDeadline(null)}
            >
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedDeadline ? "Edit Deadline" : "Add Deadline"}
              </DialogTitle>
            </DialogHeader>
            <DeadlineForm
              destinationId={params.destinationId}
              deadline={selectedDeadline}
              onSuccess={handleSuccess}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              No deadlines set
            </div>
          ) : (
            deadlines.map((deadline) => (
              <div
                key={deadline._id}
                className="flex items-start justify-between p-4 rounded-lg border"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={getPriorityColor(deadline.priority)}
                    >
                      {deadline.priority}
                    </Badge>
                    <span className="font-medium">{deadline.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {deadline.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(deadline.date), "MMM d, yyyy")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(new Date(deadline.date), "h:mm a")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(deadline)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(deadline._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
} 