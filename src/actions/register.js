import { baseApi, registerApi } from "../api/index.js";
import axios from "axios";
import { successAuth, authFailure } from "./authActionHelper";
import AsyncStorage from "@react-native-community/async-storage";

const register = (credentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${baseApi}${registerApi}`,
        credentials
      );
      await AsyncStorage.setItem("api_token", data.data.api_token);
      dispatch(successAuth(data.data));
    } catch (e) {
      console.log(e.response);
      dispatch(authFailure(e.message));
    }
  };
};

export default register;
