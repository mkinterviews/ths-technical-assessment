export const parseError = (error) => {
  if (error && typeof error === "string") {
    return error;
  }

  return "Something went wrong!";
};
