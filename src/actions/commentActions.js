import {
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
} from './actionTypes';

import axiosInstance from '../api/axiosInstance';
import { getCookie } from './cookieUtils';

// Helper function to get auth headers for user
const getAuthHeaders = () => {
  const token = getCookie('authToken');
  const userAuth = getCookie('userAuth');

  return {
    headers: {
      'Authorization': token ? `Bearer ${token}` : undefined,
      'User-Auth': userAuth ? userAuth : undefined,
      'Content-Type': 'application/json',
    }
  };
};

// Create a new comment
export const createComment = (text, productId,rating) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_CREATE_REQUEST });
    const res = await axiosInstance.post('/api/comments', { text, productId,rating }, getAuthHeaders());
    dispatch({ type: COMMENT_CREATE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// Get all comments for a product
export const listComments = (productId) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_LIST_REQUEST });

    const res = await axiosInstance.get(`/api/comments/product/${productId}`, getAuthHeaders());

    dispatch({ type: COMMENT_LIST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// Update a comment by ID
export const updateComment = (id, text) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_UPDATE_REQUEST });

    const res = await axiosInstance.put(`/api/comments/${id}`, { text }, getAuthHeaders());

    dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COMMENT_UPDATE_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// Delete a comment by ID
export const deleteComment = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_DELETE_REQUEST });

    await axiosInstance.delete(`/api/comments/${id}`, getAuthHeaders());

    dispatch({ type: COMMENT_DELETE_SUCCESS, payload: id });
  } catch (err) {
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};
