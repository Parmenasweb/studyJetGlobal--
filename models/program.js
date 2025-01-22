import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    field: { type: String, required: true },
    level: { type: String, required: true },
    duration: {
      value: { type: Number, required: true, min: 1 },
      unit: { 
        type: String, 
        required: true,
        enum: ["years", "months", "semesters"]
      }
    },
    tuitionFee: {
      amount: { type: Number, required: true, min: 0 },
      currency: { type: String, required: true },
      period: { 
        type: String, 
        required: true,
        enum: ["per_year", "per_semester", "total"]
      }
    },
    description: String,
    intakes: [String],
    requirements: {
      type: [{
        type: String,
        required: true,
        trim: true
      }],
      validate: {
        validator: function(requirements) {
          return requirements.length > 0;
        },
        message: 'At least one requirement must be specified'
      },
      default: []
    },
    language: {
      name: { type: String, required: true },
      level: { 
        type: String, 
        required: true,
        enum: ["A1", "A2", "B1", "B2", "C1", "C2"]
      }
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
    createdBy: { type: String, required: true },
    updatedBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }, {
    timestamps: true // This will automatically manage createdAt and updatedAt
  });

  const Program =
  mongoose.models?.Program ||
  mongoose.model("Program", programSchema);

export default Program;