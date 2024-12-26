import { create } from "zustand";
import {
  getFinanceAnalytics,
  getFinanceForecast,
  addTransaction,
  addStudentPayment,
  addBudget,
  updateStudentPayment,
  deleteStudentPayment,
  deleteBudget,
  updateBudget,
} from "@/actions/finance";

const initialState = {
  finance: {
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    profitMargin: 0,
    revenuePerStudent: 0,
    operationalCosts: 0,
    cashPosition: 0,
    revenueByCategory: {},
    expensesByCategory: {},
    monthlyRevenue: {},
    monthlyExpenses: {},
    revenueForecast: {},
    expenseForecast: {},
    transactions: [],
    studentPayments: [],
    budgets: [],
  },
  selectedPeriod: {
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  },
  isLoading: false,
  error: null,
};

export const useFinanceStore = create((set, get) => ({
  ...initialState,

  setSelectedPeriod: (period) => {
    set({ selectedPeriod: period });
  },

  fetchFinanceData: async () => {
    try {
      set({ isLoading: true, error: null });

      // Get current fiscal year
      const currentYear = new Date().getFullYear();
      const fiscalYearId = `finance-${currentYear}`;

      const [analyticsResponse, forecastResponse] = await Promise.all([
        getFinanceAnalytics(fiscalYearId),
        getFinanceForecast(fiscalYearId),
      ]);

      if (!analyticsResponse.success || !forecastResponse.success) {
        throw new Error(analyticsResponse.error || forecastResponse.error);
      }

      set({
        finance: {
          ...initialState.finance,
          ...analyticsResponse.data,
          revenueForecast: forecastResponse.data.revenue,
          expenseForecast: forecastResponse.data.expenses,
        },
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching finance data:", error);
      set({
        error: error.message || "Failed to fetch finance data",
        isLoading: false,
      });
    }
  },

  addTransaction: async (transaction) => {
    try {
      set({ isLoading: true, error: null });
      const currentYear = new Date().getFullYear();
      const fiscalYearId = `finance-${currentYear}`;
      
      const response = await addTransaction(fiscalYearId, transaction);
      if (!response.success) {
        throw new Error(response.error);
      }

      await get().fetchFinanceData();
    } catch (error) {
      console.error("Error adding transaction:", error);
      set({
        error: error.message || "Failed to add transaction",
        isLoading: false,
      });
    }
  },

  addStudentPayment: async (payment) => {
    try {
      set({ isLoading: true, error: null });
      const currentYear = new Date().getFullYear();
      const fiscalYearId = `finance-${currentYear}`;
      
      const response = await addStudentPayment(fiscalYearId, payment);
      if (!response.success) {
        throw new Error(response.error);
      }

      await get().fetchFinanceData();
    } catch (error) {
      console.error("Error adding student payment:", error);
      set({
        error: error.message || "Failed to add student payment",
        isLoading: false,
      });
    }
  },

  addBudget: async (budget) => {
    try {
      set({ isLoading: true, error: null });
      const currentYear = new Date().getFullYear();
      const fiscalYearId = `finance-${currentYear}`;
      
      const response = await addBudget(fiscalYearId, budget);
      if (!response.success) {
        throw new Error(response.error);
      }

      await get().fetchFinanceData();
    } catch (error) {
      console.error("Error adding budget:", error);
      set({
        error: error.message || "Failed to add budget",
        isLoading: false,
      });
    }
  },

  updateStudentPayment: async (paymentId, data) => {
    try {
      set({ isLoading: true, error: null });
      const currentYear = new Date().getFullYear();
      const fiscalYearId = `finance-${currentYear}`;
      
      const response = await updateStudentPayment(fiscalYearId, paymentId, data);
      if (!response.success) {
        throw new Error(response.error);
      }

      await get().fetchFinanceData();
    } catch (error) {
      console.error("Error updating student payment:", error);
      set({
        error: error.message || "Failed to update student payment",
        isLoading: false,
      });
    }
  },

  deleteStudentPayment: async (paymentId) => {
    try {
      set({ isLoading: true, error: null });
      const currentYear = new Date().getFullYear();
      const fiscalYearId = `finance-${currentYear}`;
      
      const response = await deleteStudentPayment(fiscalYearId, paymentId);
      if (!response.success) {
        throw new Error(response.error);
      }

      await get().fetchFinanceData();
    } catch (error) {
      console.error("Error deleting student payment:", error);
      set({
        error: error.message || "Failed to delete student payment",
        isLoading: false,
      });
    }
  },

  deleteBudget: async (budgetId) => {
    try {
      set({ isLoading: true, error: null });
      const currentYear = new Date().getFullYear();
      const fiscalYearId = `finance-${currentYear}`;
      
      const response = await deleteBudget(fiscalYearId, budgetId);
      if (!response.success) {
        throw new Error(response.error);
      }

      await get().fetchFinanceData();
    } catch (error) {
      console.error("Error deleting budget:", error);
      set({
        error: error.message || "Failed to delete budget",
        isLoading: false,
      });
    }
  },

  updateBudget: async (budgetId, actual) => {
    try {
      set({ isLoading: true, error: null });
      const currentYear = new Date().getFullYear();
      const fiscalYearId = `finance-${currentYear}`;
      
      const response = await updateBudget(fiscalYearId, budgetId, actual);
      if (!response.success) {
        throw new Error(response.error);
      }

      await get().fetchFinanceData();
    } catch (error) {
      console.error("Error updating budget:", error);
      set({
        error: error.message || "Failed to update budget",
        isLoading: false,
      });
    }
  },

  resetFinanceStore: () => {
    set(initialState);
  },
})); 