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
} from './actionTypes';

// Action creator for admin login start
export const adminLoginStart = () => ({
  type: ADMIN_LOGIN_START,
});

// Action creator for admin login success
export const adminLoginSuccess = (admin) => ({
  type: ADMIN_LOGIN_SUCCESS,
  payload: admin,
});

// Action creator for admin login failure
export const adminLoginFailure = (error) => ({
  type: ADMIN_LOGIN_FAILURE,
  payload: error,
});

// Action creator for admin registration start
export const adminRegisterStart = () => ({
  type: ADMIN_REGISTER_START,
});

// Action creator for admin registration success
export const adminRegisterSuccess = (admin) => ({
  type: ADMIN_REGISTER_SUCCESS,
  payload: admin,
});

// Action creator for admin registration failure
export const adminRegisterFailure = (error) => ({
  type: ADMIN_REGISTER_FAILURE,
  payload: error,
});

// Thunk action for admin login
export const loginAdmin = (credentials) => async (dispatch) => {
  dispatch(adminLoginStart());
  try {
    const response = await axiosInstance.post('/api/admin/login', credentials);
    const data = response.data;
    // console.log(data);
    dispatch(adminLoginSuccess(data));
    // Save admin auth and token to localStorage if needed
    localStorage.setItem('adminAuth', JSON.stringify(data.admin));
    localStorage.setItem('adminAuthToken', data.token);
  } catch (error) {
    dispatch(adminLoginFailure(error.response?.data?.error || error.message));
  }
};

// Thunk action for admin registration
export const registerAdmin = (adminInfo) => async (dispatch) => {
  dispatch(adminRegisterStart());
  try {
    const response = await axiosInstance.post('/api/admin/register', adminInfo);
    const data = response.data;
    dispatch(adminRegisterSuccess(data));
  } catch (error) {
    dispatch(adminRegisterFailure(error.response?.data?.error || error.message));
  }
};

// Action creator for admin create
export const adminCreateStart = () => ({
  type: ADMIN_CREATE_START,
});

export const adminCreateSuccess = (admin) => ({
  type: ADMIN_CREATE_SUCCESS,
  payload: admin,
});

export const adminCreateFailure = (error) => ({
  type: ADMIN_CREATE_FAILURE,
  payload: error,
});

// Action creator for admin read
export const adminReadStart = () => ({
  type: ADMIN_READ_START,
});

export const adminReadSuccess = (admins) => ({
  type: ADMIN_READ_SUCCESS,
  payload: admins,
});

export const adminReadFailure = (error) => ({
  type: ADMIN_READ_FAILURE,
  payload: error,
});

// Action creator for admin update
export const adminUpdateStart = () => ({
  type: ADMIN_UPDATE_START,
});

export const adminUpdateSuccess = (admin) => ({
  type: ADMIN_UPDATE_SUCCESS,
  payload: admin,
});

export const adminUpdateFailure = (error) => ({
  type: ADMIN_UPDATE_FAILURE,
  payload: error,
});

// Action creator for admin delete
export const adminDeleteStart = () => ({
  type: ADMIN_DELETE_START,
});

export const adminDeleteSuccess = (adminId) => ({
  type: ADMIN_DELETE_SUCCESS,
  payload: adminId,
});

export const adminDeleteFailure = (error) => ({
  type: ADMIN_DELETE_FAILURE,
  payload: error,
});

// Thunk action for creating an admin
export const createAdmin = (adminData) => async (dispatch) => {
  dispatch(adminCreateStart());
  try {
    const response = await axiosInstance.post('/api/admin/', adminData);
    const data = response.data;
    dispatch(adminCreateSuccess(data));
  } catch (error) {
    dispatch(adminCreateFailure(error.response?.data?.error || error.message));
  }
};

// Thunk action for reading admins
export const readAdmins = () => async (dispatch) => {
  dispatch(adminReadStart());
  try {
    const response = await axiosInstance.get('/api/admin');
    const data = response.data;
    dispatch(adminReadSuccess(data));
  } catch (error) {
    dispatch(adminReadFailure(error.response?.data?.error || error.message));
  }
};

// Thunk action for updating an admin
export const updateAdmin = (adminId, adminData) => async (dispatch) => {
  dispatch(adminUpdateStart());
  try {
    const response = await axiosInstance.put(`/api/admin/${adminId}`, adminData);
    const data = response.data;
    dispatch(adminUpdateSuccess(data));
  } catch (error) {
    dispatch(adminUpdateFailure(error.response?.data?.error || error.message));
  }
};

// Thunk action for deleting an admin
export const deleteAdmin = (adminId) => async (dispatch) => {
  dispatch(adminDeleteStart());
  try {
    await axiosInstance.delete(`/api/admin/${adminId}`);
    dispatch(adminDeleteSuccess(adminId));
  } catch (error) {
    dispatch(adminDeleteFailure(error.response?.data?.error || error.message));
  }
};




// Action to fetch pending admin requests
export const requestAdmins = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ADMINS_REQUEST });
    
    const { data } = await axiosInstance.get('/api/admin/request');
    dispatch({
      type: REQUEST_ADMINS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ADMINS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action to accept an admin request
export const acceptAdmin = (id) => async (dispatch) => {
  try {
    await axiosInstance.put(`/api/admin/${id}`, { isAdmin: true });
    
    dispatch({
      type: ACCEPT_ADMIN_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.error('Failed to accept admin request', error);
  }
};

// Action to reject an admin request
export const rejectAdmin = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/api/admin/${id}`);
    
    dispatch({
      type: REJECT_ADMIN_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.error('Failed to reject admin request', error);
  }
};
