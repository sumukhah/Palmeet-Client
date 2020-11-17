import {
  baseApi,
  palsList,
  acceptPalInvite,
  declinePalInvite,
} from "../../api/index.js";
import axios from "axios";
import { successFetch, failedFetch } from "./fetchPals";

export default (id, accepted) => {
  return async (dispatch, getState) => {
    const { api_token } = getState().user;
    const headers = {
      Authorization: `Bearer ${api_token}`,
    };

    try {
      const { data } = await axios.get(
        `${baseApi}${accepted ? acceptPalInvite : declinePalInvite}/${id}`,
        {
          headers,
        }
      );

      dispatch(successFetch(data.data));
    } catch (e) {
      console.log(e.message, e.response);
      dispatch(failedFetch(e.message));
    }
  };
};
