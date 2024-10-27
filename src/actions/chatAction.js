import axiosInstance from "../api/axiosInstance";
import {
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_FAIL,
  FIND_CHAT_REQUEST,
  FIND_CHAT_SUCCESS,
  FIND_CHAT_FAIL,
} from "./actionTypes";

// Create a new chat
export const createChat = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CHAT_REQUEST });

    const res = await axiosInstance.post("/chat/", data);

    dispatch({
      type: CREATE_CHAT_SUCCESS,
      payload: res.data, // The chat data from the response
    });

    return res;
  } catch (error) {
    dispatch({
      type: CREATE_CHAT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error; // Rethrow to handle in the component
  }
};

// Fetch all chats for a user
export const fetchUserChats = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CHATS_REQUEST });

    const res = await axiosInstance.get(`/chat/${userId}`);

    dispatch({
      type: FETCH_CHATS_SUCCESS,
      payload: res.data, // List of chats
    });
  } catch (error) {
    dispatch({
      type: FETCH_CHATS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Find a specific chat between two users
export const findChat = (firstId, secondId) => async (dispatch) => {
  try {
    dispatch({ type: FIND_CHAT_REQUEST });

    const res = await axiosInstance.get(`/chat/find/${firstId}/${secondId}`);

    dispatch({
      type: FIND_CHAT_SUCCESS,
      payload: res.data, // The chat data
    });


  } catch (error) {
    dispatch({
      type: FIND_CHAT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
