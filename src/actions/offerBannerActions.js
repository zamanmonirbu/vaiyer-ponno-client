
import {
  GET_OFFER_BANNERS,
  GET_OFFER_BANNER,
  CREATE_OFFER_BANNER,
  UPDATE_OFFER_BANNER,
  DELETE_OFFER_BANNER,
  OFFER_BANNER_ERROR,
} from "./actionTypes";
import axiosInstance from "../api/axiosInstance";



// Get all offer banners
export const getOfferBanners = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/api/offer/banners");
    dispatch({
      type: GET_OFFER_BANNERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: OFFER_BANNER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Get a single offer banner by ID
export const getOfferBannerById = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/api/offer/banners/${id}`);
    dispatch({
      type: GET_OFFER_BANNER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: OFFER_BANNER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Create a new offer banner
export const createOfferBanner = (offerBannerData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/api/offer/banners", offerBannerData);
    dispatch({
      type: CREATE_OFFER_BANNER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: OFFER_BANNER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Update an existing offer banner
export const updateOfferBanner = (id, offerBannerData) => async (dispatch) => {
  try {
    const res = await axiosInstance.put(`/api/offer/banners/${id}`, offerBannerData);
    dispatch({
      type: UPDATE_OFFER_BANNER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: OFFER_BANNER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Delete an offer banner
export const deleteOfferBanner = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/api/offer/banners/${id}`);
    dispatch({
      type: DELETE_OFFER_BANNER,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: OFFER_BANNER_ERROR,
      payload: error.response.data.message,
    });
  }
};
