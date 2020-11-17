import {
  baseApi,
  scheduleMeeting,
  inviteForMeeting,
  setHeader,
} from "../../api/index.js";
import axios from "axios";

export default (meeting_id, invitees) => {
  return async (dispatch, getState) => {
    const headers = setHeader(getState.user.api_token);
    try {
      const { data } = await axios.post(
        `${baseApi}${inviteForMeeting}`,
        { meeting_id, invitees },
        { headers }
      );
    } catch (e) {
      console.log(e.response);
    }
  };
};
