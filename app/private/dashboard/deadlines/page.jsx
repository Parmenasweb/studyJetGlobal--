"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Search, Plus, AlertCircle } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import DeadlineForm from "./components/forms/DeadlineForm";
import DeadlineCard from "./components/cards/DeadlineCard";
import { mockDeadlines } from "./data/mock-deadlines";

export default function DeadlinesPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [deadlines, setDeadlines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDeadline, setCurrentDeadline] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setDeadlines(mockDeadlines);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateDeadline = async (data) => {
    try {
      // Simulate API call
      const newDeadline = {
        ...data,
        id: String(Date.now()),
        studentId: "user_1",
      };

      setDeadlines((prev) => [...prev, newDeadline]);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Deadline created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create deadline",
        variant: "destructive",
      });
    }
  };

  const handleUpdateDeadline = async (data) => {
    try {
      // Simulate API call
      const updatedDeadline = {
        ...currentDeadline,
        ...data,
      };

      setDeadlines((prev) =>
        prev.map((d) => (d.id === currentDeadline.id ? updatedDeadline : d))
      );
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Deadline updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update deadline",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDeadline = async (id) => {
    try {
      // Simulate API call
      setDeadlines((prev) => prev.filter((d) => d.id !== id));
      toast({
        title: "Success",
        description: "Deadline deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete deadline",
        variant: "destructive",
      });
    }
  };

  const handleProgressUpdate = async (id, progress) => {
    try {
      // Simulate API call
      setDeadlines((prev) =>
        prev.map((d) => (d.id === id ? { ...d, progress } : d))
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      // Simulate API call
      setDeadlines((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status } : d))
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const filteredDeadlines = deadlines.filter(
    (deadline) =>
      deadline.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" || deadline.type === filterType)
  );

  const sortedDeadlines = [...filteredDeadlines].sort((a, b) => {
    // Sort by status (urgent first, then upcoming, then completed)
    const statusOrder = { urgent: 0, upcoming: 1, completed: 2 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    // Then sort by date
    return new Date(a.date) - new Date(b.date);
  });

  // Calculate statistics
  const stats = {
    total: deadlines.length,
    urgent: deadlines.filter((d) => d.status === "urgent").length,
    upcoming: deadlines.filter((d) => d.status === "upcoming").length,
    completed: deadlines.filter((d) => d.status === "completed").length,
    byType: {
      application: deadlines.filter((d) => d.type === "application").length,
      visa: deadlines.filter((d) => d.type === "visa").length,
      scholarship: deadlines.filter((d) => d.type === "scholarship").length,
    },
  };

  return (
    <div className="container ml-[6%] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Deadlines Dashboard
        </h1>
        <p className="text-gray-600">
          Track and manage all your application deadlines
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Deadlines</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-red-500">Urgent</h3>
          <p className="text-2xl font-bold">{stats.urgent}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-blue-500">Upcoming</h3>
          <p className="text-2xl font-bold">{stats.upcoming}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-green-500">Completed</h3>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search deadlines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
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
        <Button
          onClick={() => {
            setCurrentDeadline(null);
            setIsDialogOpen(true);
          }}
          className="w-full md:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Deadline
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] rounded-lg bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : sortedDeadlines.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No deadlines found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by creating a new deadline
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDeadlines.map((deadline) => (
            <DeadlineCard
              key={deadline.id}
              deadline={deadline}
              onEdit={(deadline) => {
                setCurrentDeadline(deadline);
                setIsDialogOpen(true);
              }}
              onDelete={handleDeleteDeadline}
              onUpdateProgress={handleProgressUpdate}
              onUpdateStatus={handleStatusUpdate}
            />
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentDeadline ? "Edit Deadline" : "Create New Deadline"}
            </DialogTitle>
          </DialogHeader>
          <DeadlineForm
            initialData={currentDeadline}
            onSubmit={currentDeadline ? handleUpdateDeadline : handleCreateDeadline}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
