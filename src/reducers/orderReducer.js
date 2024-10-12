import {  ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL } from "../actions/actionTypes";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { ...state, loading: true };

    case ORDER_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
