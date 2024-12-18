export const mockFinanceData = {
  _id: "finance-2024",
  fiscalYear: 2024,
  period: "MONTHLY",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  
  // Summary
  totalRevenue: 450000,
  totalExpenses: 275000,
  netProfit: 175000,
  
  // Transactions
  transactions: [
    {
      id: "t1",
      type: "INCOME",
      category: "TUITION",
      amount: 25000,
      description: "Spring semester tuition payments",
      date: "2024-01-15",
      paymentMethod: "BANK_TRANSFER",
      status: "COMPLETED",
      reference: "TUI-2024-001"
    },
    {
      id: "t2",
      type: "EXPENSE",
      category: "SALARIES",
      amount: 15000,
      description: "Staff salaries for January",
      date: "2024-01-31",
      paymentMethod: "BANK_TRANSFER",
      status: "COMPLETED",
      reference: "SAL-2024-001"
    }
  ],
  
  // Student Payments
  studentPayments: [
    {
      id: "sp1",
      studentId: "student1",
      amount: 5000,
      type: "TUITION",
      status: "PAID",
      dueDate: "2024-01-15",
      paidDate: "2024-01-14",
      paymentMethod: "CREDIT_CARD",
      reference: "PAY-2024-001",
      notes: "First installment"
    },
    {
      id: "sp2",
      studentId: "student2",
      amount: 4500,
      type: "PROGRAM_FEE",
      status: "PENDING",
      dueDate: "2024-02-01",
      paymentMethod: "BANK_TRANSFER",
      reference: "PAY-2024-002",
      notes: "Program registration fee"
    }
  ],
  
  // Budgets
  budgets: [
    {
      id: "b1",
      category: "Marketing",
      amount: 50000,
      period: "YEARLY",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      actual: 12000,
      variance: 38000
    },
    {
      id: "b2",
      category: "Operations",
      amount: 120000,
      period: "YEARLY",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      actual: 28000,
      variance: 92000
    }
  ],
  
  // Analytics
  revenueByCategory: {
    "Tuition": 300000,
    "Application Fees": 50000,
    "Program Fees": 100000
  },
  
  expensesByCategory: {
    "Salaries": 150000,
    "Marketing": 45000,
    "Operations": 80000
  },
  
  monthlyRevenue: {
    "2024-01": 75000,
    "2024-02": 85000,
    "2024-03": 95000,
    "2024-04": 80000,
    "2024-05": 70000,
    "2024-06": 45000
  },
  
  monthlyExpenses: {
    "2024-01": 45000,
    "2024-02": 48000,
    "2024-03": 52000,
    "2024-04": 47000,
    "2024-05": 43000,
    "2024-06": 40000
  },
  
  // Performance Metrics
  profitMargin: 38.89,
  revenuePerStudent: 4500,
  operationalCosts: 35000,
  
  // Forecasting
  revenueForecast: {
    "2024-07": 85000,
    "2024-08": 90000,
    "2024-09": 100000,
    "2024-10": 95000,
    "2024-11": 88000,
    "2024-12": 82000
  },
  
  expenseForecast: {
    "2024-07": 50000,
    "2024-08": 52000,
    "2024-09": 55000,
    "2024-10": 53000,
    "2024-11": 51000,
    "2024-12": 49000
  },
  
  // Metadata
  status: "ACTIVE",
  notes: "Fiscal year 2024 financial records",
  lastUpdated: "2024-03-15T12:00:00Z",
  updatedBy: "admin"
}; 