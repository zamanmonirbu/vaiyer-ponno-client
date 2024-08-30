import axiosInstance from '../api/axiosInstance';
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  CREATE_NOTIFICATION_START,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_START,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FAILURE,
  DELETE_NOTIFICATION_START,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILURE
} from './actionTypes';

// Action creators for fetch notifications
export const fetchNotificationsStart = () => ({
  type: FETCH_NOTIFICATIONS_START,
});

export const fetchNotificationsSuccess = (notifications) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  payload: notifications,
});

export const fetchNotificationsFailure = (error) => ({
  type: FETCH_NOTIFICATIONS_FAILURE,
  payload: error,
});

// Thunk action for fetching notifications
export const fetchNotifications = () => async (dispatch) => {
  dispatch(fetchNotificationsStart());
  try {
    const response = await axiosInstance.get('/api/notifications/public');
    dispatch(fetchNotificationsSuccess(response.data));
  } catch (error) {
    dispatch(fetchNotificationsFailure(error.response?.data?.error || error.message));
  }
};

// Action creators for create notification
export const createNotificationStart = () => ({
  type: CREATE_NOTIFICATION_START,
});

export const createNotificationSuccess = (notification) => ({
  type: CREATE_NOTIFICATION_SUCCESS,
  payload: notification,
});

export const createNotificationFailure = (error) => ({
  type: CREATE_NOTIFICATION_FAILURE,
  payload: error,
});

// Thunk action for creating notification
export const createNotification = (notificationData) => async (dispatch) => {
  dispatch(createNotificationStart());
  try {
    const response = await axiosInstance.post('/api/notifications', notificationData);
    dispatch(createNotificationSuccess(response.data));
  } catch (error) {
    dispatch(createNotificationFailure(error.response?.data?.error || error.message));
  }
};

// Action creators for update notification
export const updateNotificationStart = () => ({
  type: UPDATE_NOTIFICATION_START,
});

export const updateNotificationSuccess = (notification) => ({
  type: UPDATE_NOTIFICATION_SUCCESS,
  payload: notification,
});

export const updateNotificationFailure = (error) => ({
  type: UPDATE_NOTIFICATION_FAILURE,
  payload: error,
});

// Thunk action for updating notification
export const updateNotification = (id, notificationData) => async (dispatch) => {
  dispatch(updateNotificationStart());
  try {
    const response = await axiosInstance.put(`/api/notifications/${id}`, notificationData);
    dispatch(updateNotificationSuccess(response.data));
  } catch (error) {
    dispatch(updateNotificationFailure(error.response?.data?.error || error.message));
  }
};

// Action creators for delete notification
export const deleteNotificationStart = () => ({
  type: DELETE_NOTIFICATION_START,
});

export const deleteNotificationSuccess = (id) => ({
  type: DELETE_NOTIFICATION_SUCCESS,
  payload: id,
});

export const deleteNotificationFailure = (error) => ({
  type: DELETE_NOTIFICATION_FAILURE,
  payload: error,
});

// Thunk action for deleting notification
export const deleteNotification = (id) => async (dispatch) => {
  dispatch(deleteNotificationStart());
  try {
    await axiosInstance.delete(`/api/notifications/${id}`);
    dispatch(deleteNotificationSuccess(id));
  } catch (error) {
    dispatch(deleteNotificationFailure(error.response?.data?.error || error.message));
  }
};
