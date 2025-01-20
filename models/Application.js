import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: [
      "submitted",
      "under_review",
      "approved",
      "rejected",
      "pending_documents",
    ],
  },
  date: {
    type: Date,
    required: true,
  },
  note: String,
});

const languageSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  proficiencyLevel: {
    type: String,
    required: true,
    enum: ["basic", "intermediate", "advanced", "native"],
  },
});

const academicBackgroundSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  yearCompleted: {
    type: Number,
    required: true,
  },
});

const workExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
});

const travelHistorySchema = new mongoose.Schema({
  country: {
    type: String,
  },
  purpose: {
    type: String,
    
  },
  year: {
    type: Number,
    
  },
  duration: String,
});

const englishProficiencySchema = new mongoose.Schema({
  testType: {
    type: String,
    enum: ["ielts", "toefl", "pte", "duolingo", "other"],
  },
  overallScore: {
    type: Number,
    min: 0,
  },
  testDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
  },
});

const applicationSchema = new mongoose.Schema(
  {
    applicationType: {
      type: String,
      required: true,
      enum: ["study", "work"],
    },
    status: {
      type: String,
      enum: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "pending_documents",
      ],
      default: "draft",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
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
      phone: {
        type: String,
        required: true,
      },
      whatsapp: {
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
      currentCountry: {
        type: String,
        required: true,
      },
      currentCity: {
        type: String,
        required: true,
      },
      passportNumber: {
        type: String,
      },
      passportExpiry: {
        type: Date,
      },
      gender: {
        type: String,
        required: true,
      },
      maritalStatus: {
        type: String,
        required: true,
      },
      languages: [languageSchema],
    },
    studyDetails: {
      destinationCountry: {
        type: String,
      },
      preferredCities: [
        {
          type: String,
        },
      ],
      intakeDate: {
        type: String,
      },
      programLevel: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      specificProgram: {
        type: String,
      },
      preferredUniversities: [
        {
          type: String,
        },
      ],
      academicBackground: [academicBackgroundSchema],
      englishProficiency: englishProficiencySchema,
      hasScholarshipRequirement: {
        type: Boolean,
        default: false,
      },
      studyGoals: {
        type: String,
      },
    },
    workDetails: {
      destinationCountry: {
        type: String,
      },
      jobCategory: {
        type: String,
      },
      preferredPosition: {
        type: String,
      },
      yearsOfExperience: {
        type: Number,
        min: 0,
      },
      workExperience: [workExperienceSchema],
      careerGoals: {
        type: String,
      },
      skills: [
        {
          type: String,
        },
      ],
    },
    financialInfo: {
      fundingSource: {
        type: String,
        required: true,
        enum: ["self", "family", "sponsor", "loan", "scholarship"],
      },
      annualFamilyIncome: {
        type: Number,
        required: true,
        min: 0,
      },
      hasExistingFunds: {
        type: Boolean,
      },
      fundingAmount: {
        type: Number,
        min: 0,
      },
      sponsorName: {
        type: String,
      },
      sponsorRelation: {
        type: String,
      },
      sponsorContact: {
        type: String,
      },
    },
    additionalInfo: {
      previousVisaRejections: {
        type: Boolean,
        default: false,
      },
      rejectionDetails: {
        type: String,
      },
      travelHistory: [travelHistorySchema],
      specialRequirements: {
        type: String,
      },
      howDidYouHear: {
        type: String,
        required: true,
      },
    },
    acceptedTerms: {
      type: Boolean,
      required: true,
    },
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
      },
    ],
    timeline: [timelineSchema],
    submittedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Add any necessary indexes
applicationSchema.index({ "personalInfo.email": 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ applicationType: 1 });
applicationSchema.index({ createdAt: 1 });

export const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
