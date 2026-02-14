import mongoose from "mongoose";

const sellerVerificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mobileVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  signatureVerified: { type: Boolean, default: false },
  storeDetails: {
    storeName: String,
    pickupAddress: String,
  },
  listingCreated: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("SellerVerification", sellerVerificationSchema);