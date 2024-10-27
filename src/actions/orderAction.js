import axiosInstance from "../api/axiosInstance";
import { ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "./actionTypes";


// Fetch Orders by User ID
export const fetchOrdersByUserId = (userId) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_REQUEST });
      // console.log(userId);
      const { data } = await axiosInstance.get(`/api/orders/user/${userId}`);
      // console.log(data)
      dispatch({ type: ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_FAIL, payload: error.message });
    }
  };
  
  // Fetch Orders by Seller ID
  export const fetchOrdersBySellerId = (sellerId) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_REQUEST });
      const { data } = await axiosInstance.get(`/api/orders/seller/${sellerId}`);
      dispatch({ type: ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_FAIL, payload: error.message });
    }
  };

  // Fetch Order by Order ID
export const fetchOrderById = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.get(`/api/orders/success/${orderId}`);
    // console.log("data",data);
    dispatch({ type: ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};