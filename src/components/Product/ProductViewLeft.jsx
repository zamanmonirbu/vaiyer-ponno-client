import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const ProductViewLeft = ({ mainImageView, videoUrl, subImages }) => {
  const [mainImage, setMainImage] = useState(mainImageView);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Synchronize mainImage with mainImageView when mainImageView prop changes
  useEffect(() => {
    setMainImage(mainImageView);
  }, [mainImageView]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  // Function to extract YouTube video ID and generate embed URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0]; // Extract video ID
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full">
      {/* Left Side: Small Images and Video */}
      <div className="p-4 flex flex-col space-y-4 relative">
        {subImages?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="h-32 w-32 cursor-pointer rounded-lg object-cover hover:opacity-25 transition-opacity duration-300"
            onClick={() => handleImageClick(image)}
          />
        ))}
        {/* Video Thumbnail */}
        {videoUrl && (
          <div className="relative cursor-pointer" onClick={toggleModal}>
            <img
              className="w-32 h-48 rounded-lg object-cover"
              src={`https://img.youtube.com/vi/${videoUrl.split("v=")[1]?.split("&")[0]}/hqdefault.jpg`}
              alt="Video thumbnail"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Right Side: Main Image */}
      <div className="w-full p-4">
        <div className="relative">
          <img
            src={mainImage}
            alt="Main Product"
            className="h-full w-full p-4 rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Modal for Video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-black text-2xl"
              onClick={toggleModal}
            >
              &times;
            </button>

            {/* Modal Content */}
            <div className="p-4">
              <iframe
                className="w-full h-64 md:h-96 rounded-lg"
                src={`${getYouTubeEmbedUrl(videoUrl)}?autoplay=1&controls=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Cancel Button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add PropTypes validation
ProductViewLeft.propTypes = {
  mainImageView: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  subImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductViewLeft;
