import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
  GET_SELLER_PRODUCTS,
  GET_MOST_RATED_PRODUCTS_REQUEST,
  GET_MOST_RATED_PRODUCTS_SUCCESS,
  GET_MOST_RATED_PRODUCTS_FAILURE,
  GET_PRODUCTS_WITH_HIGH_OFFER_REQUEST,
  GET_PRODUCTS_WITH_HIGH_OFFER_SUCCESS,
  GET_PRODUCTS_WITH_HIGH_OFFER_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  mostRatedProducts: [],
  highOfferProducts: [],
  products: [],
  product: null,
  loading: true,
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_SELLER_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_MOST_RATED_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_MOST_RATED_PRODUCTS_SUCCESS:
      return {
        ...state,
        mostRatedProducts: action.payload,
        loading: false,
      };
    case GET_MOST_RATED_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    
      case GET_PRODUCTS_WITH_HIGH_OFFER_REQUEST:
        return {
            ...state,
            loading: true,
            error: null,
        };
    case GET_PRODUCTS_WITH_HIGH_OFFER_SUCCESS:
        return {
            ...state,
            highOfferProducts: action.payload,
            loading: false,
        };
    case GET_PRODUCTS_WITH_HIGH_OFFER_FAILURE:
        return {
            ...state,
            error: action.payload,
            loading: false,
        };

    default:
      return state;
  }
}
