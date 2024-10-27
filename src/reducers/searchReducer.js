// searchReducer.js
import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, CLEAR_SEARCH } from "../actions/actionTypes";

const initialState = {
    loading: false,
    users: [], // Stores search results
    error: null,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        
        case SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null,
            };
        
        case SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_SEARCH:
            return {
                ...state,
                users: [], // Clear the users array
                error: null,
            };

        default:
            return state;
    }
};

export default searchReducer;
