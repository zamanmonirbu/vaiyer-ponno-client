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
} from './actionTypes';
import axiosInstance from '../api/axiosInstance'; // Adjust the path if needed

// Fetch categories
export const fetchCategories = () => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });

    try {
        const response = await axiosInstance.get('/api/categories');
        const {data}=response.data;
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
    }
};

// Create a category
export const createCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
        const response = await axiosInstance.post('/api/categories', categoryData);
        const {data}=response.data;
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
    }
};

// Update a category
export const updateCategory = (id, categoryData) => async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    try {
        const response = await axiosInstance.put(`/api/categories/${id}`, categoryData);
        const {data}=response.data;
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: error.message });
    }
};

// Delete a category
export const deleteCategory = (id) => async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    try {
        await axiosInstance.delete(`/api/categories/${id}`);
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_CATEGORY_FAILURE, payload: error.message });
    }
};
