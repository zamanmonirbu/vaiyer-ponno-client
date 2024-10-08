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
} from './actionTypes';



// Action creators for seller registration
export const sellerRegisterStart = () => ({ type: SELLER_REGISTER_START });
export const sellerRegisterSuccess = (data) => ({ type: SELLER_REGISTER_SUCCESS, payload: data });
export const sellerRegisterFailure = (error) => ({ type: SELLER_REGISTER_FAILURE, payload: error });

export const registerSeller = (sellerInfo) => async (dispatch) => {
  dispatch(sellerRegisterStart());
  try {
    const response = await axiosInstance.post('/api/seller/register', sellerInfo);
    const data = response.data;
    // console.log(data)
    dispatch(sellerRegisterSuccess(data));
    // dispatch(clearSellerState());
  } catch (error) {
    // console.log(error);
    dispatch(sellerRegisterFailure(error.response?.data?.message));
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
    // console.log("Getting seller data",data);
    dispatch(sellerLoginSuccess(data));
    localStorage.setItem('sellerAuth', JSON.stringify(data.seller));
    localStorage.setItem('sellerAuthToken', data.token);
    localStorage.removeItem('userLocation');
  } catch (error) {
    dispatch(sellerLoginFailure(error.response?.data?.message));
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
    const sellers = response.data;
    dispatch(fetchSellersSuccess(sellers));
  } catch (error) {
    dispatch(fetchSellersFailure(error.response?.data?.error || error.message));
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
    const seller = response.data;
    // console.log("From action",seller)
    dispatch(fetchSellerByIdSuccess(seller));
  } catch (error) {
    dispatch(fetchSellerByIdFailure(error.response?.data?.error || error.message));
  }
};

export const fetchProductsByCategoryOfSellerStart = () => ({ type: FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_START });
export const fetchProductsByCategoryOfSellerSuccess = (products) => ({ type: FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_SUCCESS, payload: products });
export const fetchProductsByCategoryOfSellerFailure = (error) => ({ type: FETCH_PRODUCTS_BY_CATEGORY_OF_SELLER_FAILURE, payload: error });

export const fetchProductsByCategoryOfSeller = (sellerId, categoryId) => async (dispatch) => {
  dispatch(fetchProductsByCategoryOfSellerStart());
  try {
    // /:sellerId/products/category/:category
    // console.log(sellerId,categoryId)
    const response = await axiosInstance.get(`/api/seller/${sellerId}/products/category/${categoryId}`);
    // console.log("Seller category data", response.data);
    const products = response.data;
    dispatch(fetchProductsByCategoryOfSellerSuccess(products));
  } catch (error) {
    dispatch(fetchProductsByCategoryOfSellerFailure(error.response?.data?.error || error.message));
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
    const seller = response.data;
    dispatch(updateSellerSuccess(seller));
  } catch (error) {
    dispatch(updateSellerFailure(error.response?.data?.error || error.message));
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
    dispatch(deleteSellerFailure(error.response?.data?.error || error.message));
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
    const sellers = response.data;
    dispatch(fetchDeactivatedSellersSuccess(sellers));
  } catch (error) {
    dispatch(fetchDeactivatedSellersFailure(error.response?.data?.error || error.message));
  }
};

export const clearSellerState = () => ({
  type: CLEAR_SELLER_STATE,
});