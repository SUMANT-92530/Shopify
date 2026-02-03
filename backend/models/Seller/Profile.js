import mongoose from "mongoose";

const sellerProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    storeName: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("SellerProfile", sellerProfileSchema);
