import axios from "axios";
import { FETCH_LOCATION_ERROR, FETCH_LOCATION_SUCCESS } from "./actionTypes";

export const fetchLocation = () => async (dispatch) => {
  const API_KEY = '3232c1153ab849e5ab17fce13ce22a94'; 

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Fetch the city, road, and postal code using reverse geocoding API
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
          );
          
          const components = response.data.results[0].components;
          const city = components.city || components.town || components.village || "Unknown";
          const road = components.road || components.street || "Unknown Road";
          const postalCode = components.postcode || "Unknown Post";

          // Dispatch success action with the fetched location data
          dispatch({
            type: FETCH_LOCATION_SUCCESS,
            payload: { city, road, postalCode },
          });
        } catch (error) {
          dispatch({ type: FETCH_LOCATION_ERROR, payload: "Error fetching location data" });
        }
      },
      (error) => {
        dispatch({ type: FETCH_LOCATION_ERROR, payload: "Location access denied" });
      }
    );
  } else {
    dispatch({ type: FETCH_LOCATION_ERROR, payload: "Geolocation is not supported by your browser." });
  }
};
