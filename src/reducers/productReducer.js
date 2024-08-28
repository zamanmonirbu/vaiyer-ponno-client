import {
    GET_PRODUCTS,
    GET_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    PRODUCT_ERROR
} from '../actions/actionTypes';

const initialState = {
    products: [],
    product: null,
    loading: true,
    error: null
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            };
        case CREATE_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products],
                loading: false
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === action.payload._id ? action.payload : product
                ),
                loading: false
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload),
                loading: false
            };
        case PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
