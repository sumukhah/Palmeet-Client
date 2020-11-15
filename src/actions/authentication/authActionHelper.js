export const successAuth = (user) => {
  return {
    type: "AUTH_SUCCESS",
    user,
  };
};

export const authFailure = (error) => {
  return {
    type: "AUTH_FAILURE",
    error,
  };
};
