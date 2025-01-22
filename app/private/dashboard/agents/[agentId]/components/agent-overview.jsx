"use client";

import { format } from "date-fns";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Wallet,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Commission type badge variants
const commissionVariants = {
  percentage: {
    variant: "default",
    label: "Percentage",
  },
  fixed: {
    variant: "outline",
    label: "Fixed Amount",
  },
};

export function AgentOverview({ agent }) {
  return (
    <div className="grid gap-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Email:</span>
              <span>{agent.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Phone:</span>
              <span>{agent.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Country:</span>
              <span>{agent.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Company:</span>
              <span>{agent.company || "N/A"}</span>
            </div>
          </div>
          {agent.address && (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
              <div>
                <span className="font-medium">Address:</span>
                <p className="mt-1 text-muted-foreground">{agent.address}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Commission Details */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Badge variant={commissionVariants[agent.baseCommission.type].variant}>
                {commissionVariants[agent.baseCommission.type].label}
              </Badge>
              <div className="mt-2">
                <span className="font-medium">Value:</span>{" "}
                {agent.baseCommission.type === "percentage" ? (
                  <span>{agent.baseCommission.value}%</span>
                ) : (
                  <span>
                    {agent.baseCommission.value} {agent.baseCommission.currency}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="font-medium">Bank Name:</span>
              <p className="mt-1 text-muted-foreground">
                {agent.bankDetails?.bankName || "N/A"}
              </p>
            </div>
            <div>
              <span className="font-medium">Account Number:</span>
              <p className="mt-1 text-muted-foreground">
                {agent.bankDetails?.accountNumber || "N/A"}
              </p>
            </div>
            <div>
              <span className="font-medium">Account Name:</span>
              <p className="mt-1 text-muted-foreground">
                {agent.bankDetails?.accountName || "N/A"}
              </p>
            </div>
            <div>
              <span className="font-medium">SWIFT Code:</span>
              <p className="mt-1 text-muted-foreground">
                {agent.bankDetails?.swiftCode || "N/A"}
              </p>
            </div>
            <div>
              <span className="font-medium">IBAN:</span>
              <p className="mt-1 text-muted-foreground">
                {agent.bankDetails?.iban || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-background rounded-lg border">
              <div className="text-sm font-medium text-muted-foreground mb-2">Total Leads</div>
              <div className="text-2xl font-bold">{agent.performance?.totalLeads || 0}</div>
            </div>
            <div className="p-4 bg-background rounded-lg border">
              <div className="text-sm font-medium text-muted-foreground mb-2">Successful Applications</div>
              <div className="text-2xl font-bold">{agent.performance?.successfulApplications || 0}</div>
            </div>
            <div className="p-4 bg-background rounded-lg border">
              <div className="text-sm font-medium text-muted-foreground mb-2">Total Commission Earned</div>
              <div className="text-2xl font-bold">${agent.performance?.totalCommissionEarned || 0}</div>
            </div>
            <div className="p-4 bg-background rounded-lg border">
              <div className="text-sm font-medium text-muted-foreground mb-2">Last Activity</div>
              <div className="text-2xl font-bold">
                {agent.performance?.lastActivityDate
                  ? format(new Date(agent.performance.lastActivityDate), "MMM d, yyyy")
                  : "N/A"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {agent.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{agent.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 