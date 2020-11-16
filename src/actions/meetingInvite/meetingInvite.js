import {
  baseApi,
  scheduleMeeting,
  inviteForMeeting,
  setHeader,
} from "../../api/index.js";
import axios from "axios";

export default (meeeting_id, invitees) => {
  return async (dispatch, getState) => {
    const headers = setHeader(getState.user.api_token);
    try {
      const { data } = await axios.post(
        `${baseApi}${inviteForMeeting}`,
        { meeeting_id, invitees },
        { headers }
      );
    } catch (e) {
      console.log(e.response);
    }
  };
};
