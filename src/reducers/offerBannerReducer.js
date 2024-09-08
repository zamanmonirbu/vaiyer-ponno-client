// src/redux/reducers/offerBannerReducer.js
import {
    GET_OFFER_BANNERS,
    GET_OFFER_BANNER,
    CREATE_OFFER_BANNER,
    UPDATE_OFFER_BANNER,
    DELETE_OFFER_BANNER,
    OFFER_BANNER_ERROR,
  } from "../actions/actionTypes";
  
  const initialState = {
    offerBanners: [],
    offerBanner: null,
    loading: true,
    error: null,
  };
  
  export const offerBannerReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_OFFER_BANNERS:
        return {
          ...state,
          offerBanners: payload,
          loading: false,
        };
      case GET_OFFER_BANNER:
        return {
          ...state,
          offerBanner: payload,
          loading: false,
        };
      case CREATE_OFFER_BANNER:
        return {
          ...state,
          offerBanners: [...state.offerBanners, payload],
          loading: false,
        };
      case UPDATE_OFFER_BANNER:
        return {
          ...state,
          offerBanners: state.offerBanners.map((banner) =>
            banner._id === payload._id ? payload : banner
          ),
          loading: false,
        };
      case DELETE_OFFER_BANNER:
        return {
          ...state,
          offerBanners: state.offerBanners.filter(
            (banner) => banner._id !== payload
          ),
          loading: false,
        };
      case OFFER_BANNER_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  