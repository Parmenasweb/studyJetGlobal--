import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CommissionsTable } from "./components/commissions-table";
import { LeadsTable } from "./components/leads-table";
import { formatCurrency } from "@/lib/utils";

async function getAgent(id) {
  await dbConnect();
  const agent = await Agent.findById(id)
    .populate({
      path: "leads",
      select: "studentName program university status createdAt",
    })
    .lean();

  if (!agent) {
    notFound();
  }

  return {
    ...agent,
    _id: agent._id.toString(),
    leads: agent.leads.map((lead) => ({
      ...lead,
      _id: lead._id.toString(),
    })),
    commissions: agent.commissions.map((commission) => ({
      ...commission,
      _id: commission._id.toString(),
    })),
  };
}

function AgentStats({ agent }) {
  const totalCommissions = agent.commissions.reduce(
    (sum, commission) => sum + commission.amount,
    0
  );
  const paidCommissions = agent.commissions
    .filter((commission) => commission.status === "paid")
    .reduce((sum, commission) => sum + commission.amount, 0);
  const pendingCommissions = agent.commissions
    .filter((commission) => commission.status === "pending")
    .reduce((sum, commission) => sum + commission.amount, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Badge variant="outline">{agent.leads.length}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{agent.leads.length}</div>
          <p className="text-xs text-muted-foreground">
            {agent.leads.filter((lead) => lead.status === "active").length}{" "}
            active
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Commissions
          </CardTitle>
          <Badge variant="outline">{agent.commissions.length}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalCommissions, "USD")}
          </div>
          <p className="text-xs text-muted-foreground">
            {agent.commissions.length} total transactions
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Paid Commissions
          </CardTitle>
          <Badge variant="success">Paid</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(paidCommissions, "USD")}
          </div>
          <p className="text-xs text-muted-foreground">
            {
              agent.commissions.filter(
                (commission) => commission.status === "paid"
              ).length
            }{" "}
            paid transactions
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Commissions
          </CardTitle>
          <Badge variant="warning">Pending</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(pendingCommissions, "USD")}
          </div>
          <p className="text-xs text-muted-foreground">
            {
              agent.commissions.filter(
                (commission) => commission.status === "pending"
              ).length
            }{" "}
            pending transactions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function AgentInfo({ agent }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">Contact Details</h3>
          <div className="mt-2 space-y-2">
            <p>
              <span className="text-muted-foreground">Name:</span> {agent.name}
            </p>
            <p>
              <span className="text-muted-foreground">Email:</span>{" "}
              {agent.email}
            </p>
            <p>
              <span className="text-muted-foreground">Phone:</span>{" "}
              {agent.phone}
            </p>
            <p>
              <span className="text-muted-foreground">Country:</span>{" "}
              {agent.country}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Company Details</h3>
          <div className="mt-2 space-y-2">
            <p>
              <span className="text-muted-foreground">Company:</span>{" "}
              {agent.company}
            </p>
            <p>
              <span className="text-muted-foreground">Status:</span>{" "}
              <Badge
                variant={
                  agent.status === "active"
                    ? "success"
                    : agent.status === "inactive"
                    ? "destructive"
                    : "secondary"
                }
              >
                {agent.status}
              </Badge>
            </p>
            <p>
              <span className="text-muted-foreground">Base Commission:</span>{" "}
              {agent.baseCommission}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-[100px]" />
                <Skeleton className="mt-2 h-3 w-[140px]" />
              </CardContent>
            </Card>
          ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-5 w-[150px]" />
                  <div className="space-y-2">
                    {Array(4)
                      .fill(0)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-4 w-[200px]" />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="leads">
        <TabsList>
          <TabsTrigger value="leads">
            <Skeleton className="h-4 w-[100px]" />
          </TabsTrigger>
          <TabsTrigger value="commissions">
            <Skeleton className="h-4 w-[100px]" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="leads" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-[400px] w-full" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default async function AgentPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const agent = await getAgent(params.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Agent Details</h2>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <AgentStats agent={agent} />
        <AgentInfo agent={agent} />
        <Tabs defaultValue="leads">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
          </TabsList>
          <TabsContent value="leads" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <LeadsTable agent={agent} leads={agent.leads} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="commissions" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <CommissionsTable
                  agent={agent}
                  commissions={agent.commissions}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  );
}
