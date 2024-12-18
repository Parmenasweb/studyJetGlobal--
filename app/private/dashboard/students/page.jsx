import { Suspense } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { CardSkeleton } from "@/components/skeletons";
import { TableError } from "./components/TableError";
import { mockClients } from "./data/mock-clients";

export default async function StudentsPage() {
  try {
    // Add logging to help debug
    console.log("Fetching mock clients data");
    const clients = mockClients;
    console.log("Fetched clients:", clients);

    if (!clients || !Array.isArray(clients)) {
      throw new Error("Invalid data format received");
    }

    return (
      <div className="container mx-auto py-10">
        <Suspense fallback={<CardSkeleton />}>
          <DataTable data={clients} columns={columns} />
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