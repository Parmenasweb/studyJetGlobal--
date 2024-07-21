import mongoose from "mongoose";
// import { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    image: { type: String },
    authProviderId: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;

// export const User = mongoose.models?.User || mongoose.model("user", userSchema);5555
