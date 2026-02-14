import express from "express";

import {
  createProduct,
  getAllProducts
} from "../controllers/productController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// 🔒 SELLER ONLY
router.post(
  "/",
  authMiddleware,
  roleMiddleware("seller"),
  createProduct
);

//PUBLIC
router.get("/", getAllProducts);

export default router;
