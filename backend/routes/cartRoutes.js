import express from "express";
import { addToCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// CUSTOMER ONLY – ADD TO CART
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("customer"),
  addToCart
);

export default router;
