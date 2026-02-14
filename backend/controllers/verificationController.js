import SellerVerification from "../models/Seller/SellerVerification.js";

// Verify Mobile & Email
export const verifyMobileEmail = async (req, res) => {
  const { userId, mobile, email } = req.body;
  if (!mobile || !email) {
    return res.status(400).json({ message: "Mobile and Email required" });
  }

  const verification = await SellerVerification.findOneAndUpdate(
    { userId },
    { mobileVerified: true, emailVerified: true },
    { new: true, upsert: true }
  );

  res.json({ message: "Mobile & Email verified", verification });
};

// Save Store Details
export const saveStoreDetails = async (req, res) => {
  const { userId, storeName, pickupAddress } = req.body;
  if (!storeName || !pickupAddress) {
    return res.status(400).json({ message: "Store Name and Pickup Address required" });
  }

  const verification = await SellerVerification.findOneAndUpdate(
    { userId },
    { storeDetails: { storeName, pickupAddress }, store: true },
    { new: true, upsert: true }
  );

  res.json({ message: "Store details saved", verification });
};