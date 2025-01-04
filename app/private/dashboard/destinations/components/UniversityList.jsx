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
import { Plus, Building2, Globe, Mail, Phone, Trophy, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import UniversityForm from "./UniversityForm";

export default function UniversityList({ destinationId, universities = [] }) {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (universityId) => {
    if (!confirm("Are you sure you want to delete this university?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/destinations/${destinationId}/universities/${universityId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete university");
      }

      toast({
        title: "Success",
        description: "University deleted successfully",
      });

      // Refresh the page to update the list
      window.location.reload();
    } catch (error) {
      console.error("Error deleting university:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete university",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (university) => {
    setSelectedUniversity(university);
    setIsEditOpen(true);
  };

  const handleFormSuccess = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setSelectedUniversity(null);
    // Refresh the page to show updated data
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Universities</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add University
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add University</DialogTitle>
              <DialogDescription>
                Add a new university to this destination
              </DialogDescription>
            </DialogHeader>
            <UniversityForm
              destinationId={destinationId}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsAddOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {universities.map((university) => (
          <Card key={university._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-2 h-4 w-4" />
                    {university.name}
                  </CardTitle>
                  <CardDescription>{university.location}</CardDescription>
                </div>
                <Badge variant={university.type === "public" ? "secondary" : "outline"}>
                  {university.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {university.ranking && (
                  <div className="flex items-center text-sm">
                    <Trophy className="mr-2 h-4 w-4" />
                    World Ranking: #{university.ranking}
                  </div>
                )}
                {university.website && (
                  <div className="flex items-center text-sm">
                    <Globe className="mr-2 h-4 w-4" />
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                {university.contactEmail && (
                  <div className="flex items-center text-sm">
                    <Mail className="mr-2 h-4 w-4" />
                    <a
                      href={`mailto:${university.contactEmail}`}
                      className="text-blue-500 hover:underline"
                    >
                      {university.contactEmail}
                    </a>
                  </div>
                )}
                {university.contactPhone && (
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-4 w-4" />
                    {university.contactPhone}
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(university)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(university._id)}
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
            <DialogTitle>Edit University</DialogTitle>
            <DialogDescription>
              Update university information
            </DialogDescription>
          </DialogHeader>
          {selectedUniversity && (
            <UniversityForm
              destinationId={destinationId}
              initialData={selectedUniversity}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setIsEditOpen(false);
                setSelectedUniversity(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 