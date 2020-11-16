const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_MEETINGS_SUCCESS":
      return [...action.payload];
    case "FETCH_MEETINGS_FAILED":
      return { errorMessage: action.errorMessage };
    default:
      return state;
  }
};
