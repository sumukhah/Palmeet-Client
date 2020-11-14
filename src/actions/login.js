import { baseApi, loginApi, logOut } from "../api/index.js";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { successAuth, authFailure } from "./authActionHelper";

const login = (credential) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${baseApi}${loginApi}`, credential);
      await AsyncStorage.setItem("api_token", data.data.api_token);
      dispatch(successAuth(data.data));
    } catch (e) {
      console.log(e.response);
      dispatch(authFailure(e.message));
    }
  };
};

const logout = () => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.removeItem("api_token");
      await axios.post(`${baseApi}${logOut}`, null, {
        headers: { api_token: `Bearer ${api_token}` },
      });
    } catch (e) {}
  };
};

export default login;
