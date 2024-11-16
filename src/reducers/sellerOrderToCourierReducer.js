import {
  SELLER_ORDER_TO_COURIER_DELETE,
  SELLER_ORDER_TO_COURIER_REQUEST,
  SELLER_ORDER_TO_COURIER_SUCCESS,
  SELLER_ORDER_TO_COURIER_FAIL,
  SELLER_ORDER_TO_COURIER_CREATE,
  SELLER_ORDER_TO_COURIER_UPDATE,
  ACCEPT_ORDER_REQUEST,
  GET_ACCEPT_ORDER_SUCCESS,
  ACCEPT_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  GET_REJECT_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../actions/actionTypes";

const initialState = {
  sellerOrdersToCourier: [], // List of all entries
  loading: false,
  error: null,
  orders: [],
};

// Reducer function
export const sellerOrderToCourierReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_ORDER_TO_COURIER_REQUEST:
    case ACCEPT_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case SELLER_ORDER_TO_COURIER_SUCCESS:
      return {
        ...state,
        loading: false,
        sellerOrdersToCourier: action.payload.data,
      };

    case GET_ACCEPT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case GET_REJECT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case SELLER_ORDER_TO_COURIER_CREATE:
      return {
        ...state,
        loading: false,
        sellerOrdersToCourier: [
          ...state.sellerOrdersToCourier,
          action.payload.data,
        ],
      };

    case SELLER_ORDER_TO_COURIER_UPDATE:
      return {
        ...state,
        loading: false,
        sellerOrdersToCourier: state.sellerOrdersToCourier.map((order) =>
          order._id === action.payload.data._id ? action.payload.data : order
        ),
      };

    case SELLER_ORDER_TO_COURIER_DELETE:
      return {
        ...state,
        loading: false,
        sellerOrdersToCourier: state.sellerOrdersToCourier.filter(
          (order) => order._id !== action.payload
        ),
      };

    case SELLER_ORDER_TO_COURIER_FAIL:
    case ACCEPT_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
