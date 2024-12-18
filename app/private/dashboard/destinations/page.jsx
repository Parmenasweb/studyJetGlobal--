import { Suspense } from "react";
import { DataTable } from "../students/components/data-table";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CardSkeleton } from "@/components/skeletons";
import { TableError } from "../students/components/TableError";
import { mockDestinations } from "./data/mock-destinations";

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  try {
    // Using mock data instead of fetching from database
    const destinations = mockDestinations;

    return (
      <div className="container mx-auto py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Destinations</h2>
            <p className="text-muted-foreground">
              Manage study abroad destinations and their details
            </p>
          </div>
          <Button asChild>
            <Link href="/private/dashboard/destinations/new">
              <Plus className="mr-2 h-4 w-4" /> Add Destination
            </Link>
          </Button>
        </div>

        <Suspense fallback={<CardSkeleton />}>
          <DataTable data={destinations} columns={columns} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error in DestinationsPage:", error);
    return (
      <div className="container mx-auto py-10">
        <TableError error={error} />
      </div>
    );
  }
}
