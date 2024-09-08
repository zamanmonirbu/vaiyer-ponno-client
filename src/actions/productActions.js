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
} from '../actions/actionTypes';
import axiosInstance from '../api/axiosInstance';




// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('sellerAuthToken');
    const sellerId = localStorage.getItem('sellerAuth');

    return {
        headers: {
            'Authorization': token ? `Bearer ${token}` : undefined,
            'Seller-Id': sellerId ? sellerId : undefined,
        }
    };
};

// Get all products
export const getProducts = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/api/products', getAuthHeaders());
        // console.log(res.data);
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response.data.message
        });
    }
};

// Get single product by ID
export const getProduct = (id) => async (dispatch) => {
    try {
        const res = await axiosInstance.get(`/api/products/${id}`, getAuthHeaders());
        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response.data.message
        });
    }
};


// Action to fetch most-rated products
export const getMostRatedProducts = () => async (dispatch) => {
    dispatch({ type: GET_MOST_RATED_PRODUCTS_REQUEST });

    try {
        const res = await axiosInstance.get('/api/products/most-rated-products');
        // console.log(res.data)
        dispatch({
            type: GET_MOST_RATED_PRODUCTS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_MOST_RATED_PRODUCTS_FAILURE,
            payload: err.response.data.message
        });
    }
};


export const getProductsWithHighOffer = () => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_WITH_HIGH_OFFER_REQUEST });

    try {
        const res = await axiosInstance.get('/api/products/high-offer');
        // console.log(res.data);
        dispatch({
            type: GET_PRODUCTS_WITH_HIGH_OFFER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_WITH_HIGH_OFFER_FAILURE,
            payload: err.response.data.message,
        });
    }
};


// Get products by the authenticated seller
export const getSellerProducts = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/api/seller/products', getAuthHeaders());
        // console.log(res.data)
        dispatch({
            type: GET_SELLER_PRODUCTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response.data.message
        });
    }
};


// Create a new product
export const createProduct = (productData) => async (dispatch) => {
    
    try {
        const res = await axiosInstance.post('/api/products', productData, getAuthHeaders());
        console.log(res.data);
        dispatch({
            type: CREATE_PRODUCT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response.data.message
        });
    }
};

// Update an existing product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        const res = await axiosInstance.put(`/api/products/${id}`, productData, getAuthHeaders());
        dispatch({
            type: UPDATE_PRODUCT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response.data.message
        });
    }
};

// Delete a product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/api/products/${id}`, getAuthHeaders());
        dispatch({
            type: DELETE_PRODUCT,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response.data.message
        });
    }
};
