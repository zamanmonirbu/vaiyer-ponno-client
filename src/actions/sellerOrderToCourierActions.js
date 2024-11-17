import {
  SELLER_ORDER_TO_COURIER_CREATE,
  SELLER_ORDER_TO_COURIER_DELETE,
  SELLER_ORDER_TO_COURIER_FAIL,
  SELLER_ORDER_TO_COURIER_REQUEST,
  SELLER_ORDER_TO_COURIER_SUCCESS,
  SELLER_ORDER_TO_COURIER_UPDATE,
  ACCEPT_ORDER_REQUEST,
  GET_ACCEPT_ORDER_SUCCESS,
  ACCEPT_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  GET_REJECT_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  
} from "./actionTypes";
import axiosInstance from "../api/axiosInstance";

const BASE_URL = "/api/sellerOrderToCourier";

// Fetch all seller orders to couriers
export const getSellerOrdersToCourier = (courierId) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_ORDER_TO_COURIER_REQUEST });

    const { data } = await axiosInstance.get(`${BASE_URL}/request/${courierId}`);
    console.log(data)
    dispatch({
      type: SELLER_ORDER_TO_COURIER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_ORDER_TO_COURIER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create a new seller order to courier entry
export const createSellerOrderToCourier = (entry) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_ORDER_TO_COURIER_REQUEST });

    const { data } = await axiosInstance.post(`${BASE_URL}`, entry);
    dispatch({
      type: SELLER_ORDER_TO_COURIER_CREATE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_ORDER_TO_COURIER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update an existing seller order to courier entry
export const updateSellerOrderToCourier =
  (dId, actionType) => async (dispatch) => {
    try {
      dispatch({ type: SELLER_ORDER_TO_COURIER_REQUEST });

      const { data } = await axiosInstance.put(`${BASE_URL}/${dId}`, {
        actionType,
      });
      dispatch({
        type: SELLER_ORDER_TO_COURIER_UPDATE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SELLER_ORDER_TO_COURIER_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// Delete a seller order to courier entry
export const deleteSellerOrderToCourier = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_ORDER_TO_COURIER_REQUEST });

    await axiosInstance.delete(`${BASE_URL}/${id}`);
    dispatch({
      type: SELLER_ORDER_TO_COURIER_DELETE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: SELLER_ORDER_TO_COURIER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Accept an order
export const acceptOrder = (courierId) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_ORDER_REQUEST });

    const { data } = await axiosInstance.get(`${BASE_URL}/accept/by/courier/${courierId}`);
    // console.log(data)
    dispatch({
      type: GET_ACCEPT_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCEPT_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete an order
export const deleteOrder = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

   const {data}= await axiosInstance.get(`${BASE_URL}/reject/by/courier`);
    dispatch({
      type: GET_REJECT_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
