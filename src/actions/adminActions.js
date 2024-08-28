import axiosInstance from '../api/axiosInstance';
import {
  ADMIN_LOGIN_START,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_REGISTER_START,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAILURE,
} from './actionTypes';

// Action creator for admin login start
export const adminLoginStart = () => ({
  type: ADMIN_LOGIN_START,
});

// Action creator for admin login success
export const adminLoginSuccess = (admin) => ({
  type: ADMIN_LOGIN_SUCCESS,
  payload: admin,
});

// Action creator for admin login failure
export const adminLoginFailure = (error) => ({
  type: ADMIN_LOGIN_FAILURE,
  payload: error,
});

// Action creator for admin registration start
export const adminRegisterStart = () => ({
  type: ADMIN_REGISTER_START,
});

// Action creator for admin registration success
export const adminRegisterSuccess = (admin) => ({
  type: ADMIN_REGISTER_SUCCESS,
  payload: admin,
});

// Action creator for admin registration failure
export const adminRegisterFailure = (error) => ({
  type: ADMIN_REGISTER_FAILURE,
  payload: error,
});

// Thunk action for admin login
export const loginAdmin = (credentials) => async (dispatch) => {
  dispatch(adminLoginStart());
  try {
    const response = await axiosInstance.post('/api/admin/login', credentials);
    const data = response.data;
    console.log(data);
    dispatch(adminLoginSuccess(data));
    // Save admin auth and token to localStorage if needed
    localStorage.setItem('adminAuth', JSON.stringify(data.admin));
    localStorage.setItem('adminAuthToken', data.token);
  } catch (error) {
    dispatch(adminLoginFailure(error.response?.data?.error || error.message));
  }
};

// Thunk action for admin registration
export const registerAdmin = (adminInfo) => async (dispatch) => {
  dispatch(adminRegisterStart());
  try {
    const response = await axiosInstance.post('/api/admin/register', adminInfo);
    const data = response.data;
    dispatch(adminRegisterSuccess(data));
  } catch (error) {
    dispatch(adminRegisterFailure(error.response?.data?.error || error.message));
  }
};
