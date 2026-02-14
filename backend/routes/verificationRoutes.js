import express from "express";
import { verifyMobileEmail, saveStoreDetails } from "../controllers/verificationController.js";

const router = express.Router();

router.post("/verify-mobile-email", verifyMobileEmail);
router.post("/save-store", saveStoreDetails);

export default router;