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
} from '../actions/actionTypes';

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

// Reducer function
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_START:
    case CREATE_NOTIFICATION_START:
    case UPDATE_NOTIFICATION_START:
    case DELETE_NOTIFICATION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };

    case CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: [...state.notifications, action.payload],
      };

    case UPDATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: state.notifications.map((notification) =>
          notification._id === action.payload._id ? action.payload : notification
        ),
      };

    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: state.notifications.filter(
          (notification) => notification._id !== action.payload
        ),
      };

    case FETCH_NOTIFICATIONS_FAILURE:
    case CREATE_NOTIFICATION_FAILURE:
    case UPDATE_NOTIFICATION_FAILURE:
    case DELETE_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default notificationReducer;
