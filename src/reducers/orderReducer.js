import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  USER_ORDER_SUCCESS,
  SELLER_ORDER_SUCCESS,
  ORDER_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_UPDATE_SUCCESS,
  ORDER_DELETE_SUCCESS,
  GET_SPECIFIC_PRODUCTS_SUCCESS,
  FETCH_ACTIVE_ORDERS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  userOrders: [],
  sellerOrders: [],
  order: null,
  error: null,
  specificOrder: [], 
  activeOrders:[],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case USER_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrders: action.payload, // Update user orders
      };

    case SELLER_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        sellerOrders: action.payload, // Update seller orders
      };

    case ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrders: [...state.userOrders, action.payload], // Add the new order
      };

    case ORDER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrders: state.userOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
        sellerOrders: state.sellerOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ), // Ensure seller orders are updated as well
      };

    case GET_SPECIFIC_PRODUCTS_SUCCESS: // Consider renaming
      return {
        ...state,
        loading: false,
        specificOrder: action.payload,
        error: null,
      };

      case FETCH_ACTIVE_ORDERS_SUCCESS:
        return {
          ...state,
          loading: false,
          activeOrders: action.payload, // Populate active orders
        };

    case ORDER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrders: state.userOrders.filter(
          (order) => order._id !== action.payload
        ),
        sellerOrders: state.sellerOrders.filter(
          (order) => order._id !== action.payload
        ), // Ensure seller orders are updated on deletion as well
      };

    case ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
