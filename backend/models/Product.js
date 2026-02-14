import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    brand: String,
    description: String,

    // Step 2 Variations
    color: String,
    size: String,
    sku: String,

    // Step 3 Pricing & Stock
    price: {
      type: Number,
      required: true,
    },
    discount: Number,
    stock: Number,

    // Step 4 Shipping
    weight: Number,
    shippingCharge: Number,

    // Seller Reference
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
