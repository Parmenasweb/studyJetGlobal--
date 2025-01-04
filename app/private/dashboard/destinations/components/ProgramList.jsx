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
import { Plus, GraduationCap, Clock, Languages, DollarSign, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import ProgramForm from "./ProgramForm";

export default function ProgramList({ destinationId, programs = [] }) {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (programId) => {
    if (!confirm("Are you sure you want to delete this program?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/destinations/${destinationId}/programs/${programId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete program");
      }

      toast({
        title: "Success",
        description: "Program deleted successfully",
      });

      window.location.reload();
    } catch (error) {
      console.error("Error deleting program:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete program",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (program) => {
    setSelectedProgram(program);
    setIsEditOpen(true);
  };

  const handleFormSuccess = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setSelectedProgram(null);
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Programs</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Program</DialogTitle>
              <DialogDescription>
                Add a new program to this destination
              </DialogDescription>
            </DialogHeader>
            <ProgramForm
              destinationId={destinationId}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsAddOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((program) => (
          <Card key={program._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    {program.name}
                  </CardTitle>
                  <CardDescription className="capitalize">{program.type}</CardDescription>
                </div>
                <Badge variant={program.status === "active" ? "secondary" : "outline"}>
                  {program.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Duration: {program.duration}
                </div>
                <div className="flex items-center text-sm">
                  <Languages className="mr-2 h-4 w-4" />
                  Language: {program.language}
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Tuition: {program.tuitionFee} {program.currency}
                </div>

                {program.intakes?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {program.intakes.map((intake, index) => (
                      <Badge key={index} variant="outline">
                        {intake}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(program)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(program._id)}
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
            <DialogTitle>Edit Program</DialogTitle>
            <DialogDescription>
              Update program information
            </DialogDescription>
          </DialogHeader>
          {selectedProgram && (
            <ProgramForm
              destinationId={destinationId}
              initialData={selectedProgram}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setIsEditOpen(false);
                setSelectedProgram(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 