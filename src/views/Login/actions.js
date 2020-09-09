import axios from 'axios';
import { LOGIN_SUCCESS, GET_ERRORS, REGISTER_SUCCESS } from '../../types';

export const login = (user) => (dispatch, getState) => {
  axios
    .post('/.netlify/functions/authenticate-user-login', user)
    .then((response) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      })
    )
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          response: error.response.data,
          status: error.response.status,
          id: 'LOGIN ERROR',
        },
      });
    });
};

export const register = (user) => (dispatch, getState) => {
  axios
    .post('/.netlify/functions/register-user', user)
    .then((response) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      })
    )
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          response: error.response.data,
          status: error.response.status,
          id: 'REGISTER ERROR',
        },
      });
    });
};
