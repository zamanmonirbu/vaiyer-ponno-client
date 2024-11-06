import { RESET_UPLOAD_STATE, SET_VIDEO_FILE, UPLOAD_VIDEO_FAILURE, UPLOAD_VIDEO_REQUEST, UPLOAD_VIDEO_SUCCESS, UPLOAD_PROGRESS } from "../actions/actionTypes";

const initialState = {
    videoFile: null,
    uploadProgress: 0,
    uploadStatus: '',
    error: null,
    videoId: null,
};

// Reducer
export const videoUploadReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_VIDEO_FILE:
        return {
          ...state,
          videoFile: action.payload,
        };
      case UPLOAD_VIDEO_REQUEST:
        return {
          ...state,
          uploadProgress: 0,
          uploadStatus: 'Uploading...',
          error: null,
        };
      case UPLOAD_VIDEO_SUCCESS:
        return {
          ...state,
          uploadProgress: 100,
          uploadStatus: 'Upload successful!',
          videoId: action.payload,
        };
      case UPLOAD_VIDEO_FAILURE:
        return {
          ...state,
          uploadProgress: 0,
          uploadStatus: 'Upload failed.',
          error: action.payload,
        };
      case RESET_UPLOAD_STATE:
        return initialState;
      case UPLOAD_PROGRESS:
        return {
          ...state,
          uploadProgress: action.payload,
        };
      default:
        return state;
    }
};
