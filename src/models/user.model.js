import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: email, required: true, unique: true },
    profilePictureUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
