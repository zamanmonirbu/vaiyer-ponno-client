import axiosInstance from "../api/axiosInstance";
import {
  MARK_ORDER_AS_FAILED_FAIL,
  MARK_ORDER_AS_COMPLETED_REQUEST,
  MARK_ORDER_AS_COMPLETED_SUCCESS,
  MARK_ORDER_AS_COMPLETED_FAIL,
  MARK_ORDER_AS_FAILED_REQUEST,
  MARK_ORDER_AS_FAILED_SUCCESS,
} from "./actionTypes";

// Mark Order as Completed
export const markOrderAsCompleted = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: MARK_ORDER_AS_COMPLETED_REQUEST });

    const { data } = await axiosInstance.put(`/api/orders/${orderId}/complete`);

    dispatch({
      type: MARK_ORDER_AS_COMPLETED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARK_ORDER_AS_COMPLETED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Mark Order as Failed
export const markOrderAsFailed = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: MARK_ORDER_AS_FAILED_REQUEST });

    const { data } = await axiosInstance.put(`/api/orders/${orderId}/fail`);

    dispatch({
      type: MARK_ORDER_AS_FAILED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARK_ORDER_AS_FAILED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
