import axios from "axios";
// export const baseApi = "http://10.0.0.2:8000/api";
export const baseApi = "http://26564c51a418.ngrok.io/api";

export const loginApi = "/login";
export const logOut = "/logout";

export const registerApi = "/register";
export const userSelfData = "/profile";
export const newPalRequest = "/new-pal-request";
export const palsList = "/pals";
export const acceptPalInvite = "/accept-pal-request";
export const declinePalInvite = "/decline-pal-request";
export const inviteForMeeting = "/meeting-invite";
export const scheduleMeeting = "/meeting-new";
export const meetingInvitations = "/my-meeting-invites";

export const setHeader = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

// export const instance = axios.create({
//   baseURL: baseApi,
//   withCredentials: false,
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//   },
// });
