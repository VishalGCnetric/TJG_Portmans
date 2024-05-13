// actions.js
import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT
} from './ActionTypes';
import { API_BASE_URL } from '../../config/api';
import { WidthWideOutlined } from '@mui/icons-material';

// Register action creators
export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
export const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error });

export const register = userData => async dispatch => {
  dispatch(registerRequest());
  try {
    // console.log(userData,"register");
    const response = await axios.post(`${API_BASE_URL}signup`, userData);
    const user = response.data;
    // localStorage.setItem("jwt", user.jwt);
    alert("registration successful")
    dispatch(registerSuccess(user));
  } catch (error) {
    dispatch(registerFailure(error.errorMessage));
  }
};

// Login action creators
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

export const login = userData => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}login`, userData); // Corrected API URL
    const user = response.data;
    localStorage.setItem("wt", user.WCToken);
    localStorage.setItem("wtt", user.WCTrustedToken);
    dispatch(getUser());
alert("login successful")
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Get user details action creator
export const getUserRequest = () => ({ type: GET_USER_REQUEST });
export const getUserSuccess = user => ({ type: GET_USER_SUCCESS, payload: user });
export const getUserFailure = error => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = () => async dispatch => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}info`, {
      headers: {
        'wt': localStorage.getItem("wt"),
        'wtt': localStorage.getItem("wtt")
      }
    });
    const user = response.data;
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

// Logout action creator
export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
};
