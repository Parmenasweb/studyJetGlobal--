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
      "other"
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
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: String,
  address: String,
});

const clientSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
      enum: ["lead", "active", "inactive"],
      default: "lead",
    },
    commission: {
      type: Number,
      min: 0,
      default: 0,
    },
    personalInfo: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      nationality: {
        type: String,
        required: true,
      },
      currentResidence: {
        country: {
          type: String,
          required: true,
        },
        city: String,
        address: String,
      },
      passportNumber: {
        type: String,
        required: true,
      },
      emergencyContact: emergencyContactSchema,
    },
    academicInfo: {
      university: {
        name: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
      program: {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          enum: ["foundation", "bachelor", "master", "phd"],
          required: true,
        },
        major: {
          type: String,
          required: true,
        },
      },
      enrollmentDate: Date,
      expectedGraduationDate: Date,
    },
    documents: [documentSchema],
    visaInfo: {
      type: {
        type: String,
      },
      number: {
        type: String,
      },
      issueDate: {
        type: Date,
      },
      expiryDate: {
        type: Date,
      },
      issuingCountry: {
        type: String,
      },
      status: {
        type: String,
        enum: ["active", "expired", "renewal_needed", "processing", "rejected"],
      },
      permitNumber: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Generate clientId after validation but before saving
clientSchema.pre("save", async function (next) {
  if (!this.clientId) {
    try {
      const count = await mongoose.models.Client.countDocuments();
      this.clientId = `CLT${String(count + 1).padStart(5, "0")}`;
    } catch (error) {
      console.error("Error generating clientId:", error);
    }
  }
  next();
});

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
