import Product from "../models/Product.js";

/* ================================
   ✅ SELLER: Create Product
================================ */
export const createProduct = async (req, res) => {
  try {
    const sellerId = req.user.id; // from authMiddleware

    const product = await Product.create({
      ...req.body,
      sellerId,
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully ✅",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

/* ================================
   ✅ CUSTOMER: Get All Products
================================ */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};
