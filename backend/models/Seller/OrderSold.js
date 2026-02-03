import mongoose from "mongoose";

const orderSoldSchema = new mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "SellerProfile" },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number
  },
  { timestamps: true }
);

export default mongoose.model("OrderSold", orderSoldSchema);
