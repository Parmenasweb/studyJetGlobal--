import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { 
  Users, 
  GraduationCap, 
  FileText, 
  DollarSign,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  CardSkeleton, 
  ChartSkeleton 
} from "@/components/skeletons";
import { OverviewChart } from "./components/charts/OverviewChart";
import { getDashboardData } from "./actions/dashboard";

// Card icons mapping
const cardIcons = {
  students: <Users className="h-4 w-4" />,
  documents: <FileText className="h-4 w-4" />,
  revenue: <DollarSign className="h-4 w-4" />,
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");

  const { cardData, revenueData, statistics } = await getDashboardData();

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 ml-[6%]">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Your business performance overview
          </p>
        </div>
      </div>

      <Suspense 
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, i) => (
            <Card key={i} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">{card.title}</p>
                <div className="rounded-full p-2 bg-primary/10">
                  {cardIcons[card.type]}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {card.type === 'revenue' 
                      ? new Intl.NumberFormat('en-US', { 
                          style: 'currency', 
                          currency: 'USD',
                          maximumFractionDigits: 0
                        }).format(card.value)
                      : card.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Suspense fallback={<ChartSkeleton className="col-span-4" />}>
          <OverviewChart data={revenueData} />
        </Suspense>

        <Card className="col-span-3 p-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Statistics Overview</h3>
            <p className="text-sm text-muted-foreground">
              Key metrics and performance indicators
            </p>
          </div>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Active Students</p>
                <p className="text-2xl font-bold">{statistics.activeClients}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Potential Leads</p>
                <p className="text-2xl font-bold">{statistics.leadClients}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Documents</p>
                <p className="text-2xl font-bold">{statistics.totalDocuments}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Commission</p>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 0
                  }).format(statistics.totalCommission)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
