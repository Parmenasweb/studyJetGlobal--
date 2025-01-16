import { getClients } from "@/actions/client";
import { DataTable } from "./components/DataTable";
import { OverviewCards } from "./components/OverviewCards";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function StudentsPage({
  searchParams: { page = "1", limit = "10", status, search },
}) {
  const { clients, pagination } = await getClients({
    page: parseInt(page),
    limit: parseInt(limit),
    status,
    search,
  });

  return (
    <div className="w-full mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">StudyjetGlobal Students</h2>
          <p className="text-muted-foreground">
            Manage studyjetglobal student clients here
          </p>
        </div>
        <Button asChild>
          <Link href="/private/dashboard/students/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        <OverviewCards clients={clients} />
        <DataTable data={clients} />
      </div>
    </div>
  );
}