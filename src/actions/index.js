import { GET_NAME } from "./types.js";

export const getName = shortName => dispatch => {
  dispatch({ type: GET_NAME });
};
