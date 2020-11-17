import { authFailure } from "../actions/authentication/authActionHelper";

const INITIAL_STATE = {
  errorMessage: "",
  isLoading: false,
  user: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_BEGIN":
      return { ...state, isLoading: true, errorMessage: "" };
    case "AUTH_SUCCESS":
      return { ...action.user, errorMessage: "", isLoading: false };
    case "AUTH_FAILURE":
      return { ...state, isLoading: false, errorMessage: action.error };
    case "LOGOUT":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

export default authReducer;
