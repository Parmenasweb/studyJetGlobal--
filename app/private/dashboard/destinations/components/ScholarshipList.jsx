"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Award, Calendar, DollarSign, FileText, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import ScholarshipForm from "./ScholarshipForm";

export default function ScholarshipList({ destinationId, scholarships = [] }) {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (scholarshipId) => {
    if (!confirm("Are you sure you want to delete this scholarship?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/destinations/${destinationId}/scholarships/${scholarshipId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete scholarship");
      }

      toast({
        title: "Success",
        description: "Scholarship deleted successfully",
      });

      window.location.reload();
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete scholarship",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (scholarship) => {
    setSelectedScholarship(scholarship);
    setIsEditOpen(true);
  };

  const handleFormSuccess = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setSelectedScholarship(null);
    window.location.reload();
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Scholarships</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Scholarship
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Scholarship</DialogTitle>
              <DialogDescription>
                Add a new scholarship to this destination
              </DialogDescription>
            </DialogHeader>
            <ScholarshipForm
              destinationId={destinationId}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsAddOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scholarships.map((scholarship) => (
          <Card key={scholarship._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    {scholarship.name}
                  </CardTitle>
                  <CardDescription className="capitalize">{scholarship.type} Scholarship</CardDescription>
                </div>
                <Badge variant={
                  scholarship.status === "active" ? "secondary" : 
                  scholarship.status === "upcoming" ? "outline" : "destructive"
                }>
                  {scholarship.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Amount: {scholarship.amount} ({scholarship.coverage} coverage)
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Deadline: {formatDate(scholarship.deadline)}
                </div>
                {scholarship.requiredDocuments?.length > 0 && (
                  <div className="flex items-start text-sm">
                    <FileText className="mr-2 h-4 w-4 mt-1" />
                    <div>
                      <div className="font-medium">Required Documents:</div>
                      <ul className="list-disc list-inside">
                        {scholarship.requiredDocuments.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(scholarship)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(scholarship._id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Scholarship</DialogTitle>
            <DialogDescription>
              Update scholarship information
            </DialogDescription>
          </DialogHeader>
          {selectedScholarship && (
            <ScholarshipForm
              destinationId={destinationId}
              initialData={selectedScholarship}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setIsEditOpen(false);
                setSelectedScholarship(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 