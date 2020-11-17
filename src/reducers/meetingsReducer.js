const INITIAL_STATE = {
  isLoading: false,
  errorMessage: "",
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "MEETING_FETCH_BEGINS":
      return { ...state, isLoading: true };
    case "MEETING_FETCH_SUCCESSFUL":
      return { isLoading: false, errorMessage: "", items: action.payload };
    case "MEETING_FETCH_FAILED":
      return { isLoading: false, errorMessage: action.errorMessage, items: [] };
    default:
      return state;
  }
};
