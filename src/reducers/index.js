import { combineReducers } from "redux";

import authReducer from "./authReducer";
import palsInvitation from "./palReducer";

export default combineReducers({
  user: authReducer,
  pals: palsInvitation,
});
