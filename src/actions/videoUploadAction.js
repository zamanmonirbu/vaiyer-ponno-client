import axiosInstance from "../api/axiosInstance";
import {
  RESET_UPLOAD_STATE,
  SET_VIDEO_FILE,
  UPLOAD_VIDEO_FAILURE,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  
} from "./actionTypes";

// Action Creators
export const setVideoFile = (file) => ({
  type: SET_VIDEO_FILE,
  payload: file,
});

export const uploadVideoRequest = () => ({
  type: UPLOAD_VIDEO_REQUEST,
});

export const uploadVideoSuccess = (videoId) => ({
  type: UPLOAD_VIDEO_SUCCESS,
  payload: videoId,
});

export const uploadVideoFailure = (error) => ({
  type: UPLOAD_VIDEO_FAILURE,
  payload: error,
});

export const resetUploadState = () => ({
  type: RESET_UPLOAD_STATE,
});

// Async action for uploading video
export const uploadVideo = (formData) => async (dispatch) => {
  dispatch(uploadVideoRequest());
  try {
    const response = await axiosInstance.post("/api/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch({ type: "UPLOAD_PROGRESS", payload: progress });
      },
    });
    dispatch(uploadVideoSuccess(response.data.videoId));
  } catch (error) {
    console.log(error)
    dispatch(uploadVideoFailure(error.message));
  }
};
