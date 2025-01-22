import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      default: () => `TRX${nanoid()}`,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    // Category based on type
    category: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          const incomeCategories = [
            "application-fee",
            "tuition-fee",
            "service-fee",
            "consultation-fee",
            "document-processing",
            "visa-assistance",
            "commission",
            "other",
          ];
          const expenseCategories = [
            "salary",
            "rent",
            "utilities",
            "marketing",
            "travel",
            "office-supplies",
            "commission-payout",
            "other",
          ];
          return this.type === "income" 
            ? incomeCategories.includes(value)
            : expenseCategories.includes(value);
        },
        message: "Invalid category for the selected transaction type",
      },
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "CAD", "AUD"],
    },
    amountInUSD: {
      type: Number,
      required: true,
      min: 0.01,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled", "failed"],
      default: "pending",
    },
    // Source Document Reference
    sourceDocument: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "sourceModel",
    },
    sourceModel: {
      type: String,
      required: true,
      enum: ["Income", "Expense"],
    },
    // Client Reference (optional for expenses)
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: function() {
        return this.type === "income";
      },
    },
    // Metadata
    metadata: {
      paymentMethod: {
        type: String,
        enum: ["bank-transfer", "wire-transfer", "check", "cash", "other"],
      },
      bankDetails: {
        bankName: String,
        accountName: String,
        transactionReference: String,
      },
      verification: {
        status: {
          type: String,
          enum: ["pending", "verified", "rejected"],
          default: "pending",
        },
        date: Date,
        notes: String,
        verifiedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
      documents: {
        hasInvoice: Boolean,
        hasAgreement: Boolean,
        hasPaymentProof: Boolean,
        invoiceNumber: String,
      },
      // Additional fields for expense transactions
      expense: {
        department: String,
        budgetCategory: String,
        vendor: {
          name: String,
          contactInfo: String,
        },
        recurring: {
          isRecurring: Boolean,
          frequency: {
            type: String,
            enum: ["weekly", "monthly", "quarterly", "yearly"],
          },
          nextDueDate: Date,
        },
      },
    },
    // Audit Trail
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to generate amountInUSD
transactionSchema.pre("save", async function (next) {
  if (this.currency === "USD") {
    this.amountInUSD = this.amount;
  } else {
    // TODO: Implement currency conversion
    // For now, we'll just set it equal to amount
    this.amountInUSD = this.amount;
  }
  next();
});

// Virtual for formatted amount
transactionSchema.virtual("formattedAmount").get(function () {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: this.currency,
  }).format(this.amount);
});

// Method to find transaction by ID with populated references
transactionSchema.statics.findByIdWithDetails = async function (id) {
  return this.findById(id)
    .populate("sourceDocument")
    .populate("clientId", "personalInfo.fullName personalInfo.email personalInfo.phone")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .populate("metadata.verification.verifiedBy", "name email");
};

// Static method to get financial summary
transactionSchema.statics.getFinancialSummary = async function (startDate, endDate) {
  const match = {
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  };

  return this.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amountInUSD", 0],
          },
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amountInUSD", 0],
          },
        },
        incomeCount: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, 1, 0],
          },
        },
        expenseCount: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalIncome: 1,
        totalExpense: 1,
        netAmount: { $subtract: ["$totalIncome", "$totalExpense"] },
        incomeCount: 1,
        expenseCount: 1,
        totalCount: { $add: ["$incomeCount", "$expenseCount"] },
      },
    },
  ]);
};

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;