"use client";

import { useState } from "react";
import { DataTable } from "../students/components/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { columns } from "./components/columns";

const mockPrograms = [
  {
    _id: "1",
    name: "Computer Science",
    university: "MIT",
    level: "Bachelor's",
    duration: "4 years",
    tuition: 45000,
    status: "active",
    intake: "Fall 2024",
  },
  {
    _id: "2",
    name: "Business Administration",
    university: "Harvard",
    level: "Master's",
    duration: "2 years",
    tuition: 55000,
    status: "active",
    intake: "Spring 2024",
  },
  {
    _id: "3",
    name: "Medicine",
    university: "Stanford",
    level: "Doctorate",
    duration: "6 years",
    tuition: 65000,
    status: "inactive",
    intake: "Fall 2024",
  },
];

export default function ProgramsPage() {
  const [programs] = useState(mockPrograms);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Programs</h2>
          <p className="text-sm text-muted-foreground">
            Manage your academic programs and courses
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </div>

      <div className="space-y-4">
        <DataTable data={programs} columns={columns} />
      </div>
    </div>
  );
} 