import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";

import { endpoints } from "../apis";

const { LOGIN_API, SIGNUP_API } = endpoints;

export const login = (email, password, navigate) => {
    return async(dispatch) => {
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            })
            console.log("Login response: ", response);
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch({
                type: "LOGIN",
                payload: {
                    user: response.data.user,
                    token: response.data.token,
                }
            });
            toast.success("Login Successful");
            navigate("/dashboard/my-profile");
        }

        catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
            }
        }
    }


export function signup(accountType, name, email, password,navigate) {

    return async(dispatch) => {
        const toastId = toast.loading("Signing you up...");
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                name,
                email,
                password,
                accountType
            })
            console.log("Signup response: ", response);
            if(!response.data.success) {
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
            navigate("/signup");
            }
            toast.dismiss(toastId);
        }
    }