import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { loginSuccess } from "../../slices/authSlice";
import { endpoints } from "../apis";

const { LOGIN_API, SIGNUP_API } = endpoints;

// ---------------- LOGIN ----------------
export const login = (formData) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", LOGIN_API, formData);
      console.log("Login response: ", response);

      if (!response.success) {
        throw new Error(response.message);
      }

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );

      toast.success("Login Successful");
      return response; // ✅ return response so component can decide navigation
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
      throw error;
    }
  };
};

// ---------------- SIGNUP ----------------
export const signup = (signupData) => {
  return async (dispatch) => {
    const toastId = toast.loading("Signing you up...");
    try {
      const response = await apiConnector("POST", SIGNUP_API, signupData);
      console.log("Signup response: ", response);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success("Signup Successful");
      toast.dismiss(toastId);

      return response; // ✅ return response so component can decide navigation
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      toast.dismiss(toastId);
      throw error;
    }
  };
};

// ---------------- SEND OTP ----------------
export const sendOtp = (email) => {
  return async () => {
    try {
      const response = await apiConnector("POST", "/auth/sendotp", { email });
      console.log("Send OTP response: ", response);

      if (response.success) {
        toast.success("OTP Sent Successfully!");
      } else {
        toast.error("OTP Sending Failed!");
      }
    } catch (error) {
      console.log("SEND OTP ERROR............", error);
      toast.error("OTP Sending Failed!");
    }
  };
};