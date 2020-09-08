import axios from 'axios';
import { LOGIN_SUCCESS, GET_ERRORS } from '../../types';

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
