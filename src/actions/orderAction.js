import axiosInstance from "../api/axiosInstance";
import {
  ORDER_REQUEST,
  ORDER_FAIL,
  USER_ORDER_SUCCESS,
  SELLER_ORDER_SUCCESS,
  ORDER_CREATE_SUCCESS,
  ORDER_UPDATE_SUCCESS,
  ORDER_DELETE_SUCCESS,
  ORDER_SUCCESS,
  GET_SPECIFIC_PRODUCTS_SUCCESS,
  FETCH_ACTIVE_ORDERS_SUCCESS,
} from "./actionTypes";

// Fetch Orders by User ID
export const fetchOrdersByUserId = (userId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    // console.log(userId);
    const { data } = await axiosInstance.get(`/api/orders/user/${userId}`);
    // console.log("User Response ",data)
    dispatch({ type: USER_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// Fetch Orders by Seller ID
export const fetchOrdersBySellerId = (sellerId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.get(`/api/orders/seller/${sellerId}`);
    console.log("Seller Response ", data);
    dispatch({ type: SELLER_ORDER_SUCCESS, payload: data });
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

// Create a new order
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.post(`/api/orders`, orderData);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// Update an existing order
export const updateOrder = (orderId, updateData) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.put(
      `/api/orders/${orderId}`,
      updateData
    );
    dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};
// Delete an existing order
export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    await axiosInstance.delete(`/api/orders/${orderId}`);
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: orderId });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};


// get Order as Accepted
export const markOrderAsAccepted = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.put(`/api/orders/${orderId}/accept`);
    dispatch({ type: GET_SPECIFIC_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// get Order as Sent to Courier
export const markOrderAsSentToCourier = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.put(
      `/api/orders/${orderId}/sendToCourier`
    );
    dispatch({ type: GET_SPECIFIC_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// get Order as Handed to Delivery Man
export const markOrderAsHandedToDeliveryMan = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.put(
      `/api/orders/${orderId}/handToDeliveryMan`
    );
    dispatch({ type: GET_SPECIFIC_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// get Order as Completed
export const markOrderAsCompleted = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.put(`/api/orders/${orderId}/complete`);
    dispatch({ type: GET_SPECIFIC_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// get Order as Rejected
export const markOrderAsRejected = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.put(`/api/orders/${orderId}/reject`);
    dispatch({ type: GET_SPECIFIC_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// Fetch orders with active statuses (like accepted, sent to courier, etc.)
export const fetchActiveOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.get(`/api/orders/status/active`);
    dispatch({ type: FETCH_ACTIVE_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// get Order as Accepted
export const getOrderAsAccepted = ({sellerId}) => async (dispatch) => {
  console.log(sellerId)
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.get(`/api/orders/${sellerId}/accept`);
    console.log(data)
    dispatch({ type: GET_SPECIFIC_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// get Order as Sent to Courier
export const getOrderAsSentToCourier = ({sellerId}) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.get(
      `/api/orders/${sellerId}/sendToCourier`
    );
    dispatch({ type: GET_SPECIFIC_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// get Order as Handed to Delivery Man
export const getOrderAsHandedToDeliveryMan = ({sellerId}) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.get(
      `/api/orders/${sellerId}/handToDeliveryMan`
    );
    dispatch({ type: GET_SPECIFIC_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// get Order as Completed
export const getOrderAsCompleted = ({sellerId}) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.get(`/api/orders/${sellerId}/complete`);
    dispatch({ type: GET_SPECIFIC_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};

// get Order as Rejected
export const getOrderAsRejected = ({sellerId}) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await axiosInstance.get(`/api/orders/${sellerId}/reject`);
    dispatch({ type: GET_SPECIFIC_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
  }
};


