import { SET_NAME, SET_PRICE, SET_ERROR, CLEAR } from "./types.js";
import axios from "axios";

const APIurl = "https://api.coinpaprika.com/v1";

export const clearLastConversion = () => dispatch => {
  dispatch({ type: CLEAR });
};

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
        dispatch({ type: SET_ERROR, payload: error.message });
      });
  });
};

const roundTo2 = num => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
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
        const currId = response.data.currencies[0].id;

        axios(`${APIurl}/coins/${currId}/ohlcv/latest/`)
          .then(function(response) {
            dispatch({
              type: SET_PRICE,
              payload: { priceSymbol, price: roundTo2(response.data[0].close) }
            });
          })
          .catch(function(error) {
            dispatch({ type: SET_ERROR, payload: error.message });
          });
      })
      .catch(function(error) {
        dispatch({ type: SET_ERROR, payload: error.message });
      });
  });
};
