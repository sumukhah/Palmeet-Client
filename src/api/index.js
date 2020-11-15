import axios from "axios";
// export const baseApi = "http://10.0.0.2:8000/api";
export const baseApi = "http://052d9d277d25.ngrok.io/api";

export const loginApi = "/login";
export const logOut = "/logout";

export const registerApi = "/register";
export const userSelfData = "/profile";

// export const instance = axios.create({
//   baseURL: baseApi,
//   withCredentials: false,
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//   },
// });
