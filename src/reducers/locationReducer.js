import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_ERROR,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  city: "Bangladesh", // Default value before fetching location
  road: "",
  postalCode: "",
  lat: null,
  lng: null,
  error: null,
  loading: false, // To handle loading state
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
    case UPDATE_LOCATION_REQUEST:
      return {
        ...state,
        loading: true, // Set loading state to true while fetching or updating
      };
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        city: action.payload.city,
        road: action.payload.road,
        postalCode: action.payload.postalCode,
        lat: action.payload.lat,
        lng: action.payload.lng,
        loading: false, // Reset loading state
        error: null, // Reset error on success
      };
    case FETCH_LOCATION_ERROR:
    case UPDATE_LOCATION_FAILURE:
      return {
        ...state,
        loading: false, // Reset loading state
        error: action.payload, // Store error message
      };
    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        city: action.payload.city,
        road: action.payload.road,
        postalCode: action.payload.postalCode,
        lat: action.payload.lat,
        lng: action.payload.lng,
        loading: false, // Reset loading state
        error: null, // Reset error on success
      };
    default:
      return state;
  }
};

export default locationReducer;
