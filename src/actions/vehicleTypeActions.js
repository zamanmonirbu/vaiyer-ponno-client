import {
  VEHICLETYPE_CREATE_REQUEST,
  VEHICLETYPE_CREATE_SUCCESS,
  VEHICLETYPE_CREATE_FAIL,
  VEHICLETYPE_GET_ALL_REQUEST,
  VEHICLETYPE_GET_ALL_SUCCESS,
  VEHICLETYPE_GET_ALL_FAIL,
  VEHICLETYPE_GET_BY_ID_REQUEST,
  VEHICLETYPE_GET_BY_ID_SUCCESS,
  VEHICLETYPE_GET_BY_ID_FAIL,
  VEHICLETYPE_UPDATE_REQUEST,
  VEHICLETYPE_UPDATE_SUCCESS,
  VEHICLETYPE_UPDATE_FAIL,
  VEHICLETYPE_DELETE_REQUEST,
  VEHICLETYPE_DELETE_SUCCESS,
  VEHICLETYPE_DELETE_FAIL,
} from './actionTypes';
import axiosInstance from '../api/axiosInstance';

// Create VehicleType Action
export const createVehicleType = (vehicleTypeData) => async (dispatch) => {
  try {
    dispatch({ type: VEHICLETYPE_CREATE_REQUEST });
    const { data } = await axiosInstance.post('/api/vehicleTypes/', vehicleTypeData);
// console.log(data,vehicleTypeData)
    dispatch({
      type: VEHICLETYPE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: VEHICLETYPE_CREATE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Get All VehicleTypes Action
export const getAllVehicleTypes = () => async (dispatch) => {
  try {
    dispatch({ type: VEHICLETYPE_GET_ALL_REQUEST });

    const { data } = await axiosInstance.get('/api/vehicleTypes/');
// console.log(data)
    dispatch({
      type: VEHICLETYPE_GET_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLETYPE_GET_ALL_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Get VehicleType by ID Action
export const getVehicleTypeById = (id) => async (dispatch) => {
  try {
    dispatch({ type: VEHICLETYPE_GET_BY_ID_REQUEST });

    const { data } = await axiosInstance.get(`/api/vehicleTypes/${id}`);

    dispatch({
      type: VEHICLETYPE_GET_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLETYPE_GET_BY_ID_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Update VehicleType Action
export const updateVehicleType = (id, vehicleTypeData) => async (dispatch) => {
  try {
    dispatch({ type: VEHICLETYPE_UPDATE_REQUEST });

    const { data } = await axiosInstance.put(`/api/vehicleTypes/${id}`, vehicleTypeData);

    dispatch({
      type: VEHICLETYPE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLETYPE_UPDATE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Delete VehicleType Action
export const deleteVehicleType = (id) => async (dispatch) => {
  try {
    dispatch({ type: VEHICLETYPE_DELETE_REQUEST });

    await axiosInstance.delete(`/api/vehicleTypes/${id}`);

    dispatch({
      type: VEHICLETYPE_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: VEHICLETYPE_DELETE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
