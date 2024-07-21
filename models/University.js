import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    universityName: { type: String, required: true },
    assets: { type: Array },

    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tuitionFee: { type: String, required: true },
    accommodationFee: { type: String, required: true },
    programs: { type: Array },
    destination: { type: String, required: true },
  },
  { timestamps: true }
);

const University =
  mongoose.models?.University || mongoose.model("University", universitySchema);
export default University;

// export const User = mongoose.models?.User || mongoose.model("user", userSchema);5555
