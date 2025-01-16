import { Suspense } from "react";
import { getPartners } from "@/actions/partner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable } from "./components/DataTable";
import { OverviewCards } from "./components/OverviewCards";
import { PartnerTypeFilter } from "./components/PartnerTypeFilter";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function serializeData(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default async function PartnersPage({ searchParams }) {
  const {
    page = 1,
    limit = 10,
    type,
    status,
    search,
  } = searchParams;

  const { partners, pagination } = await getPartners({
    page: Number(page),
    limit: Number(limit),
    type,
    status,
    search,
  });

  // Serialize the data to remove Mongoose-specific properties
  const serializedPartners = serializeData(partners);
  const serializedPagination = serializeData(pagination);

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partners</h1>
          <p className="text-muted-foreground">
            Manage your university and agency partners
          </p>
        </div>
        <Button asChild>
          <Link href="/private/dashboard/partners/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Partner
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading overview...</div>}>
        <OverviewCards partners={serializedPartners} />
      </Suspense>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <PartnerTypeFilter />
        </div>

        <Suspense fallback={<div>Loading partners...</div>}>
          <DataTable data={serializedPartners} pageCount={serializedPagination.totalPages} />
        </Suspense>
      </div>
    </div>
  );
}
