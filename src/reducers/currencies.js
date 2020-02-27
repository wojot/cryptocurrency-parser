import { GET_NAME } from "../actions/types";

const currencies = (state = {}, action) => {
  switch (action.type) {
    case GET_NAME:
      return state;
    default:
      return state;
  }
};

export default currencies;
