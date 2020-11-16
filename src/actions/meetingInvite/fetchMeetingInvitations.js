import {
  baseApi,
  palsList,
  setHeader,
  meetingInvitations,
} from "../../api/index.js";
import axios from "axios";

export const successFetch = (data) => {
  return {
    type: "FETCH_MEETINGS_SUCCESS",
    payload: data,
  };
};

export const failedFetch = (message) => {
  return {
    type: "FETCH_MEETINGS_FAILED",
    errorMessage: message,
  };
};

export default () => {
  return async (dispatch, getState) => {
    const headers = setHeader(getState().user.api_token);
    try {
      const { data } = await axios.get(`${baseApi}${meetingInvitations}`, {
        headers,
      });
      dispatch(successFetch(data.data));
    } catch (e) {
      console.log(e.response);
      dispatch(failedFetch(e.message));
    }
  };
};
