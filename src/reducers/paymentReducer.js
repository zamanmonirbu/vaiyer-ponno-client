import { PAYMENT_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAILURE } from "../actions/actionTypes";

const initialState = {
  loading: false,
  success: false,
  error: null,
  paymentData: {},
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return { ...state, loading: true };

    case PAYMENT_SUCCESS:
      return { ...state, loading: false, success: true, paymentData: action.payload };

    case PAYMENT_FAILURE:
      return { ...state, loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};
