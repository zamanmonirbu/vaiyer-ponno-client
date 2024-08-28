import axiosInstance from '../api/axiosInstance';
import {
  SELLER_LOGIN_START,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGIN_FAILURE,
  SELLER_REGISTER_START,
  SELLER_REGISTER_SUCCESS,
  SELLER_REGISTER_FAILURE,
} from './actionTypes';

// Action creator for seller login start
export const sellerLoginStart = () => ({
  type: SELLER_LOGIN_START,
});

// Action creator for seller login success
export const sellerLoginSuccess = (seller) => ({
  type: SELLER_LOGIN_SUCCESS,
  payload: seller,
});

// Action creator for seller login failure
export const sellerLoginFailure = (error) => ({
  type: SELLER_LOGIN_FAILURE,
  payload: error,
});

// Action creator for seller registration start
export const sellerRegisterStart = () => ({
  type: SELLER_REGISTER_START,
});

// Action creator for seller registration success
export const sellerRegisterSuccess = (seller) => ({
  type: SELLER_REGISTER_SUCCESS,
  payload: seller,
});

// Action creator for seller registration failure
export const sellerRegisterFailure = (error) => ({
  type: SELLER_REGISTER_FAILURE,
  payload: error,
});

// Thunk action for seller login
export const loginSeller = (credentials) => async (dispatch) => {
  dispatch(sellerLoginStart());
  console.log(credentials)
  try {
    const response = await axiosInstance.post('/api/seller/login', credentials);
    const data = response.data;
    console.log(data);
    dispatch(sellerLoginSuccess(data));
    // Save seller auth and token to localStorage if needed
    localStorage.setItem('sellerAuth', JSON.stringify(data.seller));
    localStorage.setItem('sellerAuthToken', data.token);
  } catch (error) {
    dispatch(sellerLoginFailure(error.response?.data?.error || error.message));
  }
};

// Thunk action for seller registration
export const registerSeller = (sellerInfo) => async (dispatch) => {
  dispatch(sellerRegisterStart());
  try {
    const response = await axiosInstance.post('/api/seller/register', sellerInfo);
    const data = response.data;
    dispatch(sellerRegisterSuccess(data));
  } catch (error) {
    dispatch(sellerRegisterFailure(error.response?.data?.error || error.message));
  }
};
