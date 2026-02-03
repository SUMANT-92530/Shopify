import mongoose from "mongoose";

const customerProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: String
  },
  
);

export default mongoose.model("CustomerProfile", customerProfileSchema);
