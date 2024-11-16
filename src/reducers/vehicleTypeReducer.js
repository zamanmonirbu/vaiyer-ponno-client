import {
    VEHICLETYPE_CREATE_REQUEST,
    VEHICLETYPE_CREATE_SUCCESS,
    VEHICLETYPE_CREATE_FAIL,
    VEHICLETYPE_GET_ALL_REQUEST,
    VEHICLETYPE_GET_ALL_SUCCESS,
    VEHICLETYPE_GET_ALL_FAIL,
    VEHICLETYPE_GET_BY_ID_REQUEST,
    VEHICLETYPE_GET_BY_ID_SUCCESS,
    VEHICLETYPE_GET_BY_ID_FAIL,
    VEHICLETYPE_UPDATE_REQUEST,
    VEHICLETYPE_UPDATE_SUCCESS,
    VEHICLETYPE_UPDATE_FAIL,
    VEHICLETYPE_DELETE_REQUEST,
    VEHICLETYPE_DELETE_SUCCESS,
    VEHICLETYPE_DELETE_FAIL,
  } from '../actions/actionTypes';
  
  const initialState = {
    loading: false,
    vehicleTypes: [],
    vehicleType: null,
    success: false,
    error: null,
  };
  
  // VehicleType Reducer
  const vehicleTypeReducer = (state = initialState, action) => {
    switch (action.type) {
      case VEHICLETYPE_CREATE_REQUEST:
      case VEHICLETYPE_GET_ALL_REQUEST:
      case VEHICLETYPE_GET_BY_ID_REQUEST:
      case VEHICLETYPE_UPDATE_REQUEST:
      case VEHICLETYPE_DELETE_REQUEST:
        return { ...state, loading: true, error: null };
  
      case VEHICLETYPE_CREATE_SUCCESS:
        return { ...state, loading: false, success: true, vehicleType: action.payload };
  
      case VEHICLETYPE_GET_ALL_SUCCESS:
        console.log(action.payload)
        return { ...state, loading: false, vehicleTypes: action.payload };
  
      case VEHICLETYPE_GET_BY_ID_SUCCESS:
        return { ...state, loading: false, vehicleType: action.payload };
  
      case VEHICLETYPE_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          vehicleType: action.payload,
          vehicleTypes: state.vehicleTypes.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        };
  
      case VEHICLETYPE_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          vehicleTypes: state.vehicleTypes.filter(
            (vehicleType) => vehicleType._id !== action.payload
          ),
        };
  
      case VEHICLETYPE_CREATE_FAIL:
      case VEHICLETYPE_GET_ALL_FAIL:
      case VEHICLETYPE_GET_BY_ID_FAIL:
      case VEHICLETYPE_UPDATE_FAIL:
      case VEHICLETYPE_DELETE_FAIL:
        return { ...state, loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export default vehicleTypeReducer;
  