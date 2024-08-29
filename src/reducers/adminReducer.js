
import {
  ADMIN_CREATE_START,
  ADMIN_CREATE_SUCCESS,
  ADMIN_CREATE_FAILURE,
  ADMIN_READ_START,
  ADMIN_READ_SUCCESS,
  ADMIN_READ_FAILURE,
  ADMIN_UPDATE_START,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAILURE,
  ADMIN_DELETE_START,
  ADMIN_DELETE_SUCCESS,
  ADMIN_DELETE_FAILURE,
  REQUEST_ADMINS_REQUEST,
  REQUEST_ADMINS_SUCCESS,
  REQUEST_ADMINS_FAIL,
  ACCEPT_ADMIN_SUCCESS,
  REJECT_ADMIN_SUCCESS
} from '../actions/actionTypes';




export const adminRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADMIN_REGISTER_REQUEST':
        return { loading: true };
      case 'ADMIN_REGISTER_SUCCESS':
        return { loading: false, success: true };
      case 'ADMIN_REGISTER_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const adminLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADMIN_LOGIN_REQUEST':
        return { loading: true };
      case 'ADMIN_LOGIN_SUCCESS':
        return { loading: false, adminInfo: action.payload };
      case 'ADMIN_LOGIN_FAIL':
        return { loading: false, error: action.payload };
      case 'ADMIN_LOGOUT':
        return {};
      default:
        return state;
    }
  };
  
  
  // Reducer for handling admin creation
  export const adminCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_CREATE_START:
        return { loading: true };
      case ADMIN_CREATE_SUCCESS:
        return { loading: false, success: true, admin: action.payload };
      case ADMIN_CREATE_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for handling admin reading
  export const adminReadReducer = (state = { admins: [] }, action) => {
    switch (action.type) {
      case ADMIN_READ_START:
        return { loading: true, ...state };
      case ADMIN_READ_SUCCESS:
        return { loading: false, admins: action.payload };
      case ADMIN_READ_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for handling admin updating
  export const adminUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_UPDATE_START:
        return { loading: true };
      case ADMIN_UPDATE_SUCCESS:
        return { loading: false, success: true, admin: action.payload };
      case ADMIN_UPDATE_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for handling admin deletion
  export const adminDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DELETE_START:
        return { loading: true };
      case ADMIN_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ADMIN_DELETE_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const adminRequestsReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
      case REQUEST_ADMINS_REQUEST:
        return { loading: true, requests: [] };
      
      case REQUEST_ADMINS_SUCCESS:
        return { loading: false, requests: action.payload };
      
      case REQUEST_ADMINS_FAIL:
        return { loading: false, error: action.payload };
      
      case ACCEPT_ADMIN_SUCCESS:
      case REJECT_ADMIN_SUCCESS:
        return {
          ...state,
          requests: state.requests.filter(request => request._id !== action.payload),
        };
      
      default:
        return state;
    }
  };