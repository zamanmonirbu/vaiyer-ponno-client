// reducers/orderReducer.js

import {
  MARK_ORDER_AS_FAILED_FAIL,
  MARK_ORDER_AS_COMPLETED_REQUEST,
  MARK_ORDER_AS_COMPLETED_SUCCESS,
  MARK_ORDER_AS_COMPLETED_FAIL,
  MARK_ORDER_AS_FAILED_REQUEST,
  MARK_ORDER_AS_FAILED_SUCCESS,
} from "../actions/actionTypes";


export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    // Mark as Completed
    case MARK_ORDER_AS_COMPLETED_REQUEST:
      return { loading: true };
    case MARK_ORDER_AS_COMPLETED_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case MARK_ORDER_AS_COMPLETED_FAIL:
      return { loading: false, error: action.payload };

    // Mark as Failed
    case MARK_ORDER_AS_FAILED_REQUEST:
      return { loading: true };
    case MARK_ORDER_AS_FAILED_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case MARK_ORDER_AS_FAILED_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
