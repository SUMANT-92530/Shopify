import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { loginSuccess } from "../../slices/authSlice";
// import rootReducer from "../../reducer";
import { endpoints } from "../apis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const { LOGIN_API, SIGNUP_API } = endpoints;

export const login = (formData, navigate) => {

    return async(dispatch) => {
        try {
            console.log("Attempting to log in with data: ", formData);
            const response = await apiConnector("POST", LOGIN_API,
                formData
                )
            console.log("Login response: ", response);
            // if(!response.success) {
            //     throw new Error(response.data.message);
            // }

            console.log("Login successful, dispatching to store...");
            console.log("User data: ", response.user);
            dispatch(
                loginSuccess({
                    user: response.user,
                    token: response.token,
                })
            );

            toast.success("Login Successful");
            navigate("/dashboard/my-profile");
            // navigate("/signup");
        }

        catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
            }
        }
    }


      // if (!response.success) {
      //   throw new Error(response.message);
      // }
    //   dispatch(
    //     loginSuccess({
    //       user: response.user,
    //       token: response.token,
    //     })
    //   );
    //   toast.success("Signup Successful");
    //   toast.dismiss(toastId);

// export function loginWithOtp(data, navigate) {
//     return async (dispatch) => {
//         try {
//         const response = await apiConnector("POST", "/auth/login", data);

//         alert("Login Successful!");

//         navigate("/dashboard");
//         } catch (error) {
//         alert("OTP Verification Failed!");
//         }
//     };
// }




export function signup(signupData, navigate) {

    return async(dispatch) => {
        const toastId = toast.loading("Signing you up...");
        try {
            // console.log("sign up data",signupData);
            const response = await apiConnector("POST", SIGNUP_API, 
                signupData
            )
            console.log("Signup response: ", response);
            if(!response.success) {
                throw new Error(response.data.message);
            }
            // dispatch({
            //     type: "SIGNUP",
            //     payload: {
            //         user: response.data.user,
            //         token: response.data.token,
            //     }
            // });
            toast.success("Signup Successful");
            navigate("/login");
        }

        catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            // navigate("/signup");
            }
            toast.dismiss(toastId);
        }
    }




export function sendOtp(email) {

    return async (dispatch) => {
        try {
        const response = await apiConnector("POST", "/auth/sendotp", {
            email,
        });

        alert("OTP Sent Successfully!");
        } catch (error) {
        alert("OTP Sending Failed!");
        }
    };
}
