import express from "express";
import {
  createProduct,
  getAllProducts
} from "../controllers/productController.js";

const router = express.Router();

// Seller will use this (abhi open hai)
router.post("/", createProduct);

// Customer + public
router.get("/", getAllProducts);

export default router;
