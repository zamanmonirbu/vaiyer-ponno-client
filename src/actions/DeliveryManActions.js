// import {
//   DELIVERYMAN_LOGIN_FAIL,
//   DELIVERYMAN_LOGIN_REQUEST,
//   DELIVERYMAN_LOGIN_SUCCESS,
//   DELIVERYMAN_REGISTER_FAIL,
//   DELIVERYMAN_REGISTER_REQUEST,
//   DELIVERYMAN_REGISTER_SUCCESS,
//   DELIVERYMAN_PROFILE_REQUEST,
//   DELIVERYMAN_PROFILE_SUCCESS,
//   DELIVERYMAN_PROFILE_FAIL,
//   DELIVERYMAN_UPDATE_PROFILE_REQUEST,
//   DELIVERYMAN_UPDATE_PROFILE_SUCCESS,
//   DELIVERYMAN_UPDATE_PROFILE_FAIL,
//   DELIVERYMAN_CLEAR,
//   DELIVERYMAN_LIST_REQUEST,
//   DELIVERYMAN_LIST_SUCCESS,
//   DELIVERYMAN_LIST_FAIL,
//   FETCH_ASSIGNED_ORDERS_REQUEST,
//   FETCH_ASSIGNED_ORDERS_SUCCESS,
//   FETCH_ASSIGNED_ORDERS_FAILURE,
//   FETCH_REJECTED_ORDERS_REQUEST,
//   FETCH_REJECTED_ORDERS_SUCCESS,
//   FETCH_REJECTED_ORDERS_FAILURE,
//   FETCH_DELIVERED_ORDERS_REQUEST,
//   FETCH_DELIVERED_ORDERS_SUCCESS,
//   FETCH_DELIVERED_ORDERS_FAILURE,
// } from "./actionTypes";
// import axiosInstance from "../api/axiosInstance";
// import { setCookie } from "./cookieUtils";

// // Register DeliveryMan Action
// export const registerDeliveryMan = (deliveryManData) => async (dispatch) => {
//   try {
//     dispatch({ type: DELIVERYMAN_REGISTER_REQUEST });

//     // API call to register the deliveryMan
//     const { data } = await axiosInstance.post(
//       "/api/deliveryman/register",
//       deliveryManData
//     );

//     dispatch({
//       type: DELIVERYMAN_REGISTER_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELIVERYMAN_REGISTER_FAIL,
//       payload: error.response ? error.response.data.message : error.message,
//     });
//   }
// };

// // Login DeliveryMan Action
// export const loginDeliveryMan = (email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: DELIVERYMAN_LOGIN_REQUEST });

//     // API call to login the deliveryMan
//     const { data } = await axiosInstance.post("/api/deliveryman/login", {
//       email,
//       password,
//     });

//     setCookie("deliveryManAuth", JSON.stringify(data.deliveryMan), 7);
//     setCookie("deliveryManToken", data.token, 7);

//     dispatch({
//       type: DELIVERYMAN_LOGIN_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELIVERYMAN_LOGIN_FAIL,
//       payload: error.response ? error.response.data.message : error.message,
//     });
//   }
// };

// // Fetch DeliveryMan Profile Action
// export const fetchDeliveryManProfile = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELIVERYMAN_PROFILE_REQUEST });

//     // API call to fetch the deliveryMan profile
//     const { data } = await axiosInstance.get(`/api/deliveryman/profile/${id}`);

//     dispatch({
//       type: DELIVERYMAN_PROFILE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELIVERYMAN_PROFILE_FAIL,
//       payload: error.response ? error.response.data.message : error.message,
//     });
//   }
// };

// // Update DeliveryMan Profile Action
// export const updateDeliveryManProfile =
//   (id, profileData) => async (dispatch) => {
//     try {
//       dispatch({ type: DELIVERYMAN_UPDATE_PROFILE_REQUEST });

//       // API call to update the deliveryMan profile
//       const { data } = await axiosInstance.put(
//         `/api/deliveryman/profile/${id}`,
//         profileData
//       );

//       dispatch({
//         type: DELIVERYMAN_UPDATE_PROFILE_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: DELIVERYMAN_UPDATE_PROFILE_FAIL,
//         payload: error.response ? error.response.data.message : error.message,
//       });
//     }
//   };

// // Clear DeliveryMan Data Action (for logout or reset)
// export const clearDeliveryManData = () => (dispatch) => {
//   setCookie("deliveryManAuth", "", -1);
//   setCookie("deliveryManToken", "", -1);
//   dispatch({ type: DELIVERYMAN_CLEAR });
// };


// // Fetch all Delivery Men by Courier ID Action
// export const fetchDeliveryMenByCourier = (courierId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELIVERYMAN_LIST_REQUEST });

//     // API call to get delivery men by courier ID
//     const { data } = await axiosInstance.get(`/api/deliveryman/all/${courierId}`);
// console.log(data);
//     dispatch({
//       type: DELIVERYMAN_LIST_SUCCESS,
//       payload: data, // array of delivery men
//     });
//   } catch (error) {
//     dispatch({
//       type: DELIVERYMAN_LIST_FAIL,
//       payload: error.response ? error.response.data.message : error.message,
//     });
//   }
// };



// // Fetch assigned orders
// export const fetchAssignedOrders = (deliveryManId) => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_ASSIGNED_ORDERS_REQUEST });

//     const { data } = await axiosInstance.get(`/api/courierToDeliveryMan/assignments/${deliveryManId}`);
//     // console.log("accepted",data);
//     dispatch({ type: FETCH_ASSIGNED_ORDERS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: FETCH_ASSIGNED_ORDERS_FAILURE,
//       payload: error.response?.data.message || error.message,
//     });
//   }
// };

// // Fetch rejected orders
// export const fetchRejectedOrders = (deliveryManId) => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_REJECTED_ORDERS_REQUEST });

//     const { data } = await axiosInstance.get(`/api/courierToDeliveryMan/rejections/${deliveryManId}`);
//     console.log("Rejected",data);
//     dispatch({ type: FETCH_REJECTED_ORDERS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: FETCH_REJECTED_ORDERS_FAILURE,
//       payload: error.response?.data.message || error.message,
//     });
//   }
// };

// // Fetch delivered orders
// export const fetchDeliveredOrders = (deliveryManId) => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_DELIVERED_ORDERS_REQUEST });

//     const { data } = await axiosInstance.get(`/api/courierToDeliveryMan/deliveries/${deliveryManId}`);
//     console.log("Completed",data);

//     dispatch({ type: FETCH_DELIVERED_ORDERS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: FETCH_DELIVERED_ORDERS_FAILURE,
//       payload: error.response?.data.message || error.message,
//     });
//   }
// };