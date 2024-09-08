// Example axiosInstance configuration
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vaiyer-ponno-backend-1.onrender.com', // Ensure this is correct
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
