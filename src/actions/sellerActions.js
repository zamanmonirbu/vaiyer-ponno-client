import axiosInstance from '../api/axiosInstance';
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
  FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_START,
  FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_SUCCESS,
  FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_FAILURE,
  CLEAR_SELLER_STATE,
  REVIEW_SUBMIT_REQUEST,
  REVIEW_SUBMIT_SUCCESS,
  REVIEW_SUBMIT_FAIL,
  FETCH_SELLER_REVIEWS_REQUEST,
  FETCH_SELLER_REVIEWS_SUCCESS,
  FETCH_SELLER_REVIEWS_FAILURE,
} from './actionTypes';
import Cookies from 'js-cookie';


// Action creator to fetch reviews for a specific seller
export const fetchSellerReviews = (sellerId) => async (dispatch) => {
  dispatch({ type: FETCH_SELLER_REVIEWS_REQUEST });

  try {
    const response = await axiosInstance.get(`/api/seller/${sellerId}/reviews`);
    dispatch({
      type: FETCH_SELLER_REVIEWS_SUCCESS,
      payload: response.data, // Array of reviews
    });
  } catch (error) {
    dispatch({
      type: FETCH_SELLER_REVIEWS_FAILURE,
      payload: error?.response?.data?.message || 'Failed to fetch reviews',
    });
  }
};


