import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["INCOME", "EXPENSE"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ["CASH", "BANK_TRANSFER", "CREDIT_CARD", "OTHER"],
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
    default: "COMPLETED",
  },
  reference: String,
  attachments: [String],
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
});

const studentPaymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["TUITION", "APPLICATION_FEE", "PROGRAM_FEE", "OTHER"],
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "PAID", "OVERDUE", "REFUNDED"],
    default: "PENDING",
  },
  dueDate: Date,
  paidDate: Date,
  paymentMethod: {
    type: String,
    enum: ["CASH", "BANK_TRANSFER", "CREDIT_CARD", "OTHER"],
  },
  reference: String,
  notes: String,
});

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    enum: ["MONTHLY", "QUARTERLY", "YEARLY"],
    required: true,
  },
  startDate: Date,
  endDate: Date,
  actual: {
    type: Number,
    default: 0,
  },
  variance: {
    type: Number,
    default: 0,
  },
});

const financeSchema = new mongoose.Schema(
  {
    // General Information
    fiscalYear: {
      type: Number,
      required: true,
    },
    period: {
      type: String,
      enum: ["MONTHLY", "QUARTERLY", "YEARLY"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },

    // Summary
    totalRevenue: {
      type: Number,
      default: 0,
    },
    totalExpenses: {
      type: Number,
      default: 0,
    },
    netProfit: {
      type: Number,
      default: 0,
    },
    
    // Detailed Records
    transactions: [transactionSchema],
    studentPayments: [studentPaymentSchema],
    budgets: [budgetSchema],

    // Analytics
    revenueByCategory: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    expensesByCategory: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    monthlyRevenue: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    monthlyExpenses: {
      type: Map,
      of: Number,
      default: new Map(),
    },

    // Performance Metrics
    profitMargin: {
      type: Number,
      default: 0,
    },
    revenuePerStudent: {
      type: Number,
      default: 0,
    },
    operationalCosts: {
      type: Number,
      default: 0,
    },

    // Forecasting
    revenueForecast: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    expenseForecast: {
      type: Map,
      of: Number,
      default: new Map(),
    },

    // Metadata
    status: {
      type: String,
      enum: ["DRAFT", "ACTIVE", "CLOSED"],
      default: "DRAFT",
    },
    notes: String,
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for calculating current cash position
financeSchema.virtual("cashPosition").get(function() {
  return this.totalRevenue - this.totalExpenses;
});

// Pre-save middleware to update summary fields
financeSchema.pre("save", function(next) {
  // Update net profit
  this.netProfit = this.totalRevenue - this.totalExpenses;
  
  // Update profit margin
  if (this.totalRevenue > 0) {
    this.profitMargin = (this.netProfit / this.totalRevenue) * 100;
  }
  
  next();
});

// Method to add a transaction
financeSchema.methods.addTransaction = async function(transaction) {
  this.transactions.push(transaction);
  
  if (transaction.type === "INCOME") {
    this.totalRevenue += transaction.amount;
  } else {
    this.totalExpenses += transaction.amount;
  }
  
  await this.save();
  return this;
};

// Method to add a student payment
financeSchema.methods.addStudentPayment = async function(payment) {
  this.studentPayments.push(payment);
  
  if (payment.status === "PAID") {
    this.totalRevenue += payment.amount;
    await this.save();
  }
  
  return this;
};

// Method to update budget actuals
financeSchema.methods.updateBudgetActuals = async function(categoryId, actual) {
  const budget = this.budgets.id(categoryId);
  if (budget) {
    budget.actual = actual;
    budget.variance = budget.amount - actual;
    await this.save();
  }
  return this;
};

const Finance = mongoose.models.Finance || mongoose.model("Finance", financeSchema);

export default Finance; 