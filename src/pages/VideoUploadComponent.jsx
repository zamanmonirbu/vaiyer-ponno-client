import { useDispatch, useSelector } from "react-redux";
import { setVideoFile, uploadVideo } from "../actions/videoUploadAction";

const VideoUploadComponent = () => {
  const { videoFile, uploadProgress, uploadStatus, error } = useSelector(
    (state) => state.videoUpload
  );
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    dispatch(setVideoFile(event.target.files[0]));
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("video", videoFile);
    dispatch(uploadVideo(formData));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />{" "}
      <button onClick={handleUpload} disabled={!videoFile}>
        Upload Video
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}{" "}
      {error && <p>Error: {error}</p>}{" "}
      <div
        className="progress-bar"
        style={{
          width: `${uploadProgress}%`,
          height: "5px",
          backgroundColor: "blue",
        }}
      ></div>
      {" "}
    </div>
  );
};

export default VideoUploadComponent;
