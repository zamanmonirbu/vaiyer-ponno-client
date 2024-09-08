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
} from './actionTypes';
import axiosInstance from '../api/axiosInstance'; // Adjust the path if needed

// Helper function to get auth headers
const getAuthHeaders = () => {
    const adminToken = localStorage.getItem('adminAuthToken');
    const adminAuth = localStorage.getItem('adminAuth');
    return {
        headers: {
            Authorization: `Bearer ${adminToken}`,
            'x-admin-auth': adminAuth,
        }
    };
};

// Fetch categories
export const fetchCategories = () => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });

    try {
        const response = await axiosInstance.get('/api/categories', getAuthHeaders());
        const { data } = response.data;
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
    }
};

// Fetch products by category
export const getProductsByCategory = (categoryName) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_BY_CATEGORY_REQUEST });

    try {
        const response = await axiosInstance.get(`/api/products/category/${categoryName}`, getAuthHeaders());
        const  data  = response.data;
        dispatch({ type: FETCH_PRODUCTS_BY_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_BY_CATEGORY_FAILURE, payload: error.message });
    }
};

// Fetch categories with limited products
export const getCategoriesWithLimitedProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_WITH_LIMITED_PRODUCTS_REQUEST });

    try {
        const response = await axiosInstance.get('/api/categories-with-products', getAuthHeaders());
        const data = response.data;
        dispatch({ type: FETCH_CATEGORIES_WITH_LIMITED_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_CATEGORIES_WITH_LIMITED_PRODUCTS_FAILURE, payload: error.message });
    }
};


// Create a category
export const createCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
        const response = await axiosInstance.post('/api/categories', categoryData, getAuthHeaders());
        const { data } = response.data;
        console.log(data)
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        console.log(error.message)
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
    }
};

// Update a category
export const updateCategory = (id, categoryData) => async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    try {
        const response = await axiosInstance.put(`/api/categories/${id}`, categoryData, getAuthHeaders());
        const { data } = response.data;
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: error.message });
    }
};

// Delete a category
export const deleteCategory = (id) => async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    try {
        await axiosInstance.delete(`/api/categories/${id}`, getAuthHeaders());
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_CATEGORY_FAILURE, payload: error.message });
    }
};
