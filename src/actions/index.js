import axios from 'axios';
import { LOAD_USER, GET_ERRORS, CLEAR_ERRORS } from '../types';

export const checkAuth = () => (dispatch, getState) => {
  axios
    .get('/.netlify/functions/check-auth', tokenConfig(getState))
    .then((result) =>
      dispatch({
        type: LOAD_USER,
        payload: result.data,
      })
    )
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          response: error.response.data,
          status: error.response.status,
          id: 'NOT AUTHOURIZED',
        },
      });
    });
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['auth-token'] = token;
  }

  return config;
};
