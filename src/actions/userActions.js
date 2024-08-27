import axiosInstance from '../api/axiosInstance'; // Import Axios instance
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './actionTypes';

// Action creator for login start
export const loginStart = () => ({
  type: LOGIN_START,
});

// Action creator for login success
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

// Action creator for login failure
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Action creator for registration start
export const registerStart = () => ({
  type: REGISTER_START,
});

// Action creator for registration success
export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

// Action creator for registration failure
export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

// Thunk action for login
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    const data = response.data;
    dispatch(loginSuccess(data));
    // Save user auth and token to localStorage if needed
    localStorage.setItem('userAuth', JSON.stringify(data.user));
    localStorage.setItem('authToken', data.token);
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.error || error.message));
  }
};

// Thunk action for registration
export const registerUser = (userInfo) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await axiosInstance.post('/api/auth/register', userInfo);
    const data = response.data;
    dispatch(registerSuccess(data));
    // Optionally handle user registration success
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.error || error.message));
  }
};
