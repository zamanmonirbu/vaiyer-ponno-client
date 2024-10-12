
import {
  ADMIN_LOGIN_START,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_REGISTER_START,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAILURE,
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
  REJECT_ADMIN_SUCCESS,
  ADMIN_GET_BY_ID_START,
  ADMIN_GET_BY_ID_SUCCESS,
  ADMIN_GET_BY_ID_FAILURE,
  CLEAR_ADMIN_STATE,
} from '../actions/actionTypes';

const initialState = {
  admin: null,
  admins: [],
  loading: false,
  error: null,
  success: false,
  requests: [],
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_START:
    case ADMIN_REGISTER_START:
    case ADMIN_CREATE_START:
    case ADMIN_READ_START:
    case ADMIN_UPDATE_START:
    case ADMIN_DELETE_START:
    case ADMIN_GET_BY_ID_START:
    case REQUEST_ADMINS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admin: action.payload,
      };

    case ADMIN_REGISTER_SUCCESS:
    case ADMIN_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        admin: action.payload,
      };

    case ADMIN_READ_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: action.payload,
      };

    case ADMIN_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        admin: action.payload,
      };

    case ADMIN_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case ADMIN_GET_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        admin: action.payload,
      };

    case REQUEST_ADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload,
      };

    case ACCEPT_ADMIN_SUCCESS:
    case REJECT_ADMIN_SUCCESS:
      return {
        ...state,
        requests: state.requests.filter((req) => req._id !== action.payload),
      };

    case ADMIN_LOGIN_FAILURE:
    case ADMIN_REGISTER_FAILURE:
    case ADMIN_CREATE_FAILURE:
    case ADMIN_READ_FAILURE:
    case ADMIN_UPDATE_FAILURE:
    case ADMIN_DELETE_FAILURE:
    case ADMIN_GET_BY_ID_FAILURE:
    case REQUEST_ADMINS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ADMIN_STATE:
      return {
        ...state, admin: null,
        admins: [],
        loading: false,
        error: null,
        success: false,
        requests: [],
      };

    default:
      return state;
  }
};
