import axiosInstance from "../api/axiosInstance";
import { setCookie } from "./cookieUtils";

import {
  DELIVERYMAN_LOGIN_FAIL,
  DELIVERYMAN_LOGIN_REQUEST,
  DELIVERYMAN_LOGIN_SUCCESS,
  DELIVERYMAN_REGISTER_FAIL,
  DELIVERYMAN_REGISTER_REQUEST,
  DELIVERYMAN_REGISTER_SUCCESS,
  DELIVERYMAN_PROFILE_REQUEST,
  DELIVERYMAN_PROFILE_SUCCESS,
  DELIVERYMAN_PROFILE_FAIL,
  DELIVERYMAN_UPDATE_PROFILE_REQUEST,
  DELIVERYMAN_UPDATE_PROFILE_SUCCESS,
  DELIVERYMAN_UPDATE_PROFILE_FAIL,
  DELIVERYMAN_CLEAR,
  DELIVERYMAN_LIST_REQUEST,
  DELIVERYMAN_LIST_SUCCESS,
  DELIVERYMAN_LIST_FAIL,
  FETCH_ASSIGNED_ORDERS_REQUEST,
  FETCH_ASSIGNED_ORDERS_SUCCESS,
  FETCH_ASSIGNED_ORDERS_FAILURE,
  FETCH_REJECTED_ORDERS_REQUEST,
  FETCH_REJECTED_ORDERS_SUCCESS,
  FETCH_REJECTED_ORDERS_FAILURE,
  FETCH_DELIVERED_ORDERS_REQUEST,
  FETCH_DELIVERED_ORDERS_SUCCESS,
  FETCH_DELIVERED_ORDERS_FAILURE,
  ASSIGN_ORDER_REQUEST,
  ASSIGN_ORDER_SUCCESS,
  ASSIGN_ORDER_FAIL,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS,
  FETCH_ASSIGNMENTS_FAIL,
  UPDATE_DELIVERY_STATUS_REQUEST,
  UPDATE_DELIVERY_STATUS_SUCCESS,
  UPDATE_DELIVERY_STATUS_FAIL,
  DELETE_ASSIGNMENT_REQUEST,
  DELETE_ASSIGNMENT_SUCCESS,
  DELETE_ASSIGNMENT_FAIL,
  UPDATE_ASSIGNMENT_STATUS_SUCCESS,
  UPDATE_ASSIGNMENT_STATUS_FAIL,
} from "./actionTypes";

// Register Delivery Man
export const registerDeliveryMan = (deliveryManData) => async (dispatch) => {
  try {
    dispatch({ type: DELIVERYMAN_REGISTER_REQUEST });
    const { data } = await axiosInstance.post("/api/deliveryman/register", deliveryManData);
    dispatch({ type: DELIVERYMAN_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELIVERYMAN_REGISTER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Login Delivery Man
export const loginDeliveryMan = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: DELIVERYMAN_LOGIN_REQUEST });
    const { data } = await axiosInstance.post("/api/deliveryman/login", { email, password });
    setCookie("deliveryManAuth", JSON.stringify(data.deliveryMan), 7);
    setCookie("deliveryManToken", data.token, 7);
    dispatch({ type: DELIVERYMAN_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELIVERYMAN_LOGIN_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Fetch Delivery Man Profile
export const fetchDeliveryManProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELIVERYMAN_PROFILE_REQUEST });
    const { data } = await axiosInstance.get(`/api/deliveryman/profile/${id}`);
    dispatch({ type: DELIVERYMAN_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELIVERYMAN_PROFILE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Update Delivery Man Profile
export const updateDeliveryManProfile = (id, profileData) => async (dispatch) => {
  try {
    dispatch({ type: DELIVERYMAN_UPDATE_PROFILE_REQUEST });
    const { data } = await axiosInstance.put(`/api/deliveryman/profile/${id}`, profileData);

    console.log(profileData)
    dispatch({ type: DELIVERYMAN_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELIVERYMAN_UPDATE_PROFILE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Clear Delivery Man Data (Logout or Reset)
export const clearDeliveryManData = () => (dispatch) => {
  setCookie("deliveryManAuth", "", -1);
  setCookie("deliveryManToken", "", -1);
  dispatch({ type: DELIVERYMAN_CLEAR });
};

// Fetch Delivery Men by Courier ID
export const fetchDeliveryMenByCourier = (courierId) => async (dispatch) => {
  try {
    dispatch({ type: DELIVERYMAN_LIST_REQUEST });
    const { data } = await axiosInstance.get(`/api/deliveryman/all/${courierId}`);
    dispatch({ type: DELIVERYMAN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELIVERYMAN_LIST_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Fetch Assigned Orders
export const fetchAssignedOrders = (deliveryManId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ASSIGNED_ORDERS_REQUEST });
    const { data } = await axiosInstance.get(`/api/courierToDeliveryMan/assignments/${deliveryManId}`);
    dispatch({ type: FETCH_ASSIGNED_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ASSIGNED_ORDERS_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Fetch Rejected Orders
export const fetchRejectedOrders = (deliveryManId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_REJECTED_ORDERS_REQUEST });
    const { data } = await axiosInstance.get(`/api/courierToDeliveryMan/rejections/${deliveryManId}`);
    dispatch({ type: FETCH_REJECTED_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_REJECTED_ORDERS_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Fetch Delivered Orders
export const fetchDeliveredOrders = (deliveryManId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DELIVERED_ORDERS_REQUEST });
    const { data } = await axiosInstance.get(`/api/courierToDeliveryMan/deliveries/${deliveryManId}`);
    dispatch({ type: FETCH_DELIVERED_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_DELIVERED_ORDERS_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Assign Order
export const assignOrder = (data) => async (dispatch) => {
  try {
    dispatch({ type: ASSIGN_ORDER_REQUEST });
    const response = await axiosInstance.post(`/api/courierToDeliveryMan`, data);
    dispatch({ type: ASSIGN_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: ASSIGN_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Delivery Status
export const updateDeliveryStatus = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DELIVERY_STATUS_REQUEST });
    const response = await axiosInstance.patch(`/api/courierToDeliveryMan/${id}`, data);
    dispatch({ type: UPDATE_DELIVERY_STATUS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: UPDATE_DELIVERY_STATUS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete Assignment
export const deleteAssignment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ASSIGNMENT_REQUEST });
    await axiosInstance.delete(`/api/courierToDeliveryMan/${id}`);
    dispatch({ type: DELETE_ASSIGNMENT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_ASSIGNMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch Assignments
export const fetchAssignments = (deliveryManId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ASSIGNMENTS_REQUEST });
    const { data } = await axiosInstance.get(`/api/courierToDeliveryMan/request/to/delivery/man/${deliveryManId}`);
    dispatch({ type: FETCH_ASSIGNMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ASSIGNMENTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Assignment Status
export const updateAssignmentStatus = ({ assignmentId, actionType }) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/api/courierToDeliveryMan/update/${assignmentId}`, { actionType });
    dispatch({ type: UPDATE_ASSIGNMENT_STATUS_SUCCESS, payload: { assignmentId, actionType } });
  } catch (error) {
    dispatch({
      type: UPDATE_ASSIGNMENT_STATUS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
