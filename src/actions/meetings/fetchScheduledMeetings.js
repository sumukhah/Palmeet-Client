import { baseApi, setHeader, meetings } from "../../api/index";
import axios from "axios";
import fetchMeetingInvitations from "./fetchMeetingInvitations";

const fetchMeetingBegins = () => {
  return {
    type: "MEETING_FETCH_BEGINS",
  };
};
const fetchMeetingFailed = (errorMessage) => {
  return {
    type: "MEETING_FETCH_FAILED",
    errorMessage,
  };
};
const fetchMeetingSucceeded = (meetings) => {
  return {
    type: "MEETING_FETCH_SUCCESSFUL",
    payload: meetings,
  };
};

export default () => {
  return async (dispatch, getState) => {
    const headers = setHeader(getState().user.api_token);
    try {
      dispatch(fetchMeetingBegins());
      const { data } = await axios.get(`${baseApi}${meetings}`, {
        headers,
      });
      console.log(data);
      dispatch(fetchMeetingSucceeded(data.data));
    } catch (e) {
      console.log(e.response);
      dispatch(fetchMeetingFailed(e.message));
    }
  };
};
