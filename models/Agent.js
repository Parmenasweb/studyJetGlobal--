import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  studentName: {
    type: String,
    required: [true, "Student name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
  },
  phone: String,
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  program: {
    type: String,
    required: [true, "Program is required"],
  },
  university: {
    type: String,
    required: [true, "University is required"],
  },
  status: {
    type: String,
    enum: [
      "new",
      "contacted",
      "application_started",
      "application_submitted",
      "visa_applied",
      "visa_approved",
      "enrolled",
      "rejected",
      "cancelled",
    ],
    default: "new",
  },
  notes: String,
  documents: [
    {
      title: String,
      url: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const commissionSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "Commission amount is required"],
    min: 0,
  },
  currency: {
    type: String,
    required: [true, "Currency is required"],
    default: "USD",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "paid", "cancelled"],
    default: "pending",
  },
  paymentDate: Date,
  paymentReference: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Agent name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
  },
  phone: String,
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  address: String,
  company: String,
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  baseCommission: {
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: [true, "Commission type is required"],
    },
    value: {
      type: Number,
      required: [true, "Commission value is required"],
      min: 0,
    },
    currency: {
      type: String,
      required: function () {
        return this.baseCommission.type === "fixed";
      },
    },
  },
  bankDetails: {
    bankName: String,
    accountNumber: String,
    accountName: String,
    swiftCode: String,
    iban: String,
  },
  documents: [
    {
      title: String,
      type: {
        type: String,
        enum: ["contract", "id", "certificate", "other"],
      },
      url: String,
      expiryDate: Date,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  leads: [leadSchema],
  commissions: [commissionSchema],
  performance: {
    totalLeads: {
      type: Number,
      default: 0,
    },
    successfulApplications: {
      type: Number,
      default: 0,
    },
    totalCommissionEarned: {
      type: Number,
      default: 0,
    },
    lastActivityDate: Date,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Update timestamps
agentSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Update performance metrics when leads are modified
agentSchema.pre("save", function (next) {
  if (this.isModified("leads")) {
    this.performance.totalLeads = this.leads.length;
    this.performance.successfulApplications = this.leads.filter(
      (lead) => lead.status === "enrolled"
    ).length;
    this.performance.lastActivityDate = new Date();
  }
  next();
});

// Update performance metrics when commissions are modified
agentSchema.pre("save", function (next) {
  if (this.isModified("commissions")) {
    this.performance.totalCommissionEarned = this.commissions
      .filter((commission) => commission.status === "paid")
      .reduce((total, commission) => total + commission.amount, 0);
  }
  next();
});

const Agent = mongoose.models.Agent || mongoose.model("Agent", agentSchema);

export default Agent;