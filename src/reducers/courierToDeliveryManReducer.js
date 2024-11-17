import {
  ASSIGN_ORDER_REQUEST,
  ASSIGN_ORDER_SUCCESS,
  ASSIGN_ORDER_FAIL,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS,
  FETCH_ASSIGNMENTS_FAIL,
  UPDATE_DELIVERY_STATUS_REQUEST,
  UPDATE_DELIVERY_STATUS_SUCCESS,
  UPDATE_DELIVERY_STATUS_FAIL,
  DELETE_ASSIGNMENT_REQUEST,
  DELETE_ASSIGNMENT_SUCCESS,
  DELETE_ASSIGNMENT_FAIL,
  UPDATE_ASSIGNMENT_STATUS_REQUEST,
  UPDATE_ASSIGNMENT_STATUS_SUCCESS,
  UPDATE_ASSIGNMENT_STATUS_FAIL,
  DELIVERYMAN_LOGIN_REQUEST,
  DELIVERYMAN_LOGIN_SUCCESS,
  DELIVERYMAN_LOGIN_FAIL,
  DELIVERYMAN_REGISTER_REQUEST,
  DELIVERYMAN_REGISTER_SUCCESS,
  DELIVERYMAN_REGISTER_FAIL,
  DELIVERYMAN_PROFILE_REQUEST,
  DELIVERYMAN_PROFILE_SUCCESS,
  DELIVERYMAN_PROFILE_FAIL,
  DELIVERYMAN_CLEAR,
  DELIVERYMAN_UPDATE_PROFILE_REQUEST,
  DELIVERYMAN_UPDATE_PROFILE_SUCCESS,
  DELIVERYMAN_UPDATE_PROFILE_FAIL,
  DELIVERYMAN_LIST_REQUEST,
  DELIVERYMAN_LIST_SUCCESS,
  DELIVERYMAN_LIST_FAIL,
  FETCH_ASSIGNED_ORDERS_REQUEST,
  FETCH_ASSIGNED_ORDERS_SUCCESS,
  FETCH_ASSIGNED_ORDERS_FAILURE,
  FETCH_REJECTED_ORDERS_REQUEST,
  FETCH_REJECTED_ORDERS_SUCCESS,
  FETCH_REJECTED_ORDERS_FAILURE,
  FETCH_DELIVERED_ORDERS_REQUEST,
  FETCH_DELIVERED_ORDERS_SUCCESS,
  FETCH_DELIVERED_ORDERS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  success: false,
  deliveryManInfo: null,
  profile: null,
  deliveryMen: [],
  assignments: [],
  rejections: [],
  deliveries: [],
};

const deliveryManReducer = (state = initialState, action) => {
  switch (action.type) {
    // DeliveryMan Actions
    case DELIVERYMAN_LOGIN_REQUEST:
    case DELIVERYMAN_REGISTER_REQUEST:
    case DELIVERYMAN_PROFILE_REQUEST:
    case DELIVERYMAN_UPDATE_PROFILE_REQUEST:
    case DELIVERYMAN_LIST_REQUEST:
    case FETCH_ASSIGNED_ORDERS_REQUEST:
    case FETCH_REJECTED_ORDERS_REQUEST:
    case FETCH_DELIVERED_ORDERS_REQUEST:
    case ASSIGN_ORDER_REQUEST:
    case FETCH_ASSIGNMENTS_REQUEST:
    case UPDATE_DELIVERY_STATUS_REQUEST:
    case DELETE_ASSIGNMENT_REQUEST:
    case UPDATE_ASSIGNMENT_STATUS_REQUEST:
      return { ...state, loading: true, error: null, success: false };

    case DELIVERYMAN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        deliveryManInfo: action.payload,
      };

    case DELIVERYMAN_REGISTER_SUCCESS:
      return { ...state, loading: false, success: true };

    case DELIVERYMAN_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };

    case DELIVERYMAN_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        success: true,
      };

    case DELIVERYMAN_LIST_SUCCESS:
      return { ...state, loading: false, deliveryMen: action.payload };

    case FETCH_ASSIGNED_ORDERS_SUCCESS:
      return { ...state, loading: false, assignments: action.payload };

    case FETCH_REJECTED_ORDERS_SUCCESS:
      return { ...state, loading: false, rejections: action.payload };

    case FETCH_DELIVERED_ORDERS_SUCCESS:
      return { ...state, loading: false, deliveries: action.payload };

    case DELIVERYMAN_LOGIN_FAIL:
    case DELIVERYMAN_REGISTER_FAIL:
    case DELIVERYMAN_PROFILE_FAIL:
    case DELIVERYMAN_UPDATE_PROFILE_FAIL:
    case DELIVERYMAN_LIST_FAIL:
    case FETCH_ASSIGNED_ORDERS_FAILURE:
    case FETCH_REJECTED_ORDERS_FAILURE:
    case FETCH_DELIVERED_ORDERS_FAILURE:
    case ASSIGN_ORDER_FAIL:
    case FETCH_ASSIGNMENTS_FAIL:
    case UPDATE_DELIVERY_STATUS_FAIL:
    case DELETE_ASSIGNMENT_FAIL:
    case UPDATE_ASSIGNMENT_STATUS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELIVERYMAN_CLEAR:
      return { ...initialState };

    // Courier to DeliveryMan Actions
    case ASSIGN_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        assignments: [...state.assignments, action.payload.data],
      };

    case FETCH_ASSIGNMENTS_SUCCESS:
    case UPDATE_ASSIGNMENT_STATUS_SUCCESS:
      return { ...state, loading: false, assignments: action.payload };

    case UPDATE_DELIVERY_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        assignments: state.assignments.map((assignment) =>
          assignment._id === action.payload.data._id
            ? action.payload.data
            : assignment
        ),
      };

    case DELETE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        assignments: state.assignments.filter(
          (assignment) => assignment._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default deliveryManReducer;
