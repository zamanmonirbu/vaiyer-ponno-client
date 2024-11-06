import { ADD_TASK, DELETE_TASK, GET_TASKS, UPDATE_TASK } from './actionTypes';
import axiosInstance from '../api/axiosInstance';




// Fetch tasks by sellerId
export const getTasks = (sellerId) => async (dispatch) => {
  const response = await axiosInstance.get(`/api/tasks/${sellerId}`);
  dispatch({ type: GET_TASKS, payload: response.data });
};

// Add new task
export const addTask = (taskData) => async (dispatch) => {
  const response = await axiosInstance.post('/api/tasks', taskData);
  dispatch({ type: ADD_TASK, payload: response.data });
};

// Update a task
export const updateTask = (taskId, updatedTaskData) => async (dispatch) => {
  const response = await axiosInstance.put(`/api/tasks/${taskId}`, updatedTaskData);
  dispatch({ type: UPDATE_TASK, payload: response.data });
};

// Delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  await axiosInstance.delete(`/api/tasks/${taskId}`);
  dispatch({ type: DELETE_TASK, payload: taskId });
};
