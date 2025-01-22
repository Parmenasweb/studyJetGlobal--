import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

const expenseSchema = new mongoose.Schema(
  {
    expenseId: {
      type: String,
      default: () => `EXP${nanoid()}`,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "salary",
        "rent",
        "utilities",
        "marketing",
        "travel",
        "office-supplies",
        "commission-payout",
        "other",
      ],
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
      min: 0.01,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["bank-transfer", "wire-transfer", "check", "cash", "other"],
    },
    bankDetails: {
      bankName: { type: String },
      accountName: { type: String },
      transactionReference: { type: String },
    },
    // Department and Budget Information
    department: {
      type: String,
      required: true,
      enum: ["administration", "marketing", "operations", "sales", "finance", "other"],
    },
    budgetCategory: {
      type: String,
      required: true,
      enum: ["operational", "capital", "marketing", "payroll", "other"],
    },
    // Vendor Information
    vendor: {
      name: { type: String, required: true },
      contactInfo: String,
      isRecurring: { type: Boolean, default: false },
    },
    // For Commission Payout
    commissionPayout: {
      partnerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Partner",
        required: function() {
          return this.category === "commission-payout";
        }
      },
      partnerType: { 
        type: String, 
        enum: ["university", "agency"],
        required: function() {
          return this.category === "commission-payout";
        }
      },
      agreementReference: {
        type: String,
        required: function() {
          return this.category === "commission-payout";
        }
      },
      periodStart: {
        type: Date,
        required: function() {
          return this.category === "commission-payout";
        }
      },
      periodEnd: {
        type: Date,
        required: function() {
          return this.category === "commission-payout";
        }
      },
      studentCount: {
        type: Number,
        required: function() {
          return this.category === "commission-payout";
        }
      },
    },
    // Recurring Expense Details
    recurring: {
      isRecurring: { type: Boolean, default: false },
      frequency: {
        type: String,
        enum: ["weekly", "monthly", "quarterly", "yearly"],
        required: function() {
          return this.recurring.isRecurring;
        },
      },
      nextDueDate: Date,
      endDate: Date,
    },
    // Verification and Documentation
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
      hasInvoice: { type: Boolean, default: false },
      hasReceipt: { type: Boolean, default: false },
      hasContract: { type: Boolean, default: false },
      invoiceNumber: { type: String },
    },
    // Reference and Notes
    reference: String,
    notes: String,
    // Metadata
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
    // Transaction Reference
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to generate amountInUSD
expenseSchema.pre("save", async function (next) {
  if (this.currency === "USD") {
    this.amountInUSD = this.amount;
  } else {
    // TODO: Implement currency conversion
    // For now, we'll just set it equal to amount
    this.amountInUSD = this.amount;
  }
  next();
});

// Post-save middleware to create Transaction
expenseSchema.post("save", async function (doc) {
  try {
    if (!doc.transactionId) {
      const Transaction = mongoose.model("Transaction");
      const transaction = await Transaction.create({
        type: "expense",
        category: doc.category,
        amount: doc.amount,
        currency: doc.currency,
        amountInUSD: doc.amountInUSD,
        date: doc.date,
        status: doc.status,
        description: `Expense: ${doc.category.replace("-", " ").toUpperCase()}`,
        sourceDocument: doc._id,
        sourceModel: "Expense",
        createdBy: doc.createdBy,
        updatedBy: doc.updatedBy,
        metadata: {
          paymentMethod: doc.paymentMethod,
          bankDetails: doc.bankDetails,
          verification: doc.verification,
          documents: doc.documents,
          expense: {
            department: doc.department,
            budgetCategory: doc.budgetCategory,
            vendor: doc.vendor,
            recurring: doc.recurring,
          },
        },
      });

      // Update the expense document with the transaction reference
      await mongoose.model("Expense").findByIdAndUpdate(doc._id, {
        transactionId: transaction._id,
      });
    }
  } catch (error) {
    console.error("Error creating transaction:", error);
  }
});

// Virtual for formatted amount
expenseSchema.virtual("formattedAmount").get(function () {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: this.currency,
  }).format(this.amount);
});

// Method to find expense by ID with populated references
expenseSchema.statics.findByIdWithDetails = async function (id) {
  return this.findById(id)
    .populate("commissionPayout.partnerId", "name email phone")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .populate("verification.verifiedBy", "name email")
    .populate("transactionId");
};

const Expense = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense; 