import otpGenerator from "otp-generator";
import Otp from "../models/Otp.js";
import mailSender from "../utils/mailSender.js";

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // ✅ Check email exists
        if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required",
        });
        }

        // ✅ Generate OTP
        const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
        });

        // ✅ Save OTP in DB
        await Otp.create({ email, otp });

        // ✅ Send OTP Mail
        await mailSender(
        email,
        "Your Login OTP",
        `<h2>Your OTP is: ${otp}</h2>
        <p>This OTP is valid for 5 minutes.</p>`
        );

        return res.status(200).json({
        success: true,
        message: "OTP Sent Successfully",
        });
    } catch (error) {
        console.log("Send OTP Error:", error);

        return res.status(500).json({
        success: false,
        message: "OTP Send Failed",
        });
    }
};
