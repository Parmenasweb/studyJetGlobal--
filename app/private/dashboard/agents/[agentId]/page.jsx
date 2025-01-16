import { Suspense } from "react";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import Agent from "@/models/Agent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CommissionsTable } from "./components/commissions-table";
import { LeadsTable } from "./components/leads-table";
import { formatCurrency } from "@/lib/utils";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import { format } from "date-fns";

async function getAgent(id) {
  await connectDB();
  
  const agent = await Agent.findById(id).lean();

  if (!agent) {
    notFound();
  }

  // Serialize the MongoDB documents
  const serializedAgent = {
    ...agent,
    _id: agent._id.toString(),
    createdAt: agent.createdAt?.toISOString(),
    updatedAt: agent.updatedAt?.toISOString(),
    createdBy: agent.createdBy?.toString(),
    updatedBy: agent.updatedBy?.toString(),
    leads: agent.leads?.map((lead) => ({
      ...lead,
      _id: lead._id.toString(),
      clientId: lead.clientId?.toString(),
      createdAt: lead.createdAt?.toISOString(),
      updatedAt: lead.updatedAt?.toISOString(),
      documents: lead.documents?.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
        uploadedAt: doc.uploadedAt?.toISOString()
      }))
    })) || [],
    commissions: agent.commissions?.map((commission) => ({
      ...commission,
      _id: commission._id.toString(),
      leadId: commission.leadId?.toString(),
      createdAt: commission.createdAt?.toISOString(),
      updatedAt: commission.updatedAt?.toISOString(),
      paymentDate: commission.paymentDate?.toISOString()
    })) || [],
    documents: agent.documents?.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      uploadedAt: doc.uploadedAt?.toISOString(),
      expiryDate: doc.expiryDate?.toISOString()
    })) || []
  };

  return serializedAgent;
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
  const successfulLeads = agent.leads.filter(
    (lead) => lead.status === "enrolled"
  ).length;
  const successRate = ((successfulLeads / agent.leads.length) * 100).toFixed(1);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Badge variant="outline">{agent.leads.length}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{agent.leads.length}</div>
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>{successfulLeads} successful • {successRate}% success rate</span>
            <span>{agent.leads.filter((lead) => lead.status === "active").length} active</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
          <Badge variant="outline">{agent.commissions.length}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalCommissions, "USD")}</div>
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>{agent.commissions.length} total transactions</span>
            <span>Average {formatCurrency(totalCommissions / agent.commissions.length || 0, "USD")} per lead</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Commissions</CardTitle>
          <Badge variant="success">{agent.commissions.filter(c => c.status === "paid").length}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(paidCommissions, "USD")}</div>
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>{agent.commissions.filter(c => c.status === "paid").length} paid transactions</span>
            <span>{((paidCommissions / totalCommissions) * 100).toFixed(1)}% of total</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
          <Badge variant="warning">{agent.commissions.filter(c => c.status === "pending").length}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(pendingCommissions, "USD")}</div>
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>{agent.commissions.filter(c => c.status === "pending").length} pending transactions</span>
            <span>{((pendingCommissions / totalCommissions) * 100).toFixed(1)}% of total</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AgentInfo({ agent }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <div className="font-medium">Name</div>
            <div>{agent.name}</div>
          </div>
          <div>
            <div className="font-medium">Email</div>
            <div>{agent.email}</div>
          </div>
          <div>
            <div className="font-medium">Phone</div>
            <div>{agent.phone || "Not provided"}</div>
          </div>
          <div>
            <div className="font-medium">Country</div>
            <div>{agent.country}</div>
          </div>
          <div>
            <div className="font-medium">Address</div>
            <div>{agent.address || "Not provided"}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <div className="font-medium">Company Name</div>
            <div>{agent.company || "Not provided"}</div>
          </div>
          <div>
            <div className="font-medium">Status</div>
            <div>
              <Badge
                variant={
                  agent.status === "active"
                    ? "success"
                    : agent.status === "inactive"
                    ? "secondary"
                    : "destructive"
                }
              >
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </Badge>
            </div>
          </div>
          <div>
            <div className="font-medium">Base Commission</div>
            <div>
              {agent.baseCommission.type === "percentage"
                ? `${agent.baseCommission.value}%`
                : formatCurrency(agent.baseCommission.value, agent.baseCommission.currency || "USD")}
            </div>
          </div>
          <div>
            <div className="font-medium">Joined</div>
            <div>{format(new Date(agent.createdAt), "PPP")}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bank Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <div className="font-medium">Bank Name</div>
            <div>{agent.bankDetails?.bankName || "Not provided"}</div>
          </div>
          <div>
            <div className="font-medium">Account Name</div>
            <div>{agent.bankDetails?.accountName || "Not provided"}</div>
          </div>
          <div>
            <div className="font-medium">Account Number</div>
            <div>{agent.bankDetails?.accountNumber || "Not provided"}</div>
          </div>
          <div>
            <div className="font-medium">SWIFT Code</div>
            <div>{agent.bankDetails?.swiftCode || "Not provided"}</div>
          </div>
          <div>
            <div className="font-medium">IBAN</div>
            <div>{agent.bankDetails?.iban || "Not provided"}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function AgentPage({ params }) {
  const session = await auth();
  if (!session) {
    notFound();
  }

  const agent = await getAgent(params.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Agent Details</h2>
        <Badge
          variant={
            agent.status === "active"
              ? "success"
              : agent.status === "inactive"
              ? "secondary"
              : "destructive"
          }
          className="text-sm"
        >
          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </Badge>
      </div>

      <AgentStats agent={agent} />
      <AgentInfo agent={agent} />

      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>
        <TabsContent value="leads" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[400px]" />}>
            <LeadsTable agent={agent} leads={agent.leads} />
          </Suspense>
        </TabsContent>
        <TabsContent value="commissions" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[400px]" />}>
            <CommissionsTable agent={agent} commissions={agent.commissions} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
