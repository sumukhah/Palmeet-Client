import {
  baseApi,
  palsList,
  setHeader,
  meetingInvitations,
} from "../../api/index.js";
import axios from "axios";

export const startFetch = () => {
  return {
    type: "FETCH_MEETING_INVITATION_BEGIN",
  };
};

export const successFetch = (meetings) => {
  return {
    type: "FETCH_MEETING_INVITATION_SUCCESS",
    payload: meetings,
  };
};

export const failedFetch = (message) => {
  return {
    type: "FETCH_MEETING_INVITATION_FAILED",
    errorMessage: message,
  };
};

export default () => {
  return async (dispatch, getState) => {
    const headers = setHeader(getState().user.api_token);
    try {
      dispatch(startFetch());
      const response = await axios.get(`${baseApi}${meetingInvitations}`, {
        headers,
      });
      console.log(response, "from meeting invite");
      dispatch(successFetch(response.data.data));
    } catch (e) {
      console.log(e.response);
      dispatch(failedFetch(e.message));
    }
  };
};
