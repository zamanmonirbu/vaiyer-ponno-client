import axios from 'axios';
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
} from './actionTypes';

// Register DeliveryMan Action
export const registerDeliveryMan = (deliveryManData) => async (dispatch) => {
  try {
    dispatch({ type: DELIVERYMAN_REGISTER_REQUEST });

    // API call to register the deliveryMan
    const { data } = await axios.post('/api/deliveryman/register', deliveryManData);

    dispatch({
      type: DELIVERYMAN_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERYMAN_REGISTER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Login DeliveryMan Action
export const loginDeliveryMan = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: DELIVERYMAN_LOGIN_REQUEST });

    // API call to login the deliveryMan
    const { data } = await axios.post('/api/deliveryman/login', { email, password });

    dispatch({
      type: DELIVERYMAN_LOGIN_SUCCESS,
      payload: data,
    });

    // Save token in localStorage for further authentication
    localStorage.setItem('deliveryManToken', data.token);
  } catch (error) {
    dispatch({
      type: DELIVERYMAN_LOGIN_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Fetch DeliveryMan Profile Action
export const fetchDeliveryManProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELIVERYMAN_PROFILE_REQUEST });

    // API call to fetch the deliveryMan profile
    const { data } = await axios.get(`/api/deliveryman/profile/${id}`);

    dispatch({
      type: DELIVERYMAN_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERYMAN_PROFILE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Update DeliveryMan Profile Action
export const updateDeliveryManProfile = (id, profileData) => async (dispatch) => {
  try {
    dispatch({ type: DELIVERYMAN_UPDATE_PROFILE_REQUEST });

    // API call to update the deliveryMan profile
    const { data } = await axios.put(`/api/deliveryman/profile/${id}`, profileData);

    dispatch({
      type: DELIVERYMAN_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERYMAN_UPDATE_PROFILE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Clear DeliveryMan Data Action (for logout or reset)
export const clearDeliveryManData = () => (dispatch) => {
  dispatch({ type: DELIVERYMAN_CLEAR });
  localStorage.removeItem('deliveryManToken'); 
};
