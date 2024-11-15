import { PAYMENT_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAILURE,COD_REQUEST, COD_SUCCESS, COD_FAILURE,COD_CLEAR } from "../actions/actionTypes";

const initialState = {
  loading: false,
  success: false,
  error: null,
  paymentData: {},
  codData: {},
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

export const codReducer = (state = initialState, action) => {
  switch (action.type) {
    case COD_REQUEST:
      return { ...state, loading: true };

    case COD_SUCCESS:
      return { ...state, loading: false, success: true, codData: action.payload };

    case COD_FAILURE:
      return { ...state, loading: false, success: false, error: action.payload };

    case COD_CLEAR:
      return { ...initialState };

    default:
      return state;
  }
};