// Action creator for submitting a review
export const submitReview = ({ sellerId, rating, review,user }) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_SUBMIT_REQUEST });

    console.log(sellerId, rating, review,user);

    // Use sellerId in the request URL to submit the review
    const { data } = await axiosInstance.post(`/api/seller/${sellerId}/reviews`, { rating, review,user });

    dispatch({
      type: REVIEW_SUBMIT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: REVIEW_SUBMIT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action creators for seller registration
export const sellerRegisterStart = () => ({ type: SELLER_REGISTER_START });
export const sellerRegisterSuccess = (data) => ({ type: SELLER_REGISTER_SUCCESS, payload: data });
export const sellerRegisterFailure = (error) => ({ type: SELLER_REGISTER_FAILURE, payload: error });

export const registerSeller = (sellerInfo) => async (dispatch) => {
  dispatch(sellerRegisterStart());
  try {
    const response = await axiosInstance.post('/api/seller/register', sellerInfo);
    dispatch(sellerRegisterSuccess(response.data));
  } catch (error) {
    dispatch(sellerRegisterFailure(error?.response?.data?.error || error?.response?.data?.message));
  }
};

// Action creators for seller login
export const sellerLoginStart = () => ({ type: SELLER_LOGIN_START });
export const sellerLoginSuccess = (data) => ({ type: SELLER_LOGIN_SUCCESS, payload: data });
export const sellerLoginFailure = (error) => ({ type: SELLER_LOGIN_FAILURE, payload: error });

export const loginSeller = (credentials) => async (dispatch) => {
  dispatch(sellerLoginStart());
  try {
    const response = await axiosInstance.post('/api/seller/login', credentials);
    const data = response.data;

    dispatch(sellerLoginSuccess(data));

    // Set seller auth and token in cookies
    Cookies.set('sellerAuth', JSON.stringify(data.seller), { expires: 7 }); // Expires in 7 days
    Cookies.set('sellerAuthToken', data.token, { expires: 7 });

    localStorage.removeItem('userLocation');
  } catch (error) {
    console.log(error.response?.data?.message)
    dispatch(sellerLoginFailure(error?.response?.data?.error || error?.response?.data?.message));
  }
};

// Action creators for fetching sellers
export const fetchSellersStart = () => ({ type: FETCH_SELLERS_START });
export const fetchSellersSuccess = (sellers) => ({ type: FETCH_SELLERS_SUCCESS, payload: sellers });
export const fetchSellersFailure = (error) => ({ type: FETCH_SELLERS_FAILURE, payload: error });

export const fetchSellers = () => async (dispatch) => {
  dispatch(fetchSellersStart());
  try {
    const response = await axiosInstance.get('/api/seller/sellers');
    dispatch(fetchSellersSuccess(response.data));
  } catch (error) {
    dispatch(fetchSellersFailure(error?.response?.data?.error || error?.response?.data?.message));
  }
};

// Action creators for fetching seller by ID
export const fetchSellerByIdStart = () => ({ type: FETCH_SELLER_BY_ID_START });
export const fetchSellerByIdSuccess = (seller) => ({ type: FETCH_SELLER_BY_ID_SUCCESS, payload: seller });
export const fetchSellerByIdFailure = (error) => ({ type: FETCH_SELLER_BY_ID_FAILURE, payload: error });

export const fetchSellerById = (id) => async (dispatch) => {
  dispatch(fetchSellerByIdStart());
  try {
    const response = await axiosInstance.get(`/api/seller/sellers/${id}`);
    dispatch(fetchSellerByIdSuccess(response.data));
  } catch (error) {
    dispatch(fetchSellerByIdFailure(error?.response?.data?.error || error?.response?.data?.message));
  }
};

// Action creators for fetching products by category for a seller
export const fetchProductsByCategoryOfSellerStart = () => ({ type: FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_START });
export const fetchProductsByCategoryOfSellerSuccess = (products) => ({ type: FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_SUCCESS, payload: products });
export const fetchProductsByCategoryOfSellerFailure = (error) => ({ type: FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_FAILURE, payload: error });

export const fetchProductsByCategoryOfSeller = (sellerId, categoryId) => async (dispatch) => {
  dispatch(fetchProductsByCategoryOfSellerStart());
  try {
    const response = await axiosInstance.get(`/api/seller/${sellerId}/products/category/${categoryId}`);
    dispatch(fetchProductsByCategoryOfSellerSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsByCategoryOfSellerFailure(error?.response?.data?.error || error?.response?.data?.message));
  }
};

// Action creators for updating seller
export const updateSellerStart = () => ({ type: UPDATE_SELLER_START });
export const updateSellerSuccess = (seller) => ({ type: UPDATE_SELLER_SUCCESS, payload: seller });
export const updateSellerFailure = (error) => ({ type: UPDATE_SELLER_FAILURE, payload: error });

export const updateSeller = (id, sellerInfo) => async (dispatch) => {
  dispatch(updateSellerStart());
  try {
    const response = await axiosInstance.put(`/api/seller/sellers/${id}`, sellerInfo);
    dispatch(updateSellerSuccess(response.data));
  } catch (error) {
    dispatch(updateSellerFailure(error?.response?.data?.error || error?.response?.data?.message));
  }
};

// Action creators for deleting seller
export const deleteSellerStart = () => ({ type: DELETE_SELLER_START });
export const deleteSellerSuccess = (id) => ({ type: DELETE_SELLER_SUCCESS, payload: id });
export const deleteSellerFailure = (error) => ({ type: DELETE_SELLER_FAILURE, payload: error });

export const deleteSeller = (id) => async (dispatch) => {
  dispatch(deleteSellerStart());
  try {
    await axiosInstance.delete(`/api/seller/sellers/${id}`);
    dispatch(deleteSellerSuccess(id));
  } catch (error) {
    dispatch(deleteSellerFailure(error?.response?.data?.error || error?.response?.data?.message));
  }
};

// Action creators for fetching deactivated sellers
export const fetchDeactivatedSellersStart = () => ({ type: FETCH_DEACTIVATED_SELLERS_START });
export const fetchDeactivatedSellersSuccess = (sellers) => ({ type: FETCH_DEACTIVATED_SELLERS_SUCCESS, payload: sellers });
export const fetchDeactivatedSellersFailure = (error) => ({ type: FETCH_DEACTIVATED_SELLERS_FAILURE, payload: error });

export const fetchDeactivatedSellers = () => async (dispatch) => {
  dispatch(fetchDeactivatedSellersStart());
  try {
    const response = await axiosInstance.get('/api/seller/sellers/deactivated');
    dispatch(fetchDeactivatedSellersSuccess(response.data));
  } catch (error) {
    dispatch(fetchDeactivatedSellersFailure(error?.response?.data?.error || error?.response?.data?.message));
  }
};



// Clear seller state action
export const clearSellerState = () => ({
  type: CLEAR_SELLER_STATE,
});
