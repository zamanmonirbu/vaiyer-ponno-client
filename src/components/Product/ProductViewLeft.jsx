import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const ProductViewLeft = ({ mainImageView, videoUrl, subImages }) => {
  const [mainImage, setMainImage] = useState(mainImageView);

  // Synchronize mainImage with mainImageView when mainImageView prop changes
  useEffect(() => {
    setMainImage(mainImageView);
  }, [mainImageView]);

  const handleImageClick = (image) => {
    setMainImage(image);
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
        {/* Embed YouTube Video */}
        <div className="relative">
          <iframe
            className="w-32 h-48 rounded-lg"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
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
