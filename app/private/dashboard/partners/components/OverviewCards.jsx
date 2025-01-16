"use client";

import { getClient } from "@/actions/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, MapPin, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

export function OverviewCards({ partners }) {
  const [totalCommission, setTotalCommission] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCommissions() {
      try {
        let total = 0;
        
        // Iterate through all partners
        for (const partner of partners) {
          // Check if partner has referred students
          if (partner.referredStudents && partner.referredStudents.length > 0) {
            // Fetch commission for each referred student from Client model
            for (const referral of partner.referredStudents) {
              try {
                const clientData = await getClient(referral.student);
                if (clientData && clientData.commission) {
                  total += clientData.commission;
                }
              } catch (error) {
                console.error(`Error fetching client commission: ${error}`);
              }
            }
          }
        }
        
        setTotalCommission(total);
      } catch (error) {
        console.error("Error calculating total commission:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCommissions();
  }, [partners]);

  // Calculate other statistics
  const stats = {
    total: partners.length,
    universities: partners.filter((p) => p.type === "university").length,
    agencies: partners.filter((p) => p.type === "agency").length,
    countries: new Set(partners.map((p) => p.address?.country)).size,
    totalReferrals: partners.reduce(
      (sum, p) => sum + (p.referredStudents?.length || 0),
      0
    ),
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            {stats.universities} Universities, {stats.agencies} Agencies
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Universities</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.universities}</div>
          <p className="text-xs text-muted-foreground">
            {(stats.universities / stats.total * 100).toFixed(1)}% of partners
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalReferrals}</div>
          <p className="text-xs text-muted-foreground">
            {(stats.totalReferrals / stats.total || 0).toFixed(1)} avg. per partner
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
            ${isLoading ? "..." : totalCommission.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            ${isLoading ? "..." : ((totalCommission / stats.totalReferrals) || 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} avg. per referral
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 