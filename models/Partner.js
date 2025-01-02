import mongoose from "mongoose";

const contactPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Contact person name is required"],
  },
  position: String,
  email: {
    type: String,
    required: [true, "Contact person email is required"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
  },
  phone: String,
  isMainContact: {
    type: Boolean,
    default: false,
  },
});

const locationSchema = new mongoose.Schema({
  address: String,
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: String,
  postalCode: String,
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

const documentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Document title is required"],
  },
  type: {
    type: String,
    required: [true, "Document type is required"],
    enum: ["mou", "fee_structure", "accommodation", "insurance", "other"],
  },
  fileName: {
    type: String,
    required: true,
  },
  originalName: String,
  mimeType: String,
  size: Number,
  url: {
    type: String,
    required: true,
  },
  expiryDate: Date,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Program name is required"],
  },
  description: {
    type: String,
    required: [true, "Program description is required"],
  },
  level: {
    type: String,
    required: [true, "Program level is required"],
  },
  duration: {
    value: {
      type: Number,
      required: [true, "Duration value is required"],
      min: 1,
    },
    unit: {
      type: String,
      required: [true, "Duration unit is required"],
    },
  },
  startDates: {
    type: [Date],
    required: [true, "At least one start date is required"],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "At least one start date is required",
    },
  },
  fees: {
    amount: {
      type: Number,
      required: [true, "Fee amount is required"],
      min: 0,
    },
    currency: {
      type: String,
      required: [true, "Fee currency is required"],
    },
    period: {
      type: String,
      required: [true, "Fee period is required"],
    },
  },
  requirements: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
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

const accommodationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Accommodation type is required"],
    enum: ["dormitory", "apartment", "homestay", "other"],
  },
  description: String,
  capacity: Number,
  amenities: [String],
  cost: {
    amount: {
      type: Number,
      required: [true, "Accommodation cost amount is required"],
    },
    currency: {
      type: String,
      required: [true, "Accommodation cost currency is required"],
    },
    period: {
      type: String,
      required: [true, "Accommodation cost period is required"],
      enum: ["day", "week", "month", "semester"],
    },
  },
  images: [
    {
      url: String,
      caption: String,
    },
  ],
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const commissionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Commission type is required"],
    enum: ["percentage", "fixed"],
  },
  value: {
    type: Number,
    required: [true, "Commission value is required"],
  },
  currency: {
    type: String,
    required: function () {
      return this.type === "fixed";
    },
  },
  conditions: [String],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
});

const performanceSchema = new mongoose.Schema({
  activeStudents: {
    type: Number,
    default: 0,
  },
  totalStudents: {
    type: Number,
    default: 0,
  },
  successRate: {
    type: Number,
    default: 0,
  },
  averageProcessingTime: {
    type: Number,
    default: 0,
  },
  lastReviewDate: Date,
  ratings: {
    overall: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    communication: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    responsiveness: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    quality: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
});

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Partner name is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Partner type is required"],
      enum: ["university", "agency", "independent"],
    },
    status: {
      type: String,
      required: [true, "Partner status is required"],
      enum: ["active", "inactive", "pending", "suspended"],
      default: "pending",
    },
    description: String,
    website: {
      type: String,
      match: [
        /^https?:\/\/.+\..+$/,
        "Please enter a valid URL starting with http:// or https://",
      ],
    },
    logo: {
      url: String,
      alt: String,
    },
    contactPersons: [contactPersonSchema],
    location: locationSchema,
    documents: [documentSchema],
    programs: [programSchema],
    accommodation: [accommodationSchema],
    commission: [commissionSchema],
    performance: performanceSchema,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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

// Methods
partnerSchema.methods.checkDocumentStatus = function () {
  const now = new Date();
  return this.documents.map((doc) => ({
    ...doc.toObject(),
    isExpired: doc.expiryDate ? doc.expiryDate < now : false,
    daysUntilExpiry: doc.expiryDate
      ? Math.ceil((doc.expiryDate - now) / (1000 * 60 * 60 * 24))
      : null,
  }));
};

partnerSchema.methods.getActivePrograms = function () {
  return this.programs.filter((program) => program.isActive);
};

partnerSchema.methods.getAvailableAccommodation = function () {
  return this.accommodation.filter((acc) => acc.isAvailable);
};

partnerSchema.methods.getCurrentCommission = function () {
  const now = new Date();
  return this.commission
    .filter(
      (comm) =>
        comm.isActive &&
        comm.startDate <= now &&
        (!comm.endDate || comm.endDate >= now)
    )
    .sort((a, b) => b.startDate - a.startDate)[0];
};

// Indexes
partnerSchema.index({ name: "text", "contactPersons.name": "text" });
partnerSchema.index({ type: 1, status: 1 });
partnerSchema.index({ "location.country": 1 });
partnerSchema.index({ createdAt: -1 });

export default mongoose.models.Partner ||
  mongoose.model("Partner", partnerSchema);
