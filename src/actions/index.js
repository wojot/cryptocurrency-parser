import { SET_NAME, SET_PRICE } from "./types.js";
import axios from "axios";

const APIurl = "https://api.coinpaprika.com/v1";

export const getNames = symbols => dispatch => {
  symbols.forEach(symbol => {
    axios({
      url: `${APIurl}/search`,
      params: {
        q: symbol,
        limit: 1
      }
    })
      .then(function(response) {
        dispatch({
          type: SET_NAME,
          payload: { symbol, name: response.data.currencies[0].name }
        });
      })
      .catch(function(error) {
        //TODO handle error when fetching name
        console.log({ error: error.response.data.error });
      });
  });
};

export const getPrices = priceSymbols => dispatch => {
  priceSymbols.forEach(priceSymbol => {
    axios({
      url: `${APIurl}/search`,
      params: {
        q: priceSymbol,
        limit: 1
      }
    })
      .then(function(response) {
        console.log(response);
        // dispatch({
        //   type: SET_PRICE,
        //   payload: { priceSymbol, price: response.data.currencies[0].name }
        // });
      })
      .catch(function(error) {
        //TODO handle error when fetching name
        console.log({ error: error.response.data.error });
      });
  });
};
