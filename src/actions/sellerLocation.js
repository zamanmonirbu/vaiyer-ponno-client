import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_ERROR,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAILURE,
} from "./actionTypes";
import { getCookie } from "./cookieUtils";

// Action to fetch user location and optionally update it
export const fetchLocation = () => async (dispatch) => {
  dispatch({ type: FETCH_LOCATION_REQUEST });

  const API_KEY = '3232c1153ab849e5ab17fce13ce22a94';
  const userAuth = JSON.parse(getCookie("sellerAuth")); // Check if the user is logged in

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding API call to get city, road, and postal code
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
          );

          const components = response.data.results[0].components;
          const city = components.city || components.town || components.village || "Unknown";
          const road = components.road || components.street || "Unknown Road";
          const postalCode = components.postcode || "Unknown Post";

          // Prepare the location data
          const locationData = { city, road, postalCode, lat: latitude, lng: longitude };

          // If user is logged in, send the location to the backend
          if (userAuth) {
            // Optionally update user location in the backend
            dispatch(updateUserLocation(userAuth.user.id, locationData));
          } else {
            // If not logged in, store the location in localStorage
            localStorage.setItem("userLocation", JSON.stringify(locationData));
          }

          // Dispatch success action with the fetched location data
          dispatch({
            type: FETCH_LOCATION_SUCCESS,
            payload: locationData,
          });
        } catch (error) {
          dispatch({ type: FETCH_LOCATION_ERROR, payload: error.message || "Error fetching location data" });
        }
      },
      (error) => {
        dispatch({ type: FETCH_LOCATION_ERROR, payload: error.message || "Location access denied" });
      }
    );
  } else {
    dispatch({ type: FETCH_LOCATION_ERROR, payload: "Geolocation is not supported by your browser." });
  }
};

// Action to get user location from the backend
export const getUserLocation = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_LOCATION_REQUEST });

  try {
    const response = await axiosInstance.get(`/api/location/${userId}`);

    // Dispatch success action with the retrieved location data
    dispatch({
      type: FETCH_LOCATION_SUCCESS,
      payload: response.data, // Assumes backend returns { city, road, postalCode, lat, lng }
    });
  } catch (error) {
    dispatch({ type: FETCH_LOCATION_ERROR, payload: error.message || "Error retrieving location data" });
  }
};

// Action to update user location
export const updateUserLocation = (userId, locationData) => async (dispatch) => {
  dispatch({ type: UPDATE_LOCATION_REQUEST });

  try {
    const response = await axiosInstance.post(`/api/location/update`, { userId, ...locationData });

    // Dispatch success action with the updated location data
    dispatch({
      type: UPDATE_LOCATION_SUCCESS,
      payload: response.data, // Assuming the backend returns the updated location data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LOCATION_FAILURE,
      payload: error.response?.data?.error || "Error updating location",
    });
  }
};
