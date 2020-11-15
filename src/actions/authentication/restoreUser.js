import AsyncStorage from "@react-native-community/async-storage";
import { baseApi, userSelfData } from "../../api/index.js";
import { successAuth } from "./authActionHelper";
import axios from "axios";

const restoreUser = () => {};

export default () => {
  return async (dispatch) => {
    try {
      const api_token = await AsyncStorage.getItem("api_token");
      const { data } = await axios.get(`${baseApi}${userSelfData}`, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      });
      dispatch(successAuth(data.data));
    } catch (e) {
      console.log(e);
    }
  };
};
