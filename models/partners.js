import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    universityName: { type: String, required: true },
    assets: { type: Array },

    description: { type: String, required: true },
    imageUrl: { type: String },
    tuitionFee: { type: String },
    destination: { type: String },
  },
  { timestamps: true }
);

const Partner =
  mongoose.models?.Partner || mongoose.model("Partner", partnerSchema);
export default Partner;

// export const User = mongoose.models?.User || mongoose.model("user", userSchema);5555
