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
} from '../actions/actionTypes';



const initialState = {
  sellers: [],
  seller: null,
  deactivatedSellers: [],
  loading: false,
  error: null,
};

const sellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_LOGIN_START:
    case SELLER_REGISTER_START:
    case FETCH_SELLERS_START:
    case FETCH_SELLER_BY_ID_START:
    case UPDATE_SELLER_START:
    case DELETE_SELLER_START:
    case FETCH_DEACTIVATED_SELLERS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

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
        seller: action.payload,
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

    case SELLER_LOGIN_FAILURE:
    case SELLER_REGISTER_FAILURE:
    case FETCH_SELLERS_FAILURE:
    case FETCH_SELLER_BY_ID_FAILURE:
    case UPDATE_SELLER_FAILURE:
    case DELETE_SELLER_FAILURE:
    case FETCH_DEACTIVATED_SELLERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default sellerReducer;
