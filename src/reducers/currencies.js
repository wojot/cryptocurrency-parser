import { SET_NAME, SET_PRICE } from "../actions/types";

const currencies = (state = { currencies: [] }, action) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, currencies: [...state.currencies, action.payload] };
    case SET_PRICE:
      return state;
    default:
      return state;
  }
};

export default currencies;
