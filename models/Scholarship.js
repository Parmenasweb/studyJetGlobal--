import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    UniversityName: { type: Array },

    description: { type: String, required: true },
    status: { type: String },
  },
  { timestamps: true }
);

const Scholarship =
  mongoose.models?.Scholarship ||
  mongoose.model("Scholarship", scholarshipSchema);
export default Scholarship;

// export const User = mongoose.models?.User || mongoose.model("user", userSchema);5555
