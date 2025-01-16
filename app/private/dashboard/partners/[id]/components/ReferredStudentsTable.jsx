"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

const STATUS_COLORS = {
  enrolled: "success",
  completed: "success",
  withdrawn: "destructive",
  pending: "secondary",
};

export function ReferredStudentsTable({ partner }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function updateStudentStatus(studentId, newStatus) {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/partners/${partner._id}/students/${studentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update student status");
      }

      toast.success("Student status updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Referred Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted">
              <tr>
                <th className="px-6 py-3">Student ID</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Referral Date</th>
                <th className="px-6 py-3">Commission</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partner.referredStudents?.map((student) => (
                <tr key={student.student} className="border-b">
                  <td className="px-6 py-4">{student.student}</td>
                  <td className="px-6 py-4">
                    <Badge variant={STATUS_COLORS[student.status]}>
                      {student.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {format(new Date(student.referralDate), "PPP")}
                  </td>
                  <td className="px-6 py-4">
                    ${student.commission?.amount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Update Status
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => updateStudentStatus(student.student, "enrolled")}
                          disabled={isUpdating || student.status === "enrolled"}
                        >
                          Enrolled
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateStudentStatus(student.student, "completed")}
                          disabled={isUpdating || student.status === "completed"}
                        >
                          Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateStudentStatus(student.student, "withdrawn")}
                          disabled={isUpdating || student.status === "withdrawn"}
                        >
                          Withdrawn
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!partner.referredStudents?.length && (
            <div className="text-center py-8 text-muted-foreground">
              No students found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 