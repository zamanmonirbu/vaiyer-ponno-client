import axios from 'axios';
import { getCookie } from '../actions/cookieUtils';
import { refreshAccessToken } from '../actions/userActions';
import store from '../store';


const axiosInstance = axios.create({
  // baseURL: 'https://vaiyer-ponno-backend.onrender.com',
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the access token using the getCookie function
    const token = getCookie('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Add a request interceptor to attach the token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the access token using the getCookie function
    const token = getCookie('sellerAuthToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Add a request interceptor to attach the token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the access token using the getCookie function
    const token = getCookie('adminAuthToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a request interceptor to attach the token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the access token using the getCookie function
    const token = getCookie('courierToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 Unauthorized errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return the response if it's successful
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error status is 401 (Unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      // Dispatch the refresh token action
      await store.dispatch(refreshAccessToken());

      // Get the new token using the getCookie function
      const newToken = getCookie('authToken');
      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`; // Attach the new token
        return axiosInstance(originalRequest); // Retry the original request with the new token
      }
    }

    return Promise.reject(error); // Reject the promise with the error
  }
);

export default axiosInstance;
