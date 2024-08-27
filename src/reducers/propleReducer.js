import {
    FETCH_PROPLE_START,
    FETCH_PROPLE_SUCCESS,
    FETCH_PROPLE_FAILURE
  } from '../actions/actionTypes';
  
  const initialState = {
    prople: [],
    loading: false,
    error: '',
  };
  
  const propleReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PROPLE_START:
        return {
          ...state,
          loading: true,
          error: '',
        };
      case FETCH_PROPLE_SUCCESS:
        return {
          ...state,
          loading: false,
          prople: action.payload,
        };
      case FETCH_PROPLE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default propleReducer;
  