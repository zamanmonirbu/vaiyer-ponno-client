import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  RESET_USER,
} from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
  userProfile: null, // to store user profile
  profileLoading: false, // to manage profile loading state
  profileError: null, // to handle profile error
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
    case REGISTER_START:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload, error: null };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case USER_PROFILE_REQUEST:
      return { ...state, profileLoading: true, profileError: null };

    case USER_PROFILE_SUCCESS:
      // console.log(action.payload)
      return { ...state, profileLoading: false, userProfile: action.payload };

    case USER_PROFILE_FAIL:
      return { ...state, profileLoading: false, profileError: action.payload };

    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, profileLoading: true, profileError: null };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, profileLoading: false, currentUser: action.payload };

    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, profileLoading: false, profileError: action.payload };

    case RESET_USER:
      return { ...state, currentUser: null, userProfile: null };

    default:
      return state;
  }
};

export default userReducer;
