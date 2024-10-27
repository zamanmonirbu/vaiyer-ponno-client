import axiosInstance from "../../api/axiosInstance";

export const getMessages = (id) => axiosInstance.get(`/message/${id}`);
export const addMessage = (data) => axiosInstance.post('/message/', data);