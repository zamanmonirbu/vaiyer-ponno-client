import {
  SELLER_LOGIN_START,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGIN_FAILURE,
  SELLER_REGISTER_START,
  SELLER_REGISTER_SUCCESS,
  SELLER_REGISTER_FAILURE,
  FETCH_SELLERS_START,
  FETCH_SELLERS_SUCCESS,
  FETCH_SELLERS_FAILURE,
  FETCH_SELLER_BY_ID_START,
  FETCH_SELLER_BY_ID_SUCCESS,
  FETCH_SELLER_BY_ID_FAILURE,
  UPDATE_SELLER_START,
  UPDATE_SELLER_SUCCESS,
  UPDATE_SELLER_FAILURE,
  DELETE_SELLER_START,
  DELETE_SELLER_SUCCESS,
  DELETE_SELLER_FAILURE,
  FETCH_DEACTIVATED_SELLERS_START,
  FETCH_DEACTIVATED_SELLERS_SUCCESS,
  FETCH_DEACTIVATED_SELLERS_FAILURE,
  FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_START,
  FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_SUCCESS,
  FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_FAILURE,
  CLEAR_SELLER_STATE,  // Add this for clearing seller state
} from '../actions/actionTypes';

const initialState = {
  sellers: [],
  seller: null,
  success: null,
  deactivatedSellers: [],
  loading: false,
  error: null,
  products: [],
};

const sellerReducer = (state = initialState, action) => {
  switch (action.type) {
    // Start actions
    case SELLER_LOGIN_START:
    case SELLER_REGISTER_START:
    case FETCH_SELLERS_START:
    case FETCH_SELLER_BY_ID_START:
    case UPDATE_SELLER_START:
    case DELETE_SELLER_START:
    case FETCH_DEACTIVATED_SELLERS_START:
    case FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success actions
    case SELLER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        seller: action.payload,
      };

    case SELLER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FETCH_SELLERS_SUCCESS:
      return {
        ...state,
        loading: false,
        sellers: action.payload,
      };

    case FETCH_SELLER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        seller: action.payload,
      };

    case UPDATE_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        seller: action.payload,
      };

    case DELETE_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        sellers: state.sellers.filter((seller) => seller.id !== action.payload),
      };

    case FETCH_DEACTIVATED_SELLERS_SUCCESS:
      return {
        ...state,
        loading: false,
        deactivatedSellers: action.payload,
      };

    case FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    // Failure actions
    case SELLER_LOGIN_FAILURE:
    case SELLER_REGISTER_FAILURE:
    case FETCH_SELLERS_FAILURE:
    case FETCH_SELLER_BY_ID_FAILURE:
    case UPDATE_SELLER_FAILURE:
    case DELETE_SELLER_FAILURE:
    case FETCH_DEACTIVATED_SELLERS_FAILURE:
    case FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear seller state
    case CLEAR_SELLER_STATE:
      return {
        ...state,
        seller: null,
        success: null,
        products: [],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default sellerReducer;
