import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SellerProfile"
    },
    title: String,
    description: String,
    price: Number,
    stock: Number,
    category: String
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
