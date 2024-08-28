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
} from '../actions/actionTypes';

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
        case CREATE_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
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

        case FETCH_CATEGORIES_FAILURE:
        case CREATE_CATEGORY_FAILURE:
        case UPDATE_CATEGORY_FAILURE:
        case DELETE_CATEGORY_FAILURE:
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
