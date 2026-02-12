import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import CustomerProfile from "../models/customer/Profile.js";
import SellerProfile from "../models/seller/Profile.js";
import Otp from "../models/Otp.js";

/* =========================
   SIGN UP (Customer / Seller)
   ========================= */
export const signUp = async (req, res) => {
  try {
    const { name, email, password, role, storeName } = req.body;

    // 🔹 Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and role are required"
      });
    }

    // 🔹 Seller specific validation
    if (role === "seller" && !storeName) {
      return res.status(400).json({
        success: false,
        message: "Store name is required for seller"
      });
    }

    // 🔹 Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create base user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // 🔹 Create role-based profile
    if (role === "customer") {
      await CustomerProfile.create({
        userId: user._id
      });
    }

    if (role === "seller") {
      await SellerProfile.create({
        userId: user._id,
        storeName
      });
    }

    // 🔹 JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      role
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* =========================
  LOGIN WITH OTP
   ========================= */
export const login = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 🔹 Validation
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    // 🔹 Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered"
      });
    }

    // 🔹 Get latest OTP
    const recentOtp = await Otp.findOne({ email })
      .sort({ createdAt: -1 });

    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found"
      });
    }

    // 🔹 Match OTP
    if (recentOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // 🔹 Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔹 Delete OTPs after login
    await Otp.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
