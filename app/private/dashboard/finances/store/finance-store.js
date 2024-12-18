import { create } from 'zustand';
import { mockFinanceData } from '../data/mock-finances';

export const useFinanceStore = create((set) => ({
  finance: mockFinanceData,
  selectedPeriod: {
    start: new Date("2024-01-01"),
    end: new Date("2024-12-31"),
  },
  isLoading: false,
  error: null,

  // Actions
  setFinance: (finance) => set({ finance }),
  setSelectedPeriod: (period) => set({ selectedPeriod: period }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Transactions
  addTransaction: (transaction) =>
    set((state) => ({
      finance: {
        ...state.finance,
        transactions: [...state.finance.transactions, transaction],
        totalRevenue:
          transaction.type === "INCOME"
            ? state.finance.totalRevenue + transaction.amount
            : state.finance.totalRevenue,
        totalExpenses:
          transaction.type === "EXPENSE"
            ? state.finance.totalExpenses + transaction.amount
            : state.finance.totalExpenses,
      },
    })),

  updateTransaction: (id, updatedTransaction) =>
    set((state) => ({
      finance: {
        ...state.finance,
        transactions: state.finance.transactions.map((t) =>
          t.id === id ? { ...t, ...updatedTransaction } : t
        ),
      },
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      finance: {
        ...state.finance,
        transactions: state.finance.transactions.filter((t) => t.id !== id),
      },
    })),

  // Student Payments
  addStudentPayment: (payment) =>
    set((state) => ({
      finance: {
        ...state.finance,
        studentPayments: [...state.finance.studentPayments, payment],
        totalRevenue:
          payment.status === "PAID"
            ? state.finance.totalRevenue + payment.amount
            : state.finance.totalRevenue,
      },
    })),

  updateStudentPayment: (id, updatedPayment) =>
    set((state) => ({
      finance: {
        ...state.finance,
        studentPayments: state.finance.studentPayments.map((p) =>
          p.id === id ? { ...p, ...updatedPayment } : p
        ),
      },
    })),

  deleteStudentPayment: (id) =>
    set((state) => ({
      finance: {
        ...state.finance,
        studentPayments: state.finance.studentPayments.filter((p) => p.id !== id),
      },
    })),

  // Budgets
  addBudget: (budget) =>
    set((state) => ({
      finance: {
        ...state.finance,
        budgets: [...state.finance.budgets, budget],
      },
    })),

  updateBudget: (id, updatedBudget) =>
    set((state) => ({
      finance: {
        ...state.finance,
        budgets: state.finance.budgets.map((b) =>
          b.id === id ? { ...b, ...updatedBudget } : b
        ),
      },
    })),

  deleteBudget: (id) =>
    set((state) => ({
      finance: {
        ...state.finance,
        budgets: state.finance.budgets.filter((b) => b.id !== id),
      },
    })),

  // Analytics
  updateAnalytics: (analytics) =>
    set((state) => ({
      finance: {
        ...state.finance,
        revenueByCategory: analytics.revenueByCategory || state.finance.revenueByCategory,
        expensesByCategory: analytics.expensesByCategory || state.finance.expensesByCategory,
        monthlyRevenue: analytics.monthlyRevenue || state.finance.monthlyRevenue,
        monthlyExpenses: analytics.monthlyExpenses || state.finance.monthlyExpenses,
      },
    })),

  // Forecasting
  updateForecast: (forecast) =>
    set((state) => ({
      finance: {
        ...state.finance,
        revenueForecast: forecast.revenue || state.finance.revenueForecast,
        expenseForecast: forecast.expenses || state.finance.expenseForecast,
      },
    })),

  // Reset
  resetFinance: () => set({ finance: mockFinanceData }),
})); 