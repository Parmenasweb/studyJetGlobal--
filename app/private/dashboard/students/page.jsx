import { Suspense } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { CardSkeleton } from "@/components/skeletons";
import { TableError } from "./components/TableError";
import { getClients } from "@/actions/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default async function StudentsPage() {
  try {
    const { clients, pagination } = await getClients();

    if (!clients || !Array.isArray(clients)) {
      throw new Error("Invalid data format received");
    }

    // Format clients data for the table
    const formattedClients = clients.map(client => ({
      id: client._id.toString(),
      name: client.personalInfo?.fullName || "N/A",
      email: client.personalInfo?.email || "N/A",
      phone: client.personalInfo?.phone || "N/A",
      status: client.status || "N/A",
      type: client.academicInfo?.program?.level || "N/A",
      university: client.academicInfo?.university?.name || "N/A",
      program: client.academicInfo?.program?.name || "N/A",
      enrollmentDate: client.academicInfo?.enrollmentDate || null,
      advisor: client.assignedAdvisor ? `${client.assignedAdvisor.firstName} ${client.assignedAdvisor.lastName}` : "Not Assigned"
    }));

    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Students</h2>
            <p className="text-muted-foreground">
              Manage your enrolled students and their progress
            </p>
          </div>
          <Link href="/private/dashboard/students/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Student
            </Button>
          </Link>
        </div>

        <Suspense fallback={<CardSkeleton />}>
          <DataTable 
            data={formattedClients} 
            columns={columns} 
            searchKey="name"
            pagination={pagination}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error in StudentsPage:", error);
    return (
      <div className="container mx-auto py-10">
        <TableError error={error} />
      </div>
    );
  }
}