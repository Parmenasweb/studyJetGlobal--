import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["MOU", "Fee Structure", "Agreement", "License", "Certificate", "Other"]
  },
  title: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedAt: Date,
});

const contactPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const referredStudentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  referralDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "enrolled", "completed", "withdrawn"],
    default: "pending",
  },
  program: {
    type: String,
    required: true,
  },
  commission: {
    amount: {
      type: Number,
      min: 0,
      default: 0,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paymentDate: Date,
  },
  notes: String,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const partnerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["university", "agency"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  commission: {
    minimum: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },
    maximum: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    }
  },
  address: {
    street: String,
    city: {
      type: String,
      required: true,
    },
    state: String,
    country: {
      type: String,
      required: true,
    },
    postalCode: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active",
  },
  partnershipDate: {
    type: Date,
    required: true,
  },
  contactPersons: [contactPersonSchema],
  documents: [documentSchema],
  // University-specific fields
  universityDetails: {
    ranking: {
      type: Number,
    },
    accreditation: [String],
    programs: [{
      name: {
        type: String,
        required: true
      },
      level: {
        type: String,
        enum: ["undergraduate", "postgraduate", "phd", "diploma"],
        required: true
      },
      duration: String,
      tuitionFee: Number,
    }],
    admissionRequirements: {
      type: [String],
      default: [],
    },
    facilities: [String],
    studentServices: [String],
    academicCalendar: String,
    applicationDeadlines: {
      fall: {
        early: String,
        regular: String,
        late: String,
      },
      spring: {
        early: String,
        regular: String,
        late: String,
      },
    },
    scholarshipInfo: {
      types: [String],
      coverage: [String],
      requirements: [String],
    },
    accommodationDetails: String,
    internshipOpportunities: {
      types: [String],
      duration: [String],
      benefits: [String],
    },
  },
  // Agency-specific fields
  agencyDetails: {
    services: [String],
    specialization: [String],
    coverage: [String],
    license: {
      number: String,
      expiryDate: Date,
    },
  },
  // Tracking referred students
  referredStudents: [referredStudentSchema],
  // Performance metrics
  metrics: {
    totalStudents: {
      type: Number,
      default: 0,
    },
    activeStudents: {
      type: Number,
      default: 0,
    },
    completedStudents: {
      type: Number,
      default: 0,
    },
    totalCommission: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
});

// Pre-save hook to update metrics
partnerSchema.pre("save", function(next) {
  // Update metrics based on referredStudents
  const referred = this.referredStudents || [];
  
  this.metrics = {
    totalStudents: referred.length,
    activeStudents: referred.filter(s => s.status === "enrolled").length,
    completedStudents: referred.filter(s => s.status === "completed").length,
    totalCommission: referred.reduce((sum, s) => sum + (s.commission?.amount || 0), 0),
  };
  
  next();
});

// Method to calculate commission for a referred student
partnerSchema.methods.calculateCommission = function() {
  // Use the commission from the root level since it's now a common field
  const { minimum, maximum } = this.commission;
  
  // For now, use the minimum commission. This can be made more sophisticated
  // based on various factors like program type, student status, etc.
  return minimum;
};

const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerSchema);

export default Partner;