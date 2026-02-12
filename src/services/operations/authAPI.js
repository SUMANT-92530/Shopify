// services/operations/authAPI.js
import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { loginSuccess } from "../../slices/authSlice";
import { endpoints } from "../apis";

const { LOGIN_API, SIGNUP_API } = endpoints;

/* ========================================================= */
/* ✅ LOGIN FUNCTION */
/* ========================================================= */
export const login = (formData) => {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");

    try {
      console.log("Attempting Login with data:", formData);

      // ✅ API Call
      const response = await apiConnector("POST", LOGIN_API, formData);
      console.log("Login Response:", response);

      if (!response.success) {
        throw new Error(response.message);
      }

      // ✅ Dispatch User + Token into Redux
      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );

      toast.success("Login Successful");

      // ✅ Return payload so component can navigate
      return response;
    } catch (error) {
      console.log("LOGIN API ERROR:", error);
      toast.error(error.message || "Login Failed");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
};

/* ========================================================= */
/* ✅ SIGNUP FUNCTION */
/* ========================================================= */
export const signup = (signupData) => {
  return async (dispatch) => {
    const toastId = toast.loading("Signing you up...");

    try {
      console.log("Signup Data:", signupData);

      // ✅ API Call
      const response = await apiConnector("POST", SIGNUP_API, signupData);
      console.log("Signup Response:", response);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success("Signup Successful");

      // ✅ Save user + token in Redux
      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );

      // ✅ Return payload so component can navigate
      return response;
    } catch (error) {
      console.log("SIGNUP API ERROR:", error);
      toast.error(error.message || "Signup Failed");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
};

/* ========================================================= */
/* ✅ SEND OTP FUNCTION */
/* ========================================================= */
export const sendOtp = (email) => {
  return async () => {
    const toastId = toast.loading("Sending OTP...");

    try {
      const response = await apiConnector("POST", "/auth/sendotp", { email });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success("OTP Sent Successfully!");
      return response;
    } catch (error) {
      console.log("OTP API ERROR:", error);
      toast.error("OTP Sending Failed!");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
};