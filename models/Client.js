import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "passport",
      "visa",
      "admission_letter",
      "academic_transcript",
      "english_proficiency",
      "financial_statement",
      "accommodation_proof",
      "health_insurance",
      "other",
    ],
  },
  title: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  notes: String,
});

const academicProgressSchema = new mongoose.Schema({
  semester: {
    type: String,
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
  courses: [
    {
      name: String,
      credits: Number,
      grade: String,
    },
  ],
  gpa: Number,
  status: {
    type: String,
    enum: ["ongoing", "completed", "deferred", "withdrawn"],
    default: "ongoing",
  },
  notes: String,
});

const paymentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["tuition", "accommodation", "insurance", "visa", "other"],
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "USD",
  },
  status: {
    type: String,
    enum: ["pending", "paid", "overdue", "refunded"],
    default: "pending",
  },
  dueDate: Date,
  paidDate: Date,
  paymentMethod: String,
  transactionId: String,
  notes: String,
});

const accommodationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["university_housing", "private_housing", "homestay"],
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  startDate: Date,
  endDate: Date,
  monthlyRent: Number,
  currency: {
    type: String,
    default: "USD",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "active", "ended"],
    default: "pending",
  },
  contactPerson: {
    name: String,
    phone: String,
    email: String,
  },
  notes: String,
});

const clientSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "graduated", "withdrawn", "deferred"],
      default: "active",
    },
    personalInfo: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: String,
      dateOfBirth: Date,
      nationality: String,
      passportNumber: String,
      emergencyContact: {
        name: String,
        relationship: String,
        phone: String,
        email: String,
      },
    },
    academicInfo: {
      university: {
        name: String,
        country: String,
        city: String,
      },
      program: {
        name: String,
        level: String,
        duration: String,
      },
      studentId: String,
      enrollmentDate: Date,
      expectedGraduationDate: Date,
      academicProgress: [academicProgressSchema],
    },
    documents: [documentSchema],
    payments: [paymentSchema],
    accommodation: accommodationSchema,
    visaInfo: {
      type: String,
      number: String,
      issueDate: Date,
      expiryDate: Date,
      status: {
        type: String,
        enum: ["active", "expired", "renewal_needed", "processing"],
      },
    },
    notes: [
      {
        content: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    assignedAdvisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lastContactDate: Date,
    nextFollowUpDate: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
clientSchema.index({ "personalInfo.fullName": 1 });
clientSchema.index({ "personalInfo.email": 1 });
clientSchema.index({ applicationId: 1 });
clientSchema.index({ status: 1 });
clientSchema.index({ assignedAdvisor: 1 });

// Virtual field for age calculation
clientSchema.virtual("personalInfo.age").get(function () {
  if (!this.personalInfo.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.personalInfo.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
});

// Method to check if any documents are expiring soon
clientSchema.methods.getExpiringDocuments = function (daysThreshold = 30) {
  const today = new Date();
  const threshold = new Date(today.setDate(today.getDate() + daysThreshold));

  const expiringDocs = [];
  if (
    this.visaInfo &&
    this.visaInfo.expiryDate &&
    this.visaInfo.expiryDate <= threshold
  ) {
    expiringDocs.push({
      type: "visa",
      expiryDate: this.visaInfo.expiryDate,
    });
  }

  return expiringDocs;
};

// Method to calculate total payments
clientSchema.methods.calculateTotalPayments = function () {
  return this.payments.reduce((total, payment) => {
    if (payment.status === "paid") {
      return total + payment.amount;
    }
    return total;
  }, 0);
};

export const Client =
  mongoose.models.Client || mongoose.model("Client", clientSchema);
