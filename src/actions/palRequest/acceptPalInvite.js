import { baseApi, palsList, acceptPalInvite } from "../../api/index.js";
import axios from "axios";
import { successFetch, failedFetch } from "./fetchPals";

export default (id) => {
  return async (dispatch, getState) => {
    const { api_token } = getState().user;
    const headers = {
      Authorization: `Bearer ${api_token}`,
    };

    try {
      const response = await axios.get(`${baseApi}${acceptPalInvite}/${id}`, {
        headers,
      });
      const { data } = await axios.get(`${baseApi}${palsList}`, {
        headers,
      });
      dispatch(successFetch(data.data));
    } catch (e) {
      console.log(e.message, e.response);
      dispatch(failedFetch(e.message));
    }
  };
};
