import { combineReducers } from "redux";

import authReducer from "./authReducer";
import palsInvitation from "./palReducer";
import meetingInvitations from "./meetingInvitations";

export default combineReducers({
  user: authReducer,
  pals: palsInvitation,
  pendingMeeting: meetingInvitations,
});
