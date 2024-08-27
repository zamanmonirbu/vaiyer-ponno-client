import {
    FETCH_NOTIFICATIONS_START,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE
  } from '../actions/actionTypes';
  
  const initialState = {
    notifications: [], // Ensure this is an empty array initially
    loading: false,
    error: '',
  };
  
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NOTIFICATIONS_START:
        return {
          ...state,
          loading: true,
          error: '',
        };
      case FETCH_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          notifications: action.payload || [], // Ensure it defaults to an empty array if payload is undefined
        };
      case FETCH_NOTIFICATIONS_FAILURE:
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
  