import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    destinationName: { type: String, required: true },
    description: { type: String, required: true },
    destinationCapital: { type: String, required: true },
    studyCost: { type: String, required: true },
    accommodationFee: { type: String, required: true },
    programs: { type: Array },
    scholarships: { type: Array },
    partners: { type: Array },
    universities: { type: Array },
    imageUrl: { type: String, required: true },
    flagUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Destination =
  mongoose.models?.Destination ||
  mongoose.model("Destination", destinationSchema);
export default Destination;

// export const User = mongoose.models?.User || mongoose.model("user", userSchema);5555
