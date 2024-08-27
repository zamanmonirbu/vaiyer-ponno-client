import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
  } from '../actions/actionTypes';
  
  const initialState = {
    currentUser: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_START:
      case REGISTER_START:
        return { ...state, loading: true };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return { ...state, loading: false, currentUser: action.payload };
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  