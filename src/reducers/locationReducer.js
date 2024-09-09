import { FETCH_LOCATION_SUCCESS, FETCH_LOCATION_ERROR } from "../actions/actionTypes";

const initialState = {
  city: "Bangladesh", // Default value before fetching location
  road: "",
  postalCode: "",
  error: null,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        city: action.payload.city,
        road: action.payload.road,
        postalCode: action.payload.postalCode,
        error: null, // Reset error on success
      };
    case FETCH_LOCATION_ERROR:
      return {
        ...state,
        error: action.payload, // Store error message
      };
    default:
      return state;
  }
};

export default locationReducer;
