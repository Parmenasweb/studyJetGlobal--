import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, GraduationCap, FileText, DollarSign } from "lucide-react";

export function OverviewCards({ clients }) {
  // Calculate statistics
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.status === "active").length;
  const totalDocuments = clients.reduce((sum, client) => sum + (client.documents?.length || 0), 0);
  const totalCommission = clients.reduce((sum, client) => sum + (client.commission || 0), 0);

  // Calculate program statistics
  const programStats = clients.reduce((acc, client) => {
    const level = client.academicInfo.program.level;
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClients}</div>
          <p className="text-xs text-muted-foreground">
            {activeClients} active clients
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Program Levels</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Object.keys(programStats).length}
          </div>
          <div className="text-xs text-muted-foreground">
            {Object.entries(programStats).map(([level, count]) => (
              <div key={level} className="capitalize">
                {level}: {count}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDocuments}</div>
          <p className="text-xs text-muted-foreground">
            Across all clients
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
            ${totalCommission.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Average: ${(totalCommission / totalClients || 0).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 