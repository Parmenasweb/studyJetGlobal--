"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  FileEdit,
  MessageSquare,
  MoreHorizontal,
  PaperclipIcon,
  Plus,
  Tag,
  Trash2,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { DeadlineForm } from "../components/DeadlineForm";

const statusColors = {
  pending: "bg-secondary text-secondary-foreground",
  in_progress: "bg-blue-500 text-white",
  completed: "bg-green-500 text-white",
  overdue: "bg-destructive text-destructive-foreground",
};

const priorityColors = {
  low: "bg-secondary text-secondary-foreground",
  medium: "bg-yellow-500 text-white",
  high: "bg-orange-500 text-white",
  urgent: "bg-destructive text-destructive-foreground",
};

async function getDeadline(id) {
  const res = await fetch(`/api/deadlines?id=${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch deadline");
  }
  return res.json();
}

async function addComment(deadlineId, content) {
  const res = await fetch(`/api/deadlines/${deadlineId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    throw new Error("Failed to add comment");
  }
  return res.json();
}

export default function DeadlinePage({ params }) {
  const router = useRouter();
  const [deadline, setDeadline] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    loadDeadline();
  }, [params.id]);

  async function loadDeadline() {
    try {
      setIsLoading(true);
      const data = await getDeadline(params.id);
      setDeadline(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`/api/deadlines?id=${params.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete deadline");
      }
      toast.success("Deadline deleted successfully");
      router.push("/private/dashboard/deadlines");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleUpdateProgress(newProgress) {
    try {
      const res = await fetch(`/api/deadlines?id=${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress: newProgress }),
      });
      if (!res.ok) {
        throw new Error("Failed to update progress");
      }
      const updatedDeadline = await res.json();
      setDeadline(updatedDeadline);
      toast.success("Progress updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleUpdateStatus(newStatus) {
    try {
      const res = await fetch(`/api/deadlines?id=${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      const updatedDeadline = await res.json();
      setDeadline(updatedDeadline);
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setIsSubmittingComment(true);
      const updatedDeadline = await addComment(params.id, comment);
      setDeadline(updatedDeadline);
      setComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmittingComment(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!deadline) {
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2">
        <AlertCircle className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Deadline not found</p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setIsEditing(false)}
            className="mb-4"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel Editing
          </Button>
          <h1 className="text-2xl font-bold">Edit Deadline</h1>
        </div>
        <DeadlineForm
          deadline={deadline}
          onSuccess={() => {
            setIsEditing(false);
            loadDeadline();
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{deadline.title}</h1>
          <p className="text-muted-foreground">{deadline.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <FileEdit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Deadline</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this deadline? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Status</span>
              </div>
              <Badge className={statusColors[deadline?.status || 'pending']}>
                {(deadline?.status || 'pending')
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Priority</span>
              </div>
              <Badge className={priorityColors[deadline?.priority || 'low']}>
                {(deadline?.priority || 'low')
                  .charAt(0).toUpperCase() + (deadline?.priority || 'low').slice(1)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Due Date</span>
              </div>
              <span className="text-sm">
                {deadline?.dueDate ? format(new Date(deadline.dueDate), "PPP") : "No date set"}
              </span>
            </div>

            {deadline?.reminderDate && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Reminder</span>
                </div>
                <span className="text-sm">
                  {format(new Date(deadline.reminderDate), "PPP")}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Assigned To</span>
              </div>
              <span className="text-sm">
                {deadline.assignedTo?.name || "Unassigned"}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Progress</span>
                </div>
                <span className="text-sm">{deadline?.progress || 0}%</span>
              </div>
              <Progress value={deadline?.progress || 0} className="h-2" />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleUpdateProgress(
                      Math.max(0, (deadline?.progress || 0) - 10)
                    )
                  }
                  disabled={!deadline?.progress || deadline.progress <= 0}
                >
                  -10%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleUpdateProgress(
                      Math.min(100, (deadline?.progress || 0) + 10)
                    )
                  }
                  disabled={!deadline?.progress || deadline.progress >= 100}
                >
                  +10%
                </Button>
              </div>
            </div>

            {deadline?.tags && Array.isArray(deadline.tags) && deadline.tags.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {deadline?.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={deadline.status === "completed" ? "outline" : "default"}
              onClick={() =>
                handleUpdateStatus(
                  deadline.status === "completed" ? "pending" : "completed"
                )
              }
            >
              {deadline.status === "completed" ? "Reopen" : "Mark as Completed"}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          {deadline?.subtasks && Array.isArray(deadline.subtasks) && deadline.subtasks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Subtasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {deadline?.subtasks?.map((subtask, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={async () => {
                            const updatedSubtasks = [...deadline.subtasks];
                            updatedSubtasks[index] = {
                              ...subtask,
                              completed: !subtask.completed,
                            };
                            await handleUpdateSubtasks(updatedSubtasks);
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <span
                          className={
                            subtask.completed ? "line-through opacity-50" : ""
                          }
                        >
                          {subtask.title}
                        </span>
                      </div>
                      {subtask.dueDate && (
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(subtask.dueDate), "MMM d")}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddComment} className="space-y-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button
                  type="submit"
                  disabled={isSubmittingComment || !comment.trim()}
                >
                  {isSubmittingComment ? "Adding..." : "Add Comment"}
                </Button>
              </form>
              <Separator className="my-4" />
              <div className="space-y-4">
                {deadline.comments?.map((comment) => (
                  <div key={comment._id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {comment.user.image ? (
                          <img
                            src={comment.user.image}
                            alt={comment.user.name}
                            className="h-6 w-6 rounded-full"
                          />
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <span className="text-xs text-primary-foreground">
                              {comment.user.name[0]}
                            </span>
                          </div>
                        )}
                        <span className="text-sm font-medium">
                          {comment.user.name}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(comment.createdAt), "PPp")}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 