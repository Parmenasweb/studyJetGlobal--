"use server";

import { revalidatePath } from "next/cache";
import Finance from "@/models/Finance";
import { connectToDatabase } from "@/lib/db";

export async function createFinanceRecord(data) {
  try {
    await connectToDatabase();
    const finance = new Finance(data);
    await finance.save();
    revalidatePath("/private/dashboard/finances");
    return { success: true, data: finance };
  } catch (error) {
    console.error("Error creating finance record:", error);
    return { success: false, error: error.message };
  }
}

export async function getFinanceRecord(id) {
  try {
    await connectToDatabase();
    const finance = await Finance.findById(id);
    if (!finance) {
      throw new Error("Finance record not found");
    }
    return { success: true, data: finance };
  } catch (error) {
    console.error("Error getting finance record:", error);
    return { success: false, error: error.message };
  }
}

export async function updateFinanceRecord(id, data) {
  try {
    await connectToDatabase();
    const finance = await Finance.findByIdAndUpdate(id, data, { new: true });
    if (!finance) {
      throw new Error("Finance record not found");
    }
    revalidatePath("/private/dashboard/finances");
    return { success: true, data: finance };
  } catch (error) {
    console.error("Error updating finance record:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteFinanceRecord(id) {
  try {
    await connectToDatabase();
    const finance = await Finance.findByIdAndDelete(id);
    if (!finance) {
      throw new Error("Finance record not found");
    }
    revalidatePath("/private/dashboard/finances");
    return { success: true };
  } catch (error) {
    console.error("Error deleting finance record:", error);
    return { success: false, error: error.message };
  }
}

export async function addTransaction(id, transaction) {
  try {
    await connectToDatabase();
    const finance = await Finance.findById(id);
    if (!finance) {
      throw new Error("Finance record not found");
    }
    await finance.addTransaction(transaction);
    revalidatePath("/private/dashboard/finances");
    return { success: true, data: finance };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return { success: false, error: error.message };
  }
}

export async function addStudentPayment(id, payment) {
  try {
    await connectToDatabase();
    const finance = await Finance.findById(id);
    if (!finance) {
      throw new Error("Finance record not found");
    }
    await finance.addStudentPayment(payment);
    revalidatePath("/private/dashboard/finances");
    return { success: true, data: finance };
  } catch (error) {
    console.error("Error adding student payment:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBudget(id, budgetId, actual) {
  try {
    await connectToDatabase();
    const finance = await Finance.findById(id);
    if (!finance) {
      throw new Error("Finance record not found");
    }
    await finance.updateBudgetActuals(budgetId, actual);
    revalidatePath("/private/dashboard/finances");
    return { success: true, data: finance };
  } catch (error) {
    console.error("Error updating budget:", error);
    return { success: false, error: error.message };
  }
}

export async function getFinanceAnalytics(id) {
  try {
    await connectToDatabase();
    const finance = await Finance.findById(id);
    if (!finance) {
      throw new Error("Finance record not found");
    }
    
    const analytics = {
      totalRevenue: finance.totalRevenue,
      totalExpenses: finance.totalExpenses,
      netProfit: finance.netProfit,
      profitMargin: finance.profitMargin,
      revenuePerStudent: finance.revenuePerStudent,
      operationalCosts: finance.operationalCosts,
      cashPosition: finance.cashPosition,
      revenueByCategory: Object.fromEntries(finance.revenueByCategory),
      expensesByCategory: Object.fromEntries(finance.expensesByCategory),
      monthlyRevenue: Object.fromEntries(finance.monthlyRevenue),
      monthlyExpenses: Object.fromEntries(finance.monthlyExpenses),
    };
    
    return { success: true, data: analytics };
  } catch (error) {
    console.error("Error getting finance analytics:", error);
    return { success: false, error: error.message };
  }
}

export async function getFinanceForecast(id) {
  try {
    await connectToDatabase();
    const finance = await Finance.findById(id);
    if (!finance) {
      throw new Error("Finance record not found");
    }
    
    const forecast = {
      revenue: Object.fromEntries(finance.revenueForecast),
      expenses: Object.fromEntries(finance.expenseForecast),
    };
    
    return { success: true, data: forecast };
  } catch (error) {
    console.error("Error getting finance forecast:", error);
    return { success: false, error: error.message };
  }
} 