import axiosInstance from "../api/axiosInstance";
import {
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
    UPDATE_ASSIGNMENT_STATUS_FAIL,
    UPDATE_ASSIGNMENT_STATUS_SUCCESS,
    // UPDATE_ASSIGNMENT_STATUS_REQUEST
  }  from "./actionTypes";

// Assign order
export const assignOrder = (data) => async (dispatch) => {
  try {
    dispatch({ type: ASSIGN_ORDER_REQUEST });

    const response = await axiosInstance.post(`/api/courierToDeliveryMan`, data);

    dispatch({
      type: ASSIGN_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ASSIGN_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update delivery status
export const updateDeliveryStatus = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DELIVERY_STATUS_REQUEST });

    const response = await axiosInstance.patch(`/api/courierToDeliveryMan/${id}`, data);

    dispatch({
      type: UPDATE_DELIVERY_STATUS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DELIVERY_STATUS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete assignment
export const deleteAssignment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ASSIGNMENT_REQUEST });

    await axiosInstance.delete(`/api/courierToDeliveryMan/${id}`);

    dispatch({
      type: DELETE_ASSIGNMENT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ASSIGNMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


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
