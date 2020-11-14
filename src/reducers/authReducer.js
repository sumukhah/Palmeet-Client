import { authFailure } from "../actions/authActionHelper";

const INITIAL_STATE = {
  errorMessage: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return { ...action.user, errorMessage: "" };
    case "AUTH_FAILURE":
      return { errorMessage: action.error };
    default:
      return state;
  }
};

export default authReducer;
