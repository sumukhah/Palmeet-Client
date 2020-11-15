const INITIAL_DATA = { error: "" };

export default (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case "FETCH_PALS_SUCCESS":
      return { ...state, ...action.payload, error: "" };
    case "FETCH_PALS_FAILED":
      return { error: action.errorMessage };
    default:
      return state;
  }
};
