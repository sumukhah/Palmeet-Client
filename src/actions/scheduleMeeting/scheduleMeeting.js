import {
  baseApi,
  scheduleMeeting,
  setHeader,
  inviteForMeeting,
} from "../../api/index.js";
import meetingInvite from "../meetingInvite/meetingInvite";
import axios from "axios";

const generateRandomUrl = () => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return `https://meet.jit.si/${text}`;
};

export default (meeting_credentials, selectedUsers = []) => {
  return async (dispatch, getState) => {
    console.log(selectedUsers);
    const headers = setHeader(getState().user.api_token);
    try {
      const { data } = await axios.post(
        `${baseApi}${scheduleMeeting}`,
        { ...meeting_credentials, link: generateRandomUrl() },
        { headers }
      );

      const res = await axios.post(
        `${baseApi}${inviteForMeeting}`,
        { meeting_id: data.data.id, invitees: JSON.stringify(selectedUsers) },
        { headers }
      );
      console.log(res);
    } catch (e) {
      console.log(e.response);
    }
  };
};
