import axiosInstance from '../api/axiosInstance';
import {
  ADMIN_LOGIN_START,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_REGISTER_START,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAILURE,
  ADMIN_CREATE_START,
  ADMIN_CREATE_SUCCESS,
  ADMIN_CREATE_FAILURE,
  ADMIN_READ_START,
  ADMIN_READ_SUCCESS,
  ADMIN_READ_FAILURE,
  ADMIN_UPDATE_START,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAILURE,
  ADMIN_DELETE_START,
  ADMIN_DELETE_SUCCESS,
  ADMIN_DELETE_FAILURE,
  REQUEST_ADMINS_REQUEST,
  REQUEST_ADMINS_SUCCESS,
  REQUEST_ADMINS_FAIL,
  ACCEPT_ADMIN_SUCCESS,
  REJECT_ADMIN_SUCCESS,
  ADMIN_GET_BY_ID_START,
  ADMIN_GET_BY_ID_SUCCESS,
  ADMIN_GET_BY_ID_FAILURE,
  CLEAR_ADMIN_STATE
} from './actionTypes';
import Cookies from 'js-cookie'; // Import js-cookie

export const clearAdminState = () => ({
  type: CLEAR_ADMIN_STATE,
});


// Fetch admin by ID
export const getAdminById = (adminId) => async (dispatch) => {
  dispatch({ type: ADMIN_GET_BY_ID_START });
  try {
    const { data } = await axiosInstance.get(`/api/admin/${adminId}`);
    dispatch({ type: ADMIN_GET_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_GET_BY_ID_FAILURE, payload: error.response?.data?.message || error.message });
  }
};



// Login action
export const loginAdmin = (credentials) => async (dispatch) => {
  dispatch({ type: ADMIN_LOGIN_START });
  try {
    const { data } = await axiosInstance.post('/api/admin/login', credentials);

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

    // Store in cookies instead of localStorage
    Cookies.set('adminAuth', JSON.stringify(data.admin), { expires: 7 }); // Expires in 7 days
    Cookies.set('adminAuthToken', data.token, { expires: 7 });
  } catch (error) {
    dispatch({ type: ADMIN_LOGIN_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// Register action
export const registerAdmin = (adminInfo) => async (dispatch) => {
  dispatch({ type: ADMIN_REGISTER_START });
  try {
    const { data } = await axiosInstance.post('/api/admin/register', adminInfo);
    dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_REGISTER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// Create admin
export const createAdmin = (adminData) => async (dispatch) => {
  dispatch({ type: ADMIN_CREATE_START });
  try {
    const { data } = await axiosInstance.post('/api/admin/', adminData);
    dispatch({ type: ADMIN_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_CREATE_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// Read all admins
export const readAdmins = () => async (dispatch) => {
  dispatch({ type: ADMIN_READ_START });
  try {
    const { data } = await axiosInstance.get('/api/admin/');
    // console.log(data);
    dispatch({ type: ADMIN_READ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_READ_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// Update admin
export const updateAdmin = (adminId, adminData) => async (dispatch) => {
  dispatch({ type: ADMIN_UPDATE_START });
  try {
    const { data } = await axiosInstance.put(`/api/admin/${adminId}`, adminData);
    dispatch({ type: ADMIN_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_UPDATE_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// Delete admin
export const deleteAdmin = (adminId) => async (dispatch) => {
  dispatch({ type: ADMIN_DELETE_START });
  try {
    await axiosInstance.delete(`/api/admin/${adminId}`);
    dispatch({ type: ADMIN_DELETE_SUCCESS, payload: adminId });
  } catch (error) {
    dispatch({ type: ADMIN_DELETE_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// Fetch pending admin requests
export const requestAdmins = () => async (dispatch) => {
  dispatch({ type: REQUEST_ADMINS_REQUEST });
  try {
    const { data } = await axiosInstance.get('/api/admin/request');
    // console.log(data);
    dispatch({ type: REQUEST_ADMINS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REQUEST_ADMINS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Accept admin request
export const acceptAdmin = (id) => async (dispatch) => {
  try {
    await axiosInstance.put(`/api/admin/${id}`, { isAdmin: true });
    dispatch({ type: ACCEPT_ADMIN_SUCCESS, payload: id });
  } catch (error) {
    console.error('Failed to accept admin request', error);
  }
};

// Reject admin request
export const rejectAdmin = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/api/admin/${id}`);
    dispatch({ type: REJECT_ADMIN_SUCCESS, payload: id });
  } catch (error) {
    console.error('Failed to reject admin request', error);
  }
};
