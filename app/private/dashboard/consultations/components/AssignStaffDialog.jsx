"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { assignStaffToConsultation } from "@/actions/consultation";
import { getStaffMembers } from "@/actions/staff";
import { useRouter } from "next/navigation";

export default function AssignStaffDialog({ open, onOpenChange, consultation }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [staffMembers, setStaffMembers] = useState([]);

  // Fetch staff members when dialog opens
  useEffect(() => {
    async function loadStaffMembers() {
      if (open) {
        try {
          const [staff, error] = await getStaffMembers();
          if (error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to load staff members. Please try again.",
            });
          } else if (staff) {
            setStaffMembers(staff); // Staff is already serialized from the server
            // If consultation is already assigned, select that staff member
            if (consultation.assignedTo) {
              setSelectedStaffId(consultation.assignedTo.id);
            }
          }
        } catch (error) {
          console.error("Error loading staff members:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred while loading staff members.",
          });
        }
      }
    }
    loadStaffMembers();
  }, [open, consultation.assignedTo, toast]);

  const handleAssign = async () => {
    if (!selectedStaffId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a staff member to assign.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const [success, error] = await assignStaffToConsultation(
        consultation.id,
        selectedStaffId
      );

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      } else {
        toast({
          title: "Success",
          description: "Staff member assigned successfully.",
        });
        onOpenChange(false);
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while assigning staff member.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Staff Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Select
            disabled={isLoading}
            value={selectedStaffId}
            onValueChange={setSelectedStaffId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select staff member" />
            </SelectTrigger>
            <SelectContent>
              {staffMembers.map((staff) => (
                <SelectItem 
                  key={staff.id} 
                  value={staff.id}
                >
                  {staff.firstName} {staff.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={isLoading}>
              {isLoading ? "Assigning..." : "Assign"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
