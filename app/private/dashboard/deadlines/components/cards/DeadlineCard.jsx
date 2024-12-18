"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Edit,
  FileText,
  FolderKanban,
  GraduationCap,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const typeIcons = {
  application: <FileText className="h-4 w-4" />,
  visa: <FolderKanban className="h-4 w-4" />,
  scholarship: <GraduationCap className="h-4 w-4" />,
};

const statusStyles = {
  upcoming: "bg-blue-500/10 text-blue-500",
  urgent: "bg-red-500/10 text-red-500",
  completed: "bg-green-500/10 text-green-500",
};

export default function DeadlineCard({
  deadline,
  onEdit,
  onDelete,
  onUpdateProgress,
  onUpdateStatus,
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProgressUpdate = async (newProgress) => {
    try {
      setIsUpdating(true);
      await onUpdateProgress(deadline.id, newProgress);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setIsUpdating(true);
      await onUpdateStatus(deadline.id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="relative">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              {deadline.title}
            </CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <span className="flex items-center">
                {typeIcons[deadline.type]}
                <span className="ml-1 capitalize">{deadline.type}</span>
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {format(new Date(deadline.date), "MMM d, yyyy")}
              </span>
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                disabled={isUpdating}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(deadline)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onDelete(deadline.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadline.description && (
            <p className="text-sm text-muted-foreground">
              {deadline.description}
            </p>
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {deadline.progress}%
              </span>
            </div>
            <Progress value={deadline.progress} className="h-2" />
          </div>
          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className={cn(
                "flex items-center gap-1",
                statusStyles[deadline.status]
              )}
            >
              <Clock className="h-3 w-3" />
              <span className="capitalize">{deadline.status}</span>
            </Badge>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleProgressUpdate(deadline.progress + 10)}
                disabled={isUpdating || deadline.progress >= 100}
              >
                +10%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleStatusUpdate(
                    deadline.status === "completed"
                      ? "upcoming"
                      : "completed"
                  )
                }
                disabled={isUpdating}
              >
                {deadline.status === "completed" ? "Reopen" : "Complete"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 