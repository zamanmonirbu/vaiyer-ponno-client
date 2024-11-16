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
  UPDATE_ASSIGNMENT_STATUS_FAIL,
  UPDATE_ASSIGNMENT_STATUS_SUCCESS,
  UPDATE_ASSIGNMENT_STATUS_REQUEST

} from "../actions/actionTypes";

const initialState = {
  assignments: [],
  loading: false,
  error: null,
  success: false,
};

export const courierToDeliveryManReducer = (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_ORDER_REQUEST:
    case FETCH_ASSIGNMENTS_REQUEST:
    case UPDATE_DELIVERY_STATUS_REQUEST:
    case DELETE_ASSIGNMENT_REQUEST:
    case UPDATE_ASSIGNMENT_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case ASSIGN_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        assignments: [...state.assignments, action.payload.data],
      };

    case FETCH_ASSIGNMENTS_SUCCESS:
    case UPDATE_ASSIGNMENT_STATUS_SUCCESS:

      return {
        ...state,
        loading: false,
        assignments: action.payload,
      };

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

    case ASSIGN_ORDER_FAIL:
    case FETCH_ASSIGNMENTS_FAIL:
    case UPDATE_DELIVERY_STATUS_FAIL:
    case DELETE_ASSIGNMENT_FAIL:
    case UPDATE_ASSIGNMENT_STATUS_FAIL:
      
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
