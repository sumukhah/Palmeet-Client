import { baseApi, palsList } from "../../api/index.js";
import axios from "axios";

export const successFetch = (data) => {
  return {
    type: "FETCH_PALS_SUCCESS",
    payload: data,
  };
};

export const failedFetch = (message) => {
  return {
    type: "FETCH_PALS_FAILED",
    errorMessage: message,
  };
};

export default () => {
  return async (dispatch, getState) => {
    const { api_token } = getState().user;
    try {
      const { data } = await axios.get(`${baseApi}${palsList}`, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      });
      dispatch(successFetch(data.data));
    } catch (e) {
      dispatch(failedFetch(e.message));
    }
  };
};
