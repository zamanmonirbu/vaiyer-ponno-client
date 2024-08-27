import axios from 'axios';
import {
  FETCH_PROPLE_START,
  FETCH_PROPLE_SUCCESS,
  FETCH_PROPLE_FAILURE
} from './actionTypes';

// Action creator for fetch prople start
export const fetchPropleStart = () => ({
  type: FETCH_PROPLE_START,
});

// Action creator for fetch prople success
export const fetchPropleSuccess = (prople) => ({
  type: FETCH_PROPLE_SUCCESS,
  payload: prople,
});

// Action creator for fetch prople failure
export const fetchPropleFailure = (error) => ({
  type: FETCH_PROPLE_FAILURE,
  payload: error,
});

// Thunk action for fetching prople
export const fetchProple = () => async (dispatch) => {
  dispatch(fetchPropleStart());
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch(fetchPropleSuccess(response.data));
  } catch (error) {
    dispatch(fetchPropleFailure(error.response?.data?.error || error.message));
  }
};
