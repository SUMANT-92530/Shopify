import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import CustomerProfile from "../models/customer/Profile.js";
import SellerProfile from "../models/seller/Profile.js";

//Sign Up
export const signUp = async (req, res) => {

  console.log("Received sign-up request with data: "); // Debug log
  try {
    const { name, email, password, accountType, storeName } = req.body;

    if (!name || !email || !password || !accountType) {
      return res.status(400).json({
        message: "Name, email, password and accountType are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      accountType
    });

    // accountType based profile creation
    if (accountType === "customer") {
      await CustomerProfile.create({ userId: user._id });
    }

    if (accountType === "seller") {
      if (!storeName) {
        return res
          .status(400)
          .json({ message: "Store name is required for seller" });
      }

      await SellerProfile.create({
        userId: user._id,
        storeName
      });
    }

    const token = jwt.sign(
      { userId: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      accountType: user.accountType
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email},
      accountType: user.accountType
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
