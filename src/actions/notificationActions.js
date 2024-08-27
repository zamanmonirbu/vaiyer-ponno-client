import axiosInstance from '../api/axiosInstance'; // Import Axios instance
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE
} from '../actions/actionTypes';

// Action creator for fetch notifications start
export const fetchNotificationsStart = () => ({
  type: FETCH_NOTIFICATIONS_START,
});

// Action creator for fetch notifications success
export const fetchNotificationsSuccess = (notifications) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  payload: notifications,
});

// Action creator for fetch notifications failure
export const fetchNotificationsFailure = (error) => ({
  type: FETCH_NOTIFICATIONS_FAILURE,
  payload: error,
});

// Thunk action for fetching notifications
export const fetchNotifications = () => async (dispatch) => {
  dispatch(fetchNotificationsStart());
  // console.log(axiosInstance)
  try {
    const response = await axiosInstance.get('/api/notifications/public');
    dispatch(fetchNotificationsSuccess(response.data)); 
  } catch (error) {
    dispatch(fetchNotificationsFailure(error.response?.data?.error || error.message));
  }
};
