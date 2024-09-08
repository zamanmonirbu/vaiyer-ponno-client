import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
    FETCH_PRODUCTS_BY_CATEGORY_REQUEST,
    FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
    FETCH_PRODUCTS_BY_CATEGORY_FAILURE,
    FETCH_CATEGORIES_WITH_LIMITED_PRODUCTS_REQUEST,
    FETCH_CATEGORIES_WITH_LIMITED_PRODUCTS_SUCCESS,
    FETCH_CATEGORIES_WITH_LIMITED_PRODUCTS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    categories: [],
    productsByCategory: [],
    limitedCategoriesWithProducts: [],
    loading: false,
    error: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
        case CREATE_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
        case FETCH_PRODUCTS_BY_CATEGORY_REQUEST:
        case FETCH_CATEGORIES_WITH_LIMITED_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };

        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: [...state.categories, action.payload],
                loading: false,
            };

        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.map(category =>
                    category._id === action.payload._id ? action.payload : category
                ),
                loading: false,
            };

        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter(category => category._id !== action.payload),
                loading: false,
            };

        case FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                productsByCategory: action.payload,
                loading: false,
            };

        case FETCH_CATEGORIES_WITH_LIMITED_PRODUCTS_SUCCESS:
            return {
                ...state,
                limitedCategoriesWithProducts: action.payload,
                loading: false,
            };

        case FETCH_CATEGORIES_FAILURE:
        case CREATE_CATEGORY_FAILURE:
        case UPDATE_CATEGORY_FAILURE:
        case DELETE_CATEGORY_FAILURE:
        case FETCH_PRODUCTS_BY_CATEGORY_FAILURE:
        case FETCH_CATEGORIES_WITH_LIMITED_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default categoryReducer;
