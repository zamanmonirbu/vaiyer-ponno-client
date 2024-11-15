import {
  COURIER_LOGIN_REQUEST,
  COURIER_LOGIN_SUCCESS,
  COURIER_LOGIN_FAIL,
  COURIER_REGISTER_REQUEST,
  COURIER_REGISTER_SUCCESS,
  COURIER_REGISTER_FAIL,
  COURIER_CLEAR,
  COURIER_PROFILE_REQUEST,
  COURIER_PROFILE_SUCCESS,
  COURIER_PROFILE_FAIL,
  COURIER_UPDATE_PROFILE_REQUEST,
  COURIER_UPDATE_PROFILE_SUCCESS,
  COURIER_UPDATE_PROFILE_FAIL,

} from "./actionTypes";
import axiosInstance from "../api/axiosInstance";
import { setCookie } from "./cookieUtils";

// Courier Register Action
export const courierRegister = (formData) => async (dispatch) => {
  try {
    dispatch({ type: COURIER_REGISTER_REQUEST });
    const { data } = await axiosInstance.post(
      "/api/couriers/register",
      formData
    );
    dispatch({ type: COURIER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURIER_REGISTER_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Courier Login Action
export const courierLogin = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: COURIER_LOGIN_REQUEST });
    const { data } = await axiosInstance.post(
      "/api/couriers/login",
      credentials
    );
    setCookie("courierAuth", JSON.stringify(data.loginResponse), 7);
    setCookie("courierToken", data.token, 7);
    dispatch({ type: COURIER_LOGIN_SUCCESS, payload: data.loginResponse });
  } catch (error) {
    dispatch({
      type: COURIER_LOGIN_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Courier Profile by ID Action
export const getCourierProfileById = (courierId) => async (dispatch) => {
  try {
    dispatch({ type: COURIER_PROFILE_REQUEST });
    const { data } = await axiosInstance.get(
      `/api/couriers/profile/${courierId}`
    );
    dispatch({ type: COURIER_PROFILE_SUCCESS, payload: data.profile });
  } catch (error) {
    dispatch({
      type: COURIER_PROFILE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateCourierProfile = (courierId, updateData) => async (dispatch) => {
  console.log(courierId);
  try {
    dispatch({ type: COURIER_UPDATE_PROFILE_REQUEST });
    const { data } = await axiosInstance.put(`/api/couriers/profile/${courierId}`, updateData);
    dispatch({ type: COURIER_UPDATE_PROFILE_SUCCESS, payload: data.updatedProfile });
  } catch (error) {
    dispatch({
      type: COURIER_UPDATE_PROFILE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Courier Clear Action
export const courierClear = () => (dispatch) => {
  // Clear cookies or any persisted data if needed
  setCookie("courierAuth", "", -1);
  setCookie("courierToken", "", -1);

  dispatch({ type: COURIER_CLEAR });
};
