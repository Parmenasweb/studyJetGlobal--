import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    tuitionFee: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    intakes: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    language: {
      type: String,
      required: true,
    },
    credits: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    specializations: {
      type: [String],
      default: [],
    },
    careerOpportunities: {
      type: [String],
      default: [],
    },
    researchAreas: {
      type: [String],
      default: [],
    },
    applicationDeadlines: {
      fall: {
        type: Date,
      },
      spring: {
        type: Date,
      },
      summer: {
        type: Date,
      },
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Program = mongoose.models.Program || mongoose.model("Program", programSchema);

export default Program; 