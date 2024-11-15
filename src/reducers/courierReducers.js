import {
  COURIER_LOGIN_REQUEST,
  COURIER_LOGIN_SUCCESS,
  COURIER_LOGIN_FAIL,
  COURIER_REGISTER_REQUEST,
  COURIER_REGISTER_SUCCESS,
  COURIER_REGISTER_FAIL,
  COURIER_PROFILE_REQUEST,
  COURIER_PROFILE_SUCCESS,
  COURIER_PROFILE_FAIL,
  COURIER_CLEAR,
  COURIER_UPDATE_PROFILE_REQUEST,
  COURIER_UPDATE_PROFILE_SUCCESS,
  COURIER_UPDATE_PROFILE_FAIL,
} from "../actions/actionTypes";

const courierInitialState = {
  loading: false,
  courierInfo: null,
  profile: null,
  success: false,
  error: null,
};

const courierReducer = (state = courierInitialState, action) => {
  switch (action.type) {
    case COURIER_LOGIN_REQUEST:
      return { ...state, loading: true, error: null }; // reset error on request
    case COURIER_LOGIN_SUCCESS:
      return { ...state, loading: false, courierInfo: action.payload, error: null };
    case COURIER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload, courierInfo: null };

    case COURIER_REGISTER_REQUEST:
      return { ...state, loading: true, error: null }; // reset error on request
    case COURIER_REGISTER_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case COURIER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };

    case COURIER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null }; // reset error on request
    case COURIER_PROFILE_SUCCESS:
      // console.log(action.payload);
      return { ...state, loading: false, profile: action.payload, error: null };
    case COURIER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload, profile: null };

      case COURIER_UPDATE_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
      case COURIER_UPDATE_PROFILE_SUCCESS:
        return { ...state, loading: false, profile: action.payload, success: true, error: null };
      case COURIER_UPDATE_PROFILE_FAIL:
        return { ...state, loading: false, error: action.payload, success: false };

    case COURIER_CLEAR:
      return { ...courierInitialState }; // reset all state to initial

    default:
      return state;
  }
};

export default courierReducer;