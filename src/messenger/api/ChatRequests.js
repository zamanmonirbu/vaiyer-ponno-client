import axiosInstance from '../../api/axiosInstance';

export const createChat = (data) => axiosInstance.post('/chat/', data);

export const userChats = (id) => axiosInstance.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => axiosInstance.get(`/chat/find/${firstId}/${secondId}`);