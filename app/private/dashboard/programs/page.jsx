"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "../students/components/data-table";
import { Separator } from "@/components/ui/separator";

import { columns } from "./components/columns";
import { mockPrograms } from "./data/mock-programs";

export default function ProgramsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // In a real app, fetch from API
    setData(mockPrograms);
    setLoading(false);
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Programs</h2>
          <p className="text-sm text-muted-foreground">
            Manage available academic programs
          </p>
        </div>
        <Button

          onClick={() => router.push("/private/dashboard/programs/new")}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Program
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        loading={loading}
      />
    </div>
  );
} 