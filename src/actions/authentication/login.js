import { baseApi, loginApi, logOut } from "../../api/index.js";
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

// For simplicity, Not requesting to the server to log out the user
// Instead removing the state.user from store and removing the api_token from the storage
export const logout = () => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.removeItem("api_token");
    } catch (e) {
    } finally {
      dispatch({
        type: "LOGOUT",
      });
    }
  };
};

export default login;
