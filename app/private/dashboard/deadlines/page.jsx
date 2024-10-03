"use client";
import React, { useState } from "react";
import {
  Search,
  FolderKanban,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  FileText,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
// import { toast } from "@/components/ui/use-toast";

// type DeadlineType = 'application' | 'visa' | 'scholarship'
// type DeadlineStatus = 'upcoming' | 'urgent' | 'completed'

// type Deadline = {
//   id: number
//   type: DeadlineType
//   title: string
//   date: string
//   progress: number
//   status: DeadlineStatus
// }

const initialDeadlines = [
  {
    id: 1,
    type: "application",
    title: "University of Oxford - Fall Semester",
    date: "2024-03-15",
    progress: 75,
    status: "upcoming",
  },
  {
    id: 2,
    type: "visa",
    title: "UK Student Visa Application",
    date: "2024-05-01",
    progress: 30,
    status: "upcoming",
  },
  {
    id: 3,
    type: "scholarship",
    title: "Fulbright Scholarship",
    date: "2024-02-28",
    progress: 90,
    status: "urgent",
  },
  {
    id: 4,
    type: "application",
    title: "ETH Zurich - Spring Semester",
    date: "2024-09-30",
    progress: 10,
    status: "upcoming",
  },
  {
    id: 5,
    type: "visa",
    title: "Schengen Visa Application",
    date: "2024-11-15",
    progress: 0,
    status: "upcoming",
  },
  {
    id: 6,
    type: "scholarship",
    title: "DAAD Scholarship",
    date: "2024-10-15",
    progress: 50,
    status: "upcoming",
  },
  {
    id: 7,
    type: "application",
    title: "University of Tokyo - Spring Semester",
    date: "2023-11-30",
    progress: 100,
    status: "completed",
  },
  {
    id: 8,
    type: "visa",
    title: "Japan Student Visa Application",
    date: "2023-12-31",
    progress: 100,
    status: "completed",
  },
];

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState(initialDeadlines);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDeadline, setCurrentDeadline] = useState(null);

  const filteredDeadlines = deadlines.filter(
    (deadline) =>
      deadline.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" || deadline.type === filterType)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "text-blue-500";
      case "urgent":
        return "text-red-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "application":
        return <FileText className="w-5 h-5 mr-2" />;
      case "visa":
        return <FolderKanban className="w-5 h-5 mr-2" />;
      case "scholarship":
        return <GraduationCap className="w-5 h-5 mr-2" />;
    }
  };

  const handleAddDeadline = () => {
    setCurrentDeadline(null);
    setIsDialogOpen(true);
  };

  const handleEditDeadline = (deadline) => {
    setCurrentDeadline(deadline);
    setIsDialogOpen(true);
  };

  const handleDeleteDeadline = (id) => {
    if (window.confirm("Are you sure you want to delete this deadline?")) {
      setDeadlines(deadlines.filter((deadline) => deadline.id !== id));
      toast({
        title: "Deadline deleted",
        description: "The deadline has been successfully deleted.",
      });
    }
  };

  const handleSubmitDeadline = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newDeadline = {
      id: currentDeadline ? currentDeadline.id : Date.now(),
      type: formData.get("type"),
      title: formData.get("title"),
      date: formData.get("date"),
      progress: parseInt(formData.get("progress")),
      status: formData.get("status"),
    };

    if (currentDeadline) {
      setDeadlines(
        deadlines.map((d) => (d.id === currentDeadline.id ? newDeadline : d))
      );
      toast({
        title: "Deadline updated",
        description: "The deadline has been successfully updated.",
      });
    } else {
      setDeadlines([...deadlines, newDeadline]);
      toast({
        title: "Deadline added",
        description: "A new deadline has been successfully added.",
      });
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          StudyJetGlobal
        </h1>
        <h2 className="text-xl text-gray-600">Deadlines Dashboard</h2>
      </header>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search deadlines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            icon={<Search className="w-4 h-4 text-gray-500" />}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="application">Application</SelectItem>
            <SelectItem value="visa">Visa</SelectItem>
            <SelectItem value="scholarship">Scholarship</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAddDeadline} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" /> Add Deadline
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Application Deadlines
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deadlines.filter((d) => d.type === "application").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {
                deadlines.filter(
                  (d) => d.type === "application" && d.status !== "completed"
                ).length
              }{" "}
              active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Visa Deadlines
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deadlines.filter((d) => d.type === "visa").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {
                deadlines.filter(
                  (d) => d.type === "visa" && d.status !== "completed"
                ).length
              }{" "}
              active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scholarship Deadlines
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deadlines.filter((d) => d.type === "scholarship").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {
                deadlines.filter(
                  (d) => d.type === "scholarship" && d.status !== "completed"
                ).length
              }{" "}
              active
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {filteredDeadlines.map((deadline) => (
          <Card key={deadline.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                {getTypeIcon(deadline.type)}
                {deadline.title}
              </CardTitle>
              <CardDescription
                className={`font-medium ${getStatusColor(deadline.status)}`}
              >
                {deadline.status === "urgent" && (
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                )}
                {deadline.status === "completed" && (
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                )}
                {deadline.status === "upcoming" && (
                  <Clock className="w-4 h-4 inline mr-1" />
                )}
                {deadline.status.charAt(0).toUpperCase() +
                  deadline.status.slice(1)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Due: {deadline.date}
                </span>
                <span className="text-sm font-medium">
                  {deadline.progress}% Complete
                </span>
              </div>
              <Progress value={deadline.progress} className="w-full mb-4" />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditDeadline(deadline)}
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteDeadline(deadline.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentDeadline ? "Edit Deadline" : "Add New Deadline"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitDeadline} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={currentDeadline?.title}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                name="type"
                defaultValue={currentDeadline?.type || "application"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="application">Application</SelectItem>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="scholarship">Scholarship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Due Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={currentDeadline?.date}
                required
              />
            </div>
            <div>
              <Label htmlFor="progress">Progress</Label>
              <Input
                id="progress"
                name="progress"
                type="number"
                min="0"
                max="100"
                defaultValue={currentDeadline?.progress || 0}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                defaultValue={currentDeadline?.status || "upcoming"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              {currentDeadline ? "Update Deadline" : "Add Deadline"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
