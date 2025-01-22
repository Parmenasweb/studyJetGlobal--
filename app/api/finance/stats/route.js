import { NextResponse } from "next/server";

import Transaction from "@/models/Transaction";
import { startOfMonth, endOfMonth, subMonths, isValid } from "date-fns";
import connectDB from "@/lib/db";

export async function GET(request) {
  try {
    await connectDB();

    // Get date range from query params or default to current month
    const { searchParams } = new URL(request.url);
    let startDate = searchParams.get("startDate")
      ? new Date(searchParams.get("startDate"))
      : startOfMonth(new Date());
    let endDate = searchParams.get("endDate")
      ? new Date(searchParams.get("endDate"))
      : endOfMonth(new Date());

    // Validate dates
    if (!isValid(startDate) || !isValid(endDate)) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Ensure startDate is before endDate
    if (startDate > endDate) {
      [startDate, endDate] = [endDate, startDate];
    }

    try {
      // Get current period stats
      const currentStats = await Transaction.getFinancialStats(startDate, endDate);

      // Get previous period stats for comparison
      const previousStartDate = startOfMonth(subMonths(startDate, 1));
      const previousEndDate = endOfMonth(subMonths(endDate, 1));
      const previousStats = await Transaction.getFinancialStats(
        previousStartDate,
        previousEndDate
      );

      // Calculate growth percentages with safety checks
      const revenueGrowth = previousStats.totalRevenue
        ? ((currentStats.totalRevenue - previousStats.totalRevenue) / previousStats.totalRevenue) * 100
        : 0;

      const currentProfit = currentStats.totalRevenue - currentStats.totalExpenses;
      const previousProfit = previousStats.totalRevenue - previousStats.totalExpenses;
      const profitGrowth = previousProfit
        ? ((currentProfit - previousProfit) / Math.abs(previousProfit)) * 100
        : 0;

      const expenseReduction = previousStats.totalExpenses
        ? ((previousStats.totalExpenses - currentStats.totalExpenses) / previousStats.totalExpenses) * 100
        : 0;

      // Get revenue data for chart
      const currentYear = new Date().getFullYear();
      const monthlyData = await Transaction.getMonthlyData(currentYear);

      // Format the response
      const response = {
        totalRevenue: currentStats.totalRevenue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        revenueGrowth: Number(revenueGrowth.toFixed(1)),
        netProfit: currentProfit.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        profitGrowth: Number(profitGrowth.toFixed(1)),
        pendingPayouts: currentStats.pendingAmount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        pendingPayoutsCount: currentStats.pendingCount,
        totalExpenses: currentStats.totalExpenses.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        expenseReduction: Number(expenseReduction.toFixed(1)),
        revenueData: monthlyData.map(month => ({
          name: new Date(0, month._id - 1).toLocaleString('default', { month: 'short' }),
          revenue: month.revenue || 0,
          expenses: month.expenses || 0,
        })),
      };

      return NextResponse.json(response);
    } catch (error) {
      console.error("Error calculating finance stats:", error);
      return NextResponse.json(
        { error: "Failed to calculate finance statistics" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in finance stats API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 