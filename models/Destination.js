import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    destinationName: { type: String, required: true },
    destinationcapital: { type: String, required: true },
    studyCost: { type: String, required: true },

    livingCost: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Destination =
  mongoose.models?.Destination ||
  mongoose.model("Destination", destinationSchema);
export default Destination;

// export const User = mongoose.models?.User || mongoose.model("user", userSchema);5555
