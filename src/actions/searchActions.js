import axiosInstance from "../api/axiosInstance";
import { CLEAR_SEARCH, SEARCH_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS } from "./actionTypes";

// Search across Users, Sellers, and Admins by name
export const searchByName = (name) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_REQUEST });
    console.log(name);
    try {
      const response = await axiosInstance.get(`/api/search?name=${name}`);
      console.log(response.data);
      dispatch({
        type: SEARCH_SUCCESS,
        payload: response.data
      });
        // return response.data;
    } catch (error) {
      dispatch({
        type: SEARCH_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Add this new action to clear search state
export const clearSearch = () => {
  console.log("Working");
  return {
    
    type: CLEAR_SEARCH,
  };
};
