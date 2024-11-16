import {
    DELIVERYMAN_LOGIN_REQUEST,
    DELIVERYMAN_LOGIN_SUCCESS,
    DELIVERYMAN_LOGIN_FAIL,
    DELIVERYMAN_REGISTER_REQUEST,
    DELIVERYMAN_REGISTER_SUCCESS,
    DELIVERYMAN_REGISTER_FAIL,
    DELIVERYMAN_PROFILE_REQUEST,
    DELIVERYMAN_PROFILE_SUCCESS,
    DELIVERYMAN_PROFILE_FAIL,
    DELIVERYMAN_CLEAR,
    DELIVERYMAN_UPDATE_PROFILE_REQUEST,
    DELIVERYMAN_UPDATE_PROFILE_SUCCESS,
    DELIVERYMAN_UPDATE_PROFILE_FAIL,
    DELIVERYMAN_LIST_REQUEST,
  DELIVERYMAN_LIST_SUCCESS,
  DELIVERYMAN_LIST_FAIL,
  } from "../actions/actionTypes";
  
  const deliveryManInitialState = {
    loading: false,
    deliveryManInfo: null,
    profile: null,
    success: false,
    error: null,
    deliveryMen: [],

  };
  
  const deliveryManReducer = (state = deliveryManInitialState, action) => {
    switch (action.type) {
      case DELIVERYMAN_LOGIN_REQUEST:
        return { ...state, loading: true, error: null }; // reset error on request
      case DELIVERYMAN_LOGIN_SUCCESS:
        return { ...state, loading: false, deliveryManInfo: action.payload, error: null };
      case DELIVERYMAN_LOGIN_FAIL:
        return { ...state, loading: false, error: action.payload, deliveryManInfo: null };
  
      case DELIVERYMAN_REGISTER_REQUEST:
        return { ...state, loading: true, error: null }; // reset error on request
      case DELIVERYMAN_REGISTER_SUCCESS:
        return { ...state, loading: false, success: true, error: null };
      case DELIVERYMAN_REGISTER_FAIL:
        return { ...state, loading: false, error: action.payload, success: false };
  
      case DELIVERYMAN_PROFILE_REQUEST:
        return { ...state, loading: true, error: null }; // reset error on request
      case DELIVERYMAN_PROFILE_SUCCESS:
        return { ...state, loading: false, profile: action.payload, error: null };
      case DELIVERYMAN_PROFILE_FAIL:
        return { ...state, loading: false, error: action.payload, profile: null };
  
      case DELIVERYMAN_UPDATE_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
      case DELIVERYMAN_UPDATE_PROFILE_SUCCESS:
        return { ...state, loading: false, profile: action.payload, success: true, error: null };
      case DELIVERYMAN_UPDATE_PROFILE_FAIL:
        return { ...state, loading: false, error: action.payload, success: false };

        case DELIVERYMAN_LIST_REQUEST:
          return { ...state, loading: true, error: null }; // reset error on request
        case DELIVERYMAN_LIST_SUCCESS:
          return { ...state, loading: false, deliveryMen: action.payload, error: null };
        case DELIVERYMAN_LIST_FAIL:
          return { ...state, loading: false, error: action.payload, deliveryMen: [] };
        
  
      case DELIVERYMAN_CLEAR:
        return { ...deliveryManInitialState }; // reset all state to initial
  
      default:
        return state;
    }
  };
  
  export default deliveryManReducer;
  