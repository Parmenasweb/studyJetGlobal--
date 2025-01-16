"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";
import { DollarSign, Users } from "lucide-react";

export function ReferredStudents({ partnerId }) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, [partnerId]);

  const loadStudents = async () => {
    try {
      const response = await fetch(`/api/partners/${partnerId}/students`);
      if (!response.ok) {
        throw new Error("Failed to load students");
      }
      const data = await response.json();
      
      // Load client data for each student
      const studentsWithClientData = await Promise.all(
        data.map(async (student) => {
          try {
            const clientResponse = await fetch(`/api/clients/${student.student._id}`);
            if (clientResponse.ok) {
              const clientData = await clientResponse.json();
              return {
                ...student,
                commission:{
                  amount: clientData.commission,
                  paid: "true",
                }
              };
            }
          } catch (error) {
            console.error("Error loading client data:", error);
          }
          console.log(student)
          return student;
          
        })
      );

      setStudents(studentsWithClientData);
      console.log(studentsWithClientData);
    } catch (error) {
      console.error("Error loading students:", error);
      toast.error(error.message || "Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStudentStatus = async (studentId, newStatus) => {
    try {
      const response = await fetch(`/api/partners/${partnerId}/students`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update student status");
      }

      toast.success("Student status updated successfully");
      loadStudents();
    } catch (error) {
      console.error("Error updating student status:", error);
      toast.error(error.message || "Failed to update student status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "enrolled":
        return "bg-emerald-500/10 text-emerald-500";
      case "completed":
        return "bg-blue-500/10 text-blue-500";
      case "withdrawn":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              {students.filter(s => s.status === "enrolled").length} active students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${students.reduce((sum, s) => sum + (s.commission?.amount || 0), 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {students.filter(s => s.commission?.paid === "true").length} payments completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Referred Students</CardTitle>
          <CardDescription>
            Manage and track all students referred by this partner
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : students.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No students have been referred yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Referral Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.student._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {student.student.personalInfo.fullName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {student.student.personalInfo.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.program}</TableCell>
                    <TableCell>
                      {format(new Date(student.referralDate), "PPP")}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          
                             ${student.commission?.amount?.toFixed(2)}
                        
                        
                        </div>
                        
                        
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={student.status}
                        onValueChange={(value) =>
                          updateStudentStatus(student.student._id, value)
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="enrolled">Enrolled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="withdrawn">Withdrawn</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 