import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

const incomeSchema = new mongoose.Schema(
  {
    incomeId: {
      type: String,
      default: () => `INC${nanoid()}`,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "application-fee",
        "tuition-fee",
        "service-fee",
        "consultation-fee",
        "document-processing",
        "visa-assistance",
        "commission",
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
      enum: ["bank-transfer", "wire-transfer", "check", "other"],
    },
    bankDetails: {
      bankName: { type: String },
      accountName: { type: String },
      transactionReference: { type: String },
    },
    // Client/Student Information
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    // For Commission Income
    commission: {
      partnerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Partner",
        required: function() {
          return this.category === "commission";
        }
      },
      partnerType: { 
        type: String, 
        enum: ["university", "agency"],
        required: function() {
          return this.category === "commission";
        }
      },
      agreementReference: {
        type: String,
        required: function() {
          return this.category === "commission";
        }
      },
      commissionType: {
        type: String,
        enum: ["enrollment", "tuition", "visa", "accommodation", "other"],
        required: function() {
          return this.category === "commission";
        }
      },
      commissionRate: {
        type: Number,
        required: function() {
          return this.category === "commission";
        }
      },
      baseAmount: {
        type: Number,
        required: function() {
          return this.category === "commission";
        }
      },
      enrollmentPeriod: {
        type: String,
        required: function() {
          return this.category === "commission";
        }
      },
      programLevel: {
        type: String,
        required: function() {
          return this.category === "commission";
        }
      },
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
      hasAgreement: { type: Boolean, default: false },
      hasPaymentProof: { type: Boolean, default: false },
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
incomeSchema.pre("save", async function (next) {
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
incomeSchema.post("save", async function (doc) {
  try {
    if (!doc.transactionId) {
      const Transaction = mongoose.model("Transaction");
      const transaction = await Transaction.create({
        type: "income",
        category: doc.category,
        amount: doc.amount,
        currency: doc.currency,
        amountInUSD: doc.amountInUSD,
        date: doc.date,
        status: doc.status,
        description: `Income: ${doc.category.replace("-", " ").toUpperCase()}`,
        sourceDocument: doc._id,
        sourceModel: "Income",
        clientId: doc.clientId,
        createdBy: doc.createdBy,
        updatedBy: doc.updatedBy,
        metadata: {
          paymentMethod: doc.paymentMethod,
          bankDetails: doc.bankDetails,
          verification: doc.verification,
          documents: doc.documents,
        },
      });

      // Update the income document with the transaction reference
      await mongoose.model("Income").findByIdAndUpdate(doc._id, {
        transactionId: transaction._id,
      });
    }
  } catch (error) {
    console.error("Error creating transaction:", error);
  }
});

// Virtual for formatted amount
incomeSchema.virtual("formattedAmount").get(function () {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: this.currency,
  }).format(this.amount);
});

// Method to find income by ID with populated references
incomeSchema.statics.findByIdWithDetails = async function (id) {
  return this.findById(id)
    .populate("clientId", "personalInfo.fullName personalInfo.email personalInfo.phone")
    .populate("commission.partnerId", "name email phone")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .populate("transactionId");
};

const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

export default Income; 