import { SET_NAME, SET_PRICE, SET_ERROR, CLEAR } from "../actions/types";

const currencies = (state = { names: [], prices: [], error: "" }, action) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, names: [...state.names, action.payload] };
    case SET_PRICE:
      return { ...state, prices: [...state.prices, action.payload] };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR:
      return { names: [], prices: [], error: "" };
    default:
      return state;
  }
};

export default currencies;
