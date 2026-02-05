// import { apiConnector } from "./apiConnector";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
}