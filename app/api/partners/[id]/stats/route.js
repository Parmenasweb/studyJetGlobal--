import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Partner from "@/models/Partner";
import Client from "@/models/Client";

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const partner = await Partner.findById(params.id);
    if (!partner) {
      return NextResponse.json(
        { error: "Partner not found" },
        { status: 404 }
      );
    }

    // Get all referred students
    const referredStudents = partner.referredStudents || [];
    
    // Calculate total and pending commissions
    let totalCommission = 0;
    let pendingCommission = 0;

    // Fetch all client data in parallel for better performance
    const clientPromises = referredStudents.map(referral => 
      Client.findById(referral.student)
    );
    const clients = await Promise.all(clientPromises);

    // Calculate commissions
    clients.forEach((client, index) => {
      if (client && client.commission) {
        totalCommission += client.commission;
        
        // Check if commission is pending (not marked as paid in referredStudents)
        if (!referredStudents[index].commission?.paid) {
          pendingCommission += client.commission;
        }
      }
    });

    // Calculate other statistics
    const activeStudents = referredStudents.filter(
      s => s.status === "enrolled"
    ).length;

    // Calculate monthly stats
    const monthlyStats = [];
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const monthlyStudents = referredStudents.filter(s => {
        const referralDate = new Date(s.referralDate);
        return referralDate >= month && referralDate <= monthEnd;
      });

      const monthlyCommission = monthlyStudents.reduce((sum, student) => {
        const client = clients.find(c => c?._id.toString() === student.student.toString());
        return sum + (client?.commission || 0);
      }, 0);

      monthlyStats.push({
        month: month.toISOString(),
        newStudents: monthlyStudents.length,
        commission: monthlyCommission
      });
    }

    // Calculate status distribution
    const statusDistribution = referredStudents.reduce((acc, student) => {
      acc[student.status] = (acc[student.status] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      totalStudents: referredStudents.length,
      activeStudents,
      totalCommission,
      pendingCommission,
      monthlyStats,
      statusDistribution
    });

  } catch (error) {
    console.error("Error in GET /api/partners/[id]/stats:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch partner statistics" },
      { status: 500 }
    );
  }
} 