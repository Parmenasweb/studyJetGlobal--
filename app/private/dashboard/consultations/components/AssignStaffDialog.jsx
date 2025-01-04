"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

export default function AssignStaffDialog({
  open,
  onOpenChange,
  consultation,
  staffMembers,
}) {
  const [selectedStaff, setSelectedStaff] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleAssign = async () => {
    if (!selectedStaff) return;

    setIsLoading(true);
    const [result, error] = await assignStaffToConsultation(
      consultation.id,
      selectedStaff
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
        description: "Staff assigned successfully",
      });
      router.refresh();
      onOpenChange(false);
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Staff Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select onValueChange={setSelectedStaff} value={selectedStaff}>
            <SelectTrigger>
              <SelectValue placeholder="Select staff member" />
            </SelectTrigger>
            <SelectContent>
              {staffMembers.map((staff) => (
                <SelectItem key={staff._id} value={staff._id}>
                  {`${staff.firstName} ${staff.lastName}`}
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
            <Button onClick={handleAssign} disabled={!selectedStaff || isLoading}>
              {isLoading ? "Assigning..." : "Assign"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
