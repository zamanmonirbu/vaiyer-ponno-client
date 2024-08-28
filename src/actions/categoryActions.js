import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
} from '../actions/actionTypes';
import axiosInstance from '../api/axiosInstance';

export const fetchCategories = () => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });

    try {
        const response = await axiosInstance.get('/api/categories');
        const categories = response.data;
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: categories });
    } catch (error) {
        dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
    }
};
