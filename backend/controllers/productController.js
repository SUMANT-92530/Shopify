import Product from "../models/Product.js";
import SellerProfile from "../models/seller/Profile.js";

//CREATE PRODUCT (SELLER ONLY)
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;

    if (!title || !price || !stock) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const seller = await SellerProfile.findOne({ userId: req.user.userId });
    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    const product = await Product.create({
      sellerId: seller._id,
      title,
      description,
      price,
      stock,
      category
    });

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS (PUBLIC)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "sellerId",
      "storeName"
    );

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
