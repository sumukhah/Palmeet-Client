const INITIAL_STATE = {
  errorMessage: "",
  isLoading: false,
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_MEETING_INVITATION_BEGIN":
      return { ...state, errorMessage: "", isLoading: true };
    case "FETCH_MEETING_INVITATION_SUCCESS":
      return {
        ...state,
        errorMessage: "",
        isLoading: false,
        items: action.payload,
      };
    case "FETCH_MEETING_INVITATION_FAILED":
      return { ...state, errorMessage: action.errorMessage, isLoading: false };
    default:
      return state;
  }
};
