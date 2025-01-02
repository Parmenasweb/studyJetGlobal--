"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { updateConsultation } from "@/actions/consultation";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function AssignStaffDialog({
  open,
  onOpenChange,
  consultation,
  staffMembers,
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedStaff, setSelectedStaff] = useState(
    consultation?.assignedTo?._id || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleAssign = async () => {
    if (!selectedStaff) {
      toast({
        title: "Error",
        description: "Please select a staff member",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const [consultation, error] = await updateConsultation(consultation._id, {
        assignedTo: selectedStaff,
      });

      if (error) throw new Error(error);

      toast({
        title: "Success",
        description: "Consultation assigned successfully",
      });

      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to assign consultation",
        variant: "destructive",
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
          <div className="space-y-2">
            <Label>Select Staff Member</Label>
            <Select
              value={selectedStaff}
              onValueChange={setSelectedStaff}
              disabled={isLoading}
            >
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
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